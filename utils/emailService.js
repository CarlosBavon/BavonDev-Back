const axios = require('axios');

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const SENDER_EMAIL = process.env.EMAIL_USER || 'carlosbavon46@gmail.com';
const SENDER_NAME = 'BavDev';

const sendEmail = async (toEmail, toName, subject, htmlContent) => {
  const data = {
    sender: { email: SENDER_EMAIL, name: SENDER_NAME },
    to: [{ email: toEmail, name: toName }],
    subject,
    htmlContent,
  };

  try {
    const response = await axios.post(BREVO_API_URL, data, {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    console.log('[EMAIL] Sent successfully, messageId:', response.data.messageId);
  } catch (error) {
    const errMsg = error.response?.data || error.message;
    console.error('[EMAIL] Brevo error:', errMsg);
    throw error;
  }
};

// 1. Admin notification when someone submits the contact form
exports.sendContactNotification = async (contact) => {
  await sendEmail(
    process.env.ADMIN_EMAIL,
    'Carlos Bavon',
    `New Contact: ${contact.name} - ${contact.service || 'General Inquiry'}`,
    `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="border-bottom: 2px solid #000; padding-bottom: 10px;">New Contact Message</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
        <p><strong>Service:</strong> ${contact.service || 'N/A'}</p>
        <p><strong>Budget:</strong> ${contact.budget || 'N/A'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      </div>
    `
  );
};

// 2. Client confirmation when they book a call
exports.sendBookingConfirmation = async (booking) => {
  await sendEmail(
    booking.email,
    booking.name,
    'Booking Request Received - BavDev',
    `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Booking Request Received</h2>
        <p>Hi ${booking.name},</p>
        <p>Thank you for booking a consultation with BavDev. We have received your request and will confirm the meeting details shortly.</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Preferred Date:</strong> ${booking.preferredDate || 'Flexible'}</p>
        <p>We'll be in touch soon!</p>
        <hr />
        <p style="color: #666;">BavDev - Full Stack Development</p>
      </div>
    `
  );
};

// 3. Admin notification when someone books a call
exports.sendBookingAdminNotification = async (booking) => {
  await sendEmail(
    process.env.ADMIN_EMAIL,
    'BavDev Admin',
    `New Booking: ${booking.name} - ${booking.service || 'Booking Request'}`,
    `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="border-bottom: 2px solid #000; padding-bottom: 10px;">New Booking Request</h2>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone || 'N/A'}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Preferred Date:</strong> ${booking.preferredDate || 'Flexible'}</p>
        <p><strong>Preferred Time:</strong> ${booking.preferredTime || 'Flexible'}</p>
        <p><strong>Meeting Type:</strong> ${booking.meetingType || 'Google Meet'}</p>
        <p><strong>Message:</strong></p>
        <p>${booking.message || 'No additional message'}</p>
        <hr />
        <p style="color: #666;">Manage bookings in the <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/admin/bookings">Admin Dashboard</a></p>
      </div>
    `
  );
};