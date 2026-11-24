const userModel = require("../../models/userModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { transporter } = require("../../config/helper");
// const { transporter } = require("../../config/helper.js");
// import { transporter } from "../../config/helper.js";
const saltRounds = 10;

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

let authController = {
  register: async (req, res) => {
    let insertData = req.body;
    //Check Email Already exist
    let checkEmail = await userModel.findOne({ email: insertData.email });
    if (checkEmail) {
      let obj = {
        status: false,
        message: "Email already Exist",
      };
      return res.send(obj);
    }
    //Check Phone Already exist
    let checkPhone = await userModel.findOne({ phone: insertData.phone });
    if (checkPhone) {
      let obj = {
        status: false,
        message: "Phone already Exist",
      };
      return res.send(obj);
    }
    //Data Insert Password Hash
    const hash = bcrypt.hashSync(insertData.password, saltRounds);
    insertData.password = hash;
    let userRes = await userModel(insertData);
    let insertRes = await userRes.save();
    // console.log(insertData);

    let obj = {
      status: true,
      message: "User Created",
      data: insertRes,
    };
    res.send(obj);
  },

  login: async (req, res) => {
    let { email, password } = req.body;
    //Email Check
    let checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      //password
      let dbPassword = checkEmail.password; //dbPasswrod

      if (bcrypt.compareSync(password, dbPassword)) {
        var token = jwt.sign(
          {
            id: checkEmail._id,
          },
          process.env.TOKENKEY,
        );
        console.log(token);

        let responseData = checkEmail.toObject();
        delete responseData.password;
        let obj = {
          status: true,
          token,
          data: responseData,
        };
        return res.send(obj);
      } else {
        let obj = {
          status: false,
          message: "Invalid Password",
        };
        return res.send(obj);
      }
    } else {
      let obj = {
        status: false,
        message: "Invalid Email Id",
      };
      return res.send(obj);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      let checkEmail = await userModel.findOne({ email: email.trim() });
      if (checkEmail) {
        if (typeof email !== "string" || !email.trim()) {
          return res.status(400).send({
            status: false,
            message: "Email is required",
          });
        }

        const user = await userModel.findOne({ email: email.trim() });
        const response = {
          status: true,
          message:
            "We received a request to reset your password, a reset link has been sent",
        };

        if (!user) {
          return res.send(response);
        }

        const frontendUrl = `${process.env.FRONTEND_URL}${checkEmail._id}`;
        if (!frontendUrl) {
          throw new Error("FRONTEND_URL is not configured");
        }
        const frontend = new URL(frontendUrl);
        if (frontend.protocol !== "http:" && frontend.protocol !== "https:") {
          throw new Error("FRONTEND_URL must use HTTP or HTTPS");
        }

        const resetToken = jwt.sign(
          { id: user._id, purpose: "password-reset" },
          process.env.TOKENKEY,
          { expiresIn: "15m" },
        );
        const resetUrl = new URL(
          `/reset-password/${encodeURIComponent(user._id)}?token=${encodeURIComponent(resetToken)}`,
          frontend,
        ).toString();
        const name = escapeHtml(user.name || "there");

        const info = await transporter.sendMail({
          from: '"Shivani Support" <senobeast21@gmail.com>',
          to: "asaloshi1@gmail.com",
          subject: "Reset your password",
          text: `Hi ${user.name || "there"},\n\nWe received a request to reset your password. Use this link within 15 minutes:\n${resetUrl}\n\nIf you did not request this, you can safely ignore this email.`,
          html: `
          <!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Reset your password</title>
            </head>
            <body style="margin:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#263238;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f8;padding:32px 12px;">
                <tr><td align="center">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#fff;border-radius:8px;padding:36px;">
                    <tr><td>
                      <h1 style="margin:0 0 20px;font-size:24px;color:#17202a;">Reset your password</h1>
                      <p style="font-size:16px;line-height:1.6;">Hi ${name},</p>
                      <p style="font-size:16px;line-height:1.6;">We received a request to reset the password for your account. Use the button below within 15 minutes to choose a new password.</p>
                      <p style="margin:28px 0;">
                        <a href="${escapeHtml(resetUrl)}" style="display:inline-block;background:#1565c0;color:#fff;text-decoration:none;padding:13px 22px;border-radius:5px;font-weight:bold;">Reset password</a>
                      </p>
                      <p style="font-size:14px;line-height:1.6;color:#546e7a;">If the button does not work, copy and paste this link into your browser:<br><a href="${escapeHtml(resetUrl)}" style="color:#1565c0;word-break:break-all;">${escapeHtml(resetUrl)}</a></p>
                      <p style="font-size:14px;line-height:1.6;color:#546e7a;">If you did not request a password reset, you can safely ignore this email.</p>
                    </td></tr>
                  </table>
                </td></tr>
              </table>
            </body>
          </html>
        `,
        });
        let obj = {
          status: true,
          message: " Reset link send to your Email",
        };
        res.send(obj);
        return res.send(response);
      } else {
        let obj = {
          status: false,
          message: "Email id not Exist",
        };
        res.send(obj);
      }
    } catch (err) {
      console.error("Error while sending mail:", err);
      return res.status(500).send({
        status: false,
        message: "Failed to send email",
      });
    }
  },

  resetPassword: async (req, res) => {
    let { id } = req.params;
    let { newPassword, confirmPassword } = req.body;
    if (newPassword == confirmPassword) {
      const hash = bcrypt.hashSync(newPassword, saltRounds);
      await userModel.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: hash,
          },
        },
      );
      let obj = {
        status: true,
        message: "Password Change Successfully",
      };
      res.send(obj);
    } else {
      let obj = {
        status: false,
        message: "New Password & Confirm Password do not match",
      };
      res.send(obj);
    }
  },

  changePassword: async (req, res) => {
    let { oldPassword, newPassword, confirmPassword } = req.body;

    let token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.TOKENKEY);
    // console.log(decoded);
    let { id } = decoded;
    // console.log(id);
    let data = await userModel.findOne({ _id: id });
    // console.log(data);
    let dbPassword = data.password;
    if (bcrypt.compareSync(oldPassword, dbPassword)) {
      if (newPassword !== confirmPassword) {
        let obj = {
          status: false,
          message: "New Password & Confirm Pasword do not match",
        };
        res.send(obj);
      } else {
        const hash = bcrypt.hashSync(newPassword, saltRounds);
        await userModel.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              password: hash,
            },
          },
        );
        let obj = {
          status: true,
          message: "Password changed Successfully",
        };
        return res.send(obj);
      }
      {
        let obj = {
          status: true,
          message: "Change Password Api",
        };
        res.send(obj);
      }
    } else {
      let obj = {
        status: false,
        message: "Invalid Old Passwrod",
      };
      return res.send(obj);
    }

    let obj = {
      status: true,
      message: "Change Password Api",
    };
    res.send(obj);
  },

  updateProfile: async (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.TOKENKEY);
    let { id } = decoded;

    let updateData = req.body;
    if (req.file) {
      updateData.image = req.file.filename;
    }
    console.log("Update Data", updateData);
    let updateRes = await userModel.updateOne(
      { _id: id },
      { $set: updateData },
    );

    let obj = {
      status: true,
      message: "Update Profile Api",
      updateRes,
    };
    res.send(obj);
  },
};

module.exports = authController;
