const AdminModel = require("../Models/AdminMode");
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

async function CreateAdmin(req, res) {
    const validate = new Validator(req.body, {
        Firstname: "required|string",
        lastname: "required|string",
        MobileNum: "required|numeric|digits:10",
        EmailId: "required|email",
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
        console.log(req.body.password)
        const EncPassword = await EncryptPassword(req.body.password);
        const AdminData = {
            Firstname: req.body.Firstname,
            lastname: req.body.lastname,
            MobileNum: req.body.MobileNum,
            EmailId: req.body.EmailId,
            Password: EncPassword,
        }
        const AddAdmin = new AdminModel(AdminData);
        const RegisterAdmin = await AddAdmin.save();
        if (RegisterAdmin) {
            res.send({ message: "Admin Registered Successfully" }).status(200)
        } else {
            res.send({ message: "Admin  Not Registered" }).status(400)
        }
    }
}

async function ViewAdmins(req, res) {
    const Admins = await AdminModel.find();
    if (Admins.length > 0) {
        res.send(Admins).status(200)
    } else {
        res.send({ message: "Admins Not Exists" }).status(400)
    }
}

async function ViewAdmin(req, res) {
    const id = req.params.id;
    const Admin = await AdminModel.findById(id);
    if (Admin) {
        res.send(Admin).status(200)
    } else {
        res.send({ message: "Admin Not Exists" }).status(400)
    }
}

async function UpdateAdmin(req, res) {
    const validate = new Validator(req.body, {
        Firstname: "required|string",
        lastname: "required|string",
        MobileNum: "required|numeric|digits:10",
        EmailId: "required|email",
    });
    let matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const id = req.params.id;
        const AdminData = {
            Firstname: req.body.Firstname,
            lastname: req.body.lastname,
            MobileNum: req.body.MobileNum,
            EmailId: req.body.EmailId,
        }
        const RegisterAdmin = await AdminModel.findByIdAndUpdate(id, AdminData);
        if (RegisterAdmin) {
            res.send({ message: "Admin Updated Successfully" }).status(200)
        } else {
            res.send({ message: "Admin  Not Updated" }).status(400)
        }
    }
}

async function DeleteAdmin(req, res) {
    const id = req.params.id;
    const Admin = await AdminModel.findByIdAndDelete(id);
    if (Admin) {
        res.send(Admin).status(200)
    } else {
        res.send({ message: "Admin Not Deleted" }).status(400)
    }
}

async function Login(req, res) {
    const validate = new Validator(req.body, {
        EmailId: "required|email",
        Password: "required|string",
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).json( validate.errors );
    } else {
        const user = await AdminModel.findOne({ EmailId: req.body.EmailId });
        if (user && await bcrypt.compare(req.body.Password, user.Password)) {
            const token = await GenerateToken(user._id);
            res.status(200).send({ message: "Log in Successfully", token: token,role:"admin" });
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
        const Admin = await AdminModel.findOne({ EmailId: req.body.EmailId });
        if (!Admin) {
            res.send({ message: "This Admin Not Exists" }).status(404)
        } else {
            const CheckOTPMail= await GenerateOtp(req.body.EmailId);
            if (CheckOTPMail) {
                res.send({message:"OTP is Send Please Check the Email",EmailId:req.body.EmailId}).status(200);
            } else {
                res.send({message:"OTP Not Send ",}).status(400);
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
            res.send( {
                message: 'OTP verified Successfully',
                emailid: req.body.EmailId
            }).status(200);
        } else {
            // If OTp  is Verified
            res.send( {
                message: 'OTP Not verified Or OTP Expired',
            }).status(400)
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
        const Resetpassword = await AdminModel.findOneAndUpdate({ EmailId: req.body.EmailId }, formdata);

        if (Resetpassword) {
            res.send({message:"Password Reset Successfully"}).status(200);
        } else {
            res.send({message:"Password Not Reset"}).status(400);
        }
    }
}

async function GenerateToken(id) {
    const jwtkey = process.env.JWT_SECRATE_KEY;
    const token = jwt.sign({ id:id, role: 'admin' }, jwtkey);
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

    console.log(process.env.USERID)
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

async function getadminBytoken(req,res) {
    const id = req.user.id;
    const Admin = await AdminModel.findById(id);
    if (Admin) {
        res.send(Admin).status(200)
    } else {
        res.send({ message: "Admin Not Exists" }).status(400)
    }
} 

module.exports = {
    CreateAdmin,
    ViewAdmins,
    ViewAdmin,
    UpdateAdmin,
    DeleteAdmin,
    Login,
    ForgetPassword,
    VerifyOtp,
    ResetPassword,
    getadminBytoken
}
