const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify/?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verify your email',
    text: `Click the link to verify your email: ${verificationUrl}`,
    html: `<div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0c2735; background-color: #f4f4f4; border: 1px solid #28a8e0;">
        <h2 style="color: #0c2735; text-align: center;">Verify Your Email</h2>
        <p style="font-size: 16px; line-height: 1.5;">
          Thank you for signing up! Please click the button below to verify your email address.
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verificationUrl}" style="background-color: #28a8e0; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p style="font-size: 14px; line-height: 1.5;">
          If you did not sign up for this account, please ignore this email.
        </p>
        <p style="font-size: 14px; line-height: 1.5;">
          Regards,<br />
          Rise Up Mora 24
        </p>
      </div>`,
  };
    
 

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (to: string, token:string) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/resetPassword/?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Reset your password ',
    text: `Click the link to reset your password: ${verificationUrl}`,
    html: `<div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0c2735; background-color: #f4f4f4; border: 1px solid #28a8e0;">
        <h2 style="color: #0c2735; text-align: center;">Reset your password</h2>
        <p style="font-size: 16px; line-height: 1.5;">
          Please click the button below to reset your password.
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verificationUrl}" style="background-color: #28a8e0; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 14px; line-height: 1.5;">
          If you did not request to reset your password, please ignore this email.
        </p>
        <p style="font-size: 14px; line-height: 1.5;">
          Regards,<br />
          Rise Up Mora 24
        </p>
      </div>`,
  };

  await transporter.sendMail(mailOptions);
}
