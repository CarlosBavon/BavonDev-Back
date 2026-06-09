require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const admin = await Admin.findOne({ email: 'carlosbavon46@gmail.com' }).select('+password');
        console.log('Admin found:', admin);
        if (admin) {
            console.log('Password hash:', admin.password);
        }
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
})();