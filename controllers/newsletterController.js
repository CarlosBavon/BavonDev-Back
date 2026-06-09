const Subscriber = require('../models/Subscriber');

exports.subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        let subscriber = await Subscriber.findOne({ email });

        if (subscriber) {
            if (!subscriber.isActive) {
                subscriber.isActive = true;
                subscriber.unsubscribedAt = undefined;
                await subscriber.save();
            }
            return res.status(200).json({ success: true, message: 'Already subscribed.' });
        }

        await Subscriber.create({ email });
        res.status(201).json({ success: true, message: 'Successfully subscribed!' });
    } catch (error) {
        next(error);
    }
};

exports.getSubscribers = async (req, res, next) => {
    try {
        const subscribers = await Subscriber.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: subscribers.length, data: subscribers });
    } catch (error) {
        next(error);
    }
};

exports.unsubscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        const subscriber = await Subscriber.findOne({ email });
        if (!subscriber) return res.status(404).json({ success: false, message: 'Email not found' });
        subscriber.isActive = false;
        subscriber.unsubscribedAt = new Date();
        await subscriber.save();
        res.status(200).json({ success: true, message: 'Unsubscribed successfully' });
    } catch (error) {
        next(error);
    }
};

exports.deleteSubscriber = async (req, res, next) => {
    try {
        const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
        if (!subscriber) return res.status(404).json({ success: false, message: 'Subscriber not found' });
        res.status(200).json({ success: true, message: 'Subscriber deleted' });
    } catch (error) {
        next(error);
    }
};