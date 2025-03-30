const jwt = require("jsonwebtoken");
const Admin = require("../Models/AdminMode");
const Employee = require("../Models/EmployeeModel");
require("dotenv").config();

// Function to get user data based on role and ID
const getUserByRole = async (role, id) => {
    try {
        switch (role.toLowerCase()) {
            case "admin": return await Admin.findById(id);
            case "sales-ref": return await Employee.findById(id);
            case "manager": return await Employee.findById(id);
            default: return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

// Unified authentication & authorization middleware
const authMiddleware = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            let token = req.header("Authorization");
            if (!token) {
                return res.status(401).json({ message: "Access Denied: No Token Provided" });
            }

            // Handle "Bearer" token format
            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length);
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRATE_KEY);
            const user = await getUserByRole(decoded.role, decoded.id);

            if (!user) {
                return res.status(401).json({ message: "Unauthorized: User not found" });
            }

            req.user = { id: user._id, role: decoded.role.toLowerCase() };

            // Role-based authorization
            if (allowedRoles.length && !allowedRoles.map(r => r.toLowerCase()).includes(req.user.role)) {
                return res.status(403).json({ message: "Access Forbidden: Insufficient Permissions" });
            }

            next();
        } catch (err) {
            return res.status(400).json({ message: "Invalid Token", error: err.message });
        }
    };
};

module.exports = authMiddleware;
