const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send verification email
const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const mailOptions = {
      from: {
        name: "Message App",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "Email Verification - Message App",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">Email Verification</h1>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="font-size: 16px; margin-bottom: 10px;">Your verification code is:</p>
            <h2 style="color: #1e40af; font-size: 32px; text-align: center; letter-spacing: 5px; margin: 20px 0;">
              ${verificationCode}
            </h2>
            <p style="color: #4b5563; font-size: 14px;">This code will expire in 1 hour.</p>
          </div>
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            If you didn't request this verification code, please ignore this email.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    console.error("Error details:", {
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response,
    });
    return false;
  }
};

module.exports = {
  sendVerificationEmail,
};
