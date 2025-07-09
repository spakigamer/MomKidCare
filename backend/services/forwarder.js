const nodemailer = require("nodemailer");

async function forwardDetails(details) {
  if (!details) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.YOUR_GMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const message = {
    from: process.env.YOUR_GMAIL,
    to: process.env.FORWARD_TO_EMAIL,
    subject: "Extracted Email Details",
    text: `Name: ${details.name}\nEmail: ${details.email}\nContact: ${details.contact}`,
  };

  try {
    await transporter.sendMail(message);
    console.log("📤 Forwarded email details to:", process.env.FORWARD_TO_EMAIL);
  } catch (err) {
    console.error("❌ Failed to forward email:", err.message);
  }
}

module.exports = { forwardDetails };
