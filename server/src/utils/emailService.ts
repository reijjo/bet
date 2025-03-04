import { config } from "./config";
import nodemailer from "nodemailer";

const { EMAIL_USER, FRONTEND_URL, EMAIL_FROM, GMAIL_APP_PASSWORD } = config;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const verifyUrl = `${FRONTEND_URL}/register/${token}`;

  const mailOptions = {
    from: `"Tärpit" <${EMAIL_FROM}>`,
    to: to,
    subject: "Verify your account",
    html: `
		 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Tärpit!</h2>
        <p>Thank you for registering. Please verify your email address to complete your account setup.</p>
        <div style="margin: 30px 0;">
          <a href="${verifyUrl}" style="background-color: #2b2b91; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p>${verifyUrl}</p>
        <p>This verification link will expire in 1 hour.</p>
        <p>If you didn't request this email, please ignore it.</p>
      </div>
    `,
    text: `Welcome to Your App! Please verify your email address by visiting: ${verifyUrl}\nThis link will expire in 1 hour.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
