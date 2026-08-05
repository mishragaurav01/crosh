import mongoose from 'mongoose';
import { config } from './src/config/index.js';
import { RoleModel } from './src/domain/role/role.schema.js';

const seedRoles = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('Connected to MongoDB');

        const rolesToSeed = [
            { name: 'Customer', description: 'Standard user role for buyers' },
            { name: 'Admin', description: 'System administrator with full access' }
        ];

        for (const role of rolesToSeed) {
            const existingRole = await RoleModel.findOne({ name: role.name });
            if (!existingRole) {
                await RoleModel.create(role);
                console.log(`Created role: ${role.name}`);
            } else {
                console.log(`Role already exists: ${role.name}`);
            }
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding roles:', error);
        process.exit(1);
    }
};

seedRoles();
