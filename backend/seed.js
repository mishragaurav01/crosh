import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    isSystem: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});

const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crosh');
    console.log('Connected to DB');

    let adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {
        adminRole = await Role.create({ name: 'Admin', description: 'Super Administrator', isSystem: true });
        console.log('Admin role created');
    }

    // Find and completely recreate admin to fix the incorrect passwordHash field issue
    await User.deleteOne({ email: 'admin@crosh.com' });

    const password = await bcrypt.hash('Admin@123', 10);
    await User.create({
        firstName: 'System',
        lastName: 'Admin',
        email: 'admin@crosh.com',
        password,
        roles: [adminRole._id]
    });
    console.log('Admin user correctly created with matching schema');

    console.log('✅ Seeding complete. You can now login with admin@crosh.com / Admin@123');
    process.exit(0);
}

seed().catch(console.error);
