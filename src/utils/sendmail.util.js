import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SERVER_EMAIL_ADDR,
    pass: process.env.SERVER_EMAIL_PASS,
  },
});

const sendVerificationEmail = (email, code) => {
  const mailOptions = {
    from: process.env.SERVER_EMAIL_ADDR,
    to: email,
    subject: "Email Verification Code",
    text: `Your email verification code is: ${code}`,
  };

  return transporter.sendMail(mailOptions);
};

export default { sendVerificationEmail };
