const EmployeeModel = require("../Models/EmployeeModel");
const OTPModel = require("../Models/OtpModel");
const { Validator } = require("node-input-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const path = require('path');
const ejs=require("ejs");
const nodemailer=require("nodemailer");
require('dotenv').config();

async function EncryptPassword(password) {
    return await bcrypt.hash(password, 8);
}

async function CreateEmployee(req, res) {
    const validate = new Validator(req.body, {
        Firstname: "required|string",
        lastname: "required|string",
        MobileNum: "required|numeric|digits:10",
        EmailId: "required|email",
        role:"required|string",
        password: [
            'required',
            'string',
            'minLength:8', // Minimum length of 8 characters

        ],
        password_canform: 'required|same:password' // Ensure it matches 'password'
    });
    let matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const EncPassword = await EncryptPassword(req.body.password);
        const EmployeeData = {
            Firstname: req.body.Firstname,
            lastname: req.body.lastname,
            MobileNum: req.body.MobileNum,
            EmailId: req.body.EmailId,
            role:req.body.role,
            Password: EncPassword,
        }
        const AddEmployee = new EmployeeModel(EmployeeData);
        const RegisterEmployee = await AddEmployee.save();
        if (RegisterEmployee) {
            res.status(200).send({ message: "Employee Registered Successfully" });
        } else {
            res.status(400).send({ message: "Employee  Not Registered" });
        }
    }
}

async function ViewEmployees(req, res) {
    const Employees = await EmployeeModel.find();
    if (Employees.length > 0) {
        res.status(200).send(Employees);
    } else {
        res.status(400).send({ message: "Employee Not Exists" });
    }
}

async function ViewEmployee(req, res) {
    const id = req.params.id;
    const Employee = await EmployeeModel.findById(id);
    if (Employee) {
        res.status(200).send(Employee);
    } else {
        res.status(400).send({ message: "Employee Not Exists" });
    }
}

async function UpdateEmployee(req, res) {
    const validate = new Validator(req.body, {
        Firstname: "required|string",
        lastname: "required|string",
        MobileNum: "required|numeric|digits:10",
        role:"required|string",
        EmailId: "required|email",
    });
    let matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const id = req.params.id;
        const EmployeeData = {
            Firstname: req.body.Firstname,
            lastname: req.body.lastname,
            MobileNum: req.body.MobileNum,
            EmailId: req.body.EmailId,
            role:req.body.role,
        }
        const RegisterEmployee = await EmployeeModel.findByIdAndUpdate(id, EmployeeData);
        if (RegisterEmployee) {
            res.status(200).send({ message: "Employee Updated Successfully" });
        } else {
            res.status(400).send({ message: "Employee  Not Updated" });
        }
    }
}

async function DeleteEmployee(req, res) {
    const id = req.params.id;
    const Employee = await EmployeeModel.findByIdAndDelete(id);
    if (Employee) {
        res.status(200).send({message:"Employee Deleted Successfully"});
    } else {
        res.status(400).send({ message: "Employee Not Deleted" });
    }
}

async function Login(req, res) {
    const validate = new Validator(req.body, {
        EmailId: "required|email",
        Password: "required|string",
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const user = await EmployeeModel.findOne({ EmailId: req.body.EmailId });
        if (user && await bcrypt.compare(req.body.Password, user.Password)) {
            const token = await GenerateToken(user._id,user.role);
            res.status(200).send({ message: "Log in Successfully", token: token,role:user.role });
        } else {
            res.status(400).send({ message: "Log in failed" });
        }
    }
}

async function ForgetPassword(req, res) {
    const validate = new Validator(req.body, {
        EmailId: "required|email"
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const Employee = await EmployeeModel.findOne({ EmailId: req.body.EmailId });
        if (!Employee) {
            res.status(404).send({ message: "This Employee Not Exists" });
        } else {
            const CheckOTPMail= await GenerateOtp(req.body.EmailId);
            if (CheckOTPMail) {
                res.status(200).send({message:"OTP is Send Please Check the Email",EmailId:req.body.EmailId});
            } else {
                res.status(400).send({message:"OTP Not Send ",});
            }
        }
    }
}

async function VerifyOtp(req, res) {
    const CurrentTime = new Date;
    const validate = new Validator(req.body, {
        EmailId: "required|email",
        otp:"required"
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const getUserOTPInfo = await OTPModel.findOne({ EmailId: req.body.EmailId });

        if (getUserOTPInfo.otp === req.body.otp && getUserOTPInfo.exptime > CurrentTime) {
            // If OTp  is Verified
            res.status(200).send( {
                message: 'OTP verified Successfully',
                emailid: req.body.EmailId
            });
        } else {
            // If OTp  is Verified
            res.status(400).send( {
                message: 'OTP Not verified Or OTP Expired',
            })
        }
    }
}

async function ResetPassword(req, res) {
    const validate = new Validator(req.body, {
        EmailId: "required|email",
        password: [
            'required',
            'string',
            'minLength:8', // Minimum length of 8 characters

        ],
        password_canform: 'required|same:password' // Ensure it matches 'password'
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const EncPassword = await EncryptPassword(req.body.password);
        const formdata = {
            Password: EncPassword,
        }
        const Resetpassword = await EmployeeModel.findOneAndUpdate({ EmailId: req.body.EmailId }, formdata);

        if (Resetpassword) {
            res.status(200).send({message:"Password Reset Successfully"});
        } else {
            res.status(400).send({message:"Password Not Reset"});
        }
    }
}

async function GenerateToken(id,role) {
    const jwtkey = process.env.JWT_SECRATE_KEY;
    const token = jwt.sign({ id:id, role:role }, jwtkey);
    return token;
}

async function GenerateOtp(EmailId) {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const now = new Date;
    const exptime = new Date(now.getTime() + 2 * 60000);
    const Checkemail = await OTPModel.findOne({EmailId:EmailId});
    if (Checkemail) {
        const formdata = {
            EmailId: EmailId,
            otp: otp,
            exptime:exptime
        }
        const UpdateOtp = await OTPModel.updateOne({EmailId:EmailId}, formdata);
        if (UpdateOtp) {
            await Sendmail(EmailId, otp);
            return true;
        }
    } else {
        const formdata = {
            EmailId: EmailId,
            otp: otp,
            exptime:exptime
        }
        const addotpdata = new OTPModel(formdata);
        const saveotp = await addotpdata.save();
        if (saveotp) {
            await Sendmail(EmailId, otp);
            return true;
        } 
    }
}

async function Sendmail(EmailId, otp) {  
    const templatePath = path.join(__dirname, '../View/Email/forgetpassword.ejs');
    // Render Email Template
    const SemailHtml = await new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, { otp }, (err, data) => {
            if (err) {
                console.error('Error Rendering E-mail template:', err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

    // SMTP Configuration
    const transporter = nodemailer.createTransport({
        host:process.env.HOST,
        port:process.env.PORT,
        secure: true,
        requireTLS: true,
        auth: {
            user:process.env.USERID,
            pass:process.env.PASSWORD,
        }
    });
    console.log(transporter)

    // Mailing Details
    const mailingData = {
        from:process.env.USERID,
        to: EmailId,
        subject: "Forget Password OTP",
        html: SemailHtml
    };

    // Send Email
    const info = await transporter.sendMail(mailingData);
    console.log("Email has been sent, please check your email", info.response);

    return true;  // Return true if email 
    // sent successfully

}

async function getallsalesref(req,res) {
    const Employees = await EmployeeModel.find({ role: "sales-ref" });
    if (Employees.length > 0) {
        res.status(200).send(Employees);
    } else {
        res.status(400).send({ message: "Employee Not Exists" });
    }
}

async function getEmployeeBytoken(req,res) {
    const id = req.user.id;
    const Employee = await EmployeeModel.findById(id);
    if (Employee) {
        res.send(Employee).status(200)
    } else {
        res.send({ message: "Employee Not Exists" }).status(400)
    }
} 

module.exports = {
    CreateEmployee,
    ViewEmployees,
    ViewEmployee,
    UpdateEmployee,
    DeleteEmployee,
    Login,
    ForgetPassword,
    VerifyOtp,
    ResetPassword,
    getallsalesref,
    getEmployeeBytoken
}