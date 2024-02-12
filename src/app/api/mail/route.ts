import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_EMAIL_HOST,
  port: parseInt(process.env.NEXT_PUBLIC_EMAIL_PORT || "467") || 467,
  secure: false, // Adjust based on your provider's requirements
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { recipient, subject, text, html } = body; // Extract data from request
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER, // Use a sender name you configure
      to: recipient,
      subject: subject,
      text: text, // Optionally provide plain text content
      html: html, // Optionally provide HTML content
    };

    await transporter.sendMail(mailOptions);
    return Response.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ message: "Error sending email." });
  }

  //   return Response.json({ res });
}
