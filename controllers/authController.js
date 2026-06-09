const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { generateTokens } = require('../utils/tokenUtils');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = generateTokens(admin._id);

        admin.refreshToken = refreshToken;
        admin.lastLogin = new Date();
        await admin.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            data: {
                accessToken,
                refreshToken,
                admin: { id: admin._id, name: admin.name, email: admin.email },
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ success: false, message: 'Refresh token required' });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const admin = await Admin.findById(decoded.id).select('+refreshToken');

        if (!admin || admin.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: 'Invalid refresh token' });
        }

        const tokens = generateTokens(admin._id);
        admin.refreshToken = tokens.refreshToken;
        await admin.save({ validateBeforeSave: false });

        res.status(200).json({ success: true, data: tokens });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
};

exports.logout = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin._id).select('+refreshToken');
        admin.refreshToken = null;
        await admin.save({ validateBeforeSave: false });
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin._id);
        res.status(200).json({ success: true, data: admin });
    } catch (error) {
        next(error);
    }
};