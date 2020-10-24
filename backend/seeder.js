import mongoose from 'mongoose';
import users from './data/users.js';
import products from './data/products.js';
import dotenv from 'dotenv';
import 'colors';
import User from './models/userModel.js';
import Products from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Products.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProduct = products.map((p) => {
            return {
                ...p,
                user: adminUser,
            };
        });
        await Products.insertMany(sampleProduct);
        console.log(`Data imported`.yellow);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Products.deleteMany();
        await User.deleteMany();

        console.log(`Data destroyed`.red);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
