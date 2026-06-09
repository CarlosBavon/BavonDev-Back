const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/emailService');

exports.submitContact = async (req, res, next) => {
    try {
        const contact = await Contact.create(req.body);

        // Send email notification asynchronously
        sendContactNotification(contact).catch((err) =>
            console.error('[EMAIL] Contact notification failed:', err.message)
        );

        res.status(201).json({
            success: true,
            message: 'Message sent successfully. We will get back to you soon.',
        });
    } catch (error) {
        next(error);
    }
};

exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        next(error);
    }
};

exports.markAsRead = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        next(error);
    }
};

exports.deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
        res.status(200).json({ success: true, message: 'Contact deleted' });
    } catch (error) {
        next(error);
    }
};