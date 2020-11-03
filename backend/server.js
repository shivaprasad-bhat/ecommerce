import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import path from 'path';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server Running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(
        `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.green
            .inverse
    )
);
