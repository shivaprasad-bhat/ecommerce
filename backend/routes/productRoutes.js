import express from 'express';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
    createNewReview,
    getTopProducts,
} from '../controllers/productController.js';

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id/review').post(protect, createNewReview);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, updateProduct);

export default router;
