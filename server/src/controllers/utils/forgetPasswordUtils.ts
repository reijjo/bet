import { config } from "../../utils/config";
import nodemailer from "nodemailer";

const { EMAIL_USER, FRONTEND_URL, EMAIL_FROM, GMAIL_APP_PASSWORD } = config;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

export const sendForgetPasswordEmail = async (to: string, token: string) => {
  const URL =
    process.env.NODE_ENV === "production" || Bun.env.NODE_ENV === "production"
      ? "https://tarpit.pages.dev"
      : FRONTEND_URL;
  const verifyUrl = `${URL}/forgot/${token}`;

  console.log("VERIFY URL:", verifyUrl);

  const mailOptions = {
    from: `"Tärpit" <${EMAIL_FROM}>`,
    to: to,
    subject: "Get your password changed",
    html: `
		 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2>No worries!</h2>
				<p>Just click the button to get your password changed.</p>
				<div style="margin: 30px 0;">
					<a href="${verifyUrl}" style="background-color: #2b2b91; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
						Change Password
					</a>
				</div>
				<p>Or copy and paste this link in your browser:</p>
				<p>${verifyUrl}</p>
				<p>This verification link will expire in 1 hour.</p>
				<p>If you didn't request this email, please ignore it.</p>
			</div>
		`,
    text: `So you forgot your password... No worries! You can change your password here: ${verifyUrl}\nThis link will expire in 1 hour.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
