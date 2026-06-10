const Booking = require('../models/Booking');
const { sendBookingConfirmation, sendBookingAdminNotification } = require('../utils/emailService');

exports.createBooking = async (req, res, next) => {
    try {
        const booking = await Booking.create(req.body);
        // Send confirmation to client
        sendBookingConfirmation(booking).catch((err) =>
            console.error('[EMAIL] Client confirmation failed:', err.message)
        );
        // Send notification to admin
        sendBookingAdminNotification(booking).catch((err) =>
            console.error('[EMAIL] Admin notification failed:', err.message)
        );
        res.status(201).json({
            success: true,
            message: 'Booking request received. We will confirm your meeting shortly.',
        });
    } catch (error) {
        next(error);
    }
};

exports.getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        next(error);
    }
};

exports.updateBookingStatus = async (req, res, next) => {
    try {
        const { status, notes } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status, notes },
            { new: true, runValidators: true }
        );
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        next(error);
    }
};

exports.deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.status(200).json({ success: true, message: 'Booking deleted' });
    } catch (error) {
        next(error);
    }
};