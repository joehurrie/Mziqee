import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, color } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // Require Gmail credentials — set these in .env.local
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD env variables.');
      return NextResponse.json(
        { success: false, error: 'Email service is not configured. Contact the site owner.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass, // Gmail App Password (not your normal password)
      },
    });

    await transporter.sendMail({
      from: `"Mziqee Airbuds" <${gmailUser}>`,
      to: gmailUser, // send notification to yourself
      replyTo: email,
      subject: `🎧 New Pre-Order Reservation — ${name} (${color || 'N/A'})`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#121212;color:#f5f5f5;padding:32px;border-radius:16px;">
          <h1 style="color:#39FF14;font-size:28px;margin:0 0 8px;">New Pre-Order!</h1>
          <p style="color:#888;margin:0 0 32px;font-size:14px;text-transform:uppercase;letter-spacing:0.15em;">Mziqee Airbuds Pro</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px solid #222;">Customer</td>
              <td style="padding:12px 0;color:#fff;font-size:15px;font-weight:600;border-bottom:1px solid #222;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px solid #222;">Email</td>
              <td style="padding:12px 0;color:#fff;font-size:15px;border-bottom:1px solid #222;"><a href="mailto:${email}" style="color:#39FF14;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">Color</td>
              <td style="padding:12px 0;color:#fff;font-size:15px;font-weight:600;">${color || 'Not specified'}</td>
            </tr>
          </table>
          <p style="color:#555;font-size:12px;margin-top:32px;">Submitted via Mziqee Airbuds landing page.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
