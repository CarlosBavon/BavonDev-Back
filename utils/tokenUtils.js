const jwt = require('jsonwebtoken');

exports.generateTokens = (adminId) => {
    const accessToken = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });

    const refreshToken = jwt.sign({ id: adminId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
    });

    return { accessToken, refreshToken };
};