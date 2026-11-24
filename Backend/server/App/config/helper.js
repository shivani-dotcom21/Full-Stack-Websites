import nodemailer from "nodemailer";

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "senobeast21@gmail.com",
    pass: "qazlgfdyfbyfdloe",
  },
});
