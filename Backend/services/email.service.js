import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});
// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"MERN-E-COMMERECE" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
export async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to MERN E-Commerce Project";

  const text = `Hello ${name},

Thank you for registering at MERN E-Commerce Project.

We are excited to have you on board! You can now explore products, manage your cart, save addresses, and place orders securely through our platform.

Features available for you:
- Secure authentication with JWT
- Browse products by category
- Add and manage cart items
- Save delivery addresses
- Place and track orders

We hope you enjoy your shopping experience with us.

Best regards,
The MERN E-Commerce Team`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Welcome to MERN E-Commerce Project</h2>

      <p>Hello ${name},</p>

      <p>
        Thank you for registering at <strong>MERN E-Commerce Project</strong>.
      </p>

      <p>
        We are excited to have you on board! You can now explore products,
        manage your cart, save addresses, and place orders securely through our platform.
      </p>

      <p><strong>Features available for you:</strong></p>

      <ul>
        <li>Secure authentication with JWT</li>
        <li>Browse products by category</li>
        <li>Add and manage cart items</li>
        <li>Save delivery addresses</li>
        <li>Place and track orders</li>
      </ul>

      <p>We hope you enjoy your shopping experience with us.</p>

      <p>
        Best regards,<br />
        <strong>The MERN E-Commerce Team</strong>
      </p>
    </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}