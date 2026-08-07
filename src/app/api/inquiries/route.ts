import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, eventType, phone, eventDate, location, budget, message } = body ?? {};

    if (!name || !email || !eventType) {
      return NextResponse.json(
        { error: "name, email and eventType are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Inquiry from ${name} - ${eventType}`,
      text: `
You have received a new inquiry from your website.

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Occasion: ${eventType}
Event Date: ${eventDate || 'N/A'}
Location: ${location || 'N/A'}
Budget: ${budget || 'N/A'}

Message:
${message || 'N/A'}
      `,
      html: `
        <h3>New Inquiry Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Occasion:</strong> ${eventType}</p>
        <p><strong>Event Date:</strong> ${eventDate || 'N/A'}</p>
        <p><strong>Location:</strong> ${location || 'N/A'}</p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message ? message.replace(/\n/g, '<br/>') : 'N/A'}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true, id: Date.now() }, { status: 201 });
  } catch (err) {
    console.error("inquiry error", err);
    return NextResponse.json({ error: "Failed to send inquiry email" }, { status: 500 });
  }
}
