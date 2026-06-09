const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const ADMIN_EMAIL = 'carlosbavon46@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_SEED_PASSWORD;

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[SEED] Connected to MongoDB');

        // Remove any admin that isn't the allowed one
        await Admin.deleteMany({ email: { $ne: ADMIN_EMAIL } });

        let admin = await Admin.findOne({ email: ADMIN_EMAIL });
        if (admin) {
            admin.password = ADMIN_PASSWORD;    // Mongoose will hash it automatically
            admin.name = 'Carlos Bavon';
            await admin.save();
            console.log('[SEED] Admin updated.');
        } else {
            await Admin.create({
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                name: 'Carlos Bavon',
            });
            console.log('[SEED] Admin created.');
        }

        await mongoose.disconnect();
        console.log('[SEED] Done.');
        process.exit(0);
    } catch (error) {
        console.error('[SEED] Error:', error);
        process.exit(1);
    }
};

seedAdmin();