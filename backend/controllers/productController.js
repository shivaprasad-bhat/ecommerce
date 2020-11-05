import Products from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @description: Fetch all products
 * @route: GET /api/products
 * @access: Public
 */
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {};

    const products = await Products.find({ ...keyword });
    res.json(products);
});

/**
 * @description: Fetch single product
 * @route: GET /api/products/:id
 * @access: Public
 */
const getProductById = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

/**
 * @description: Delete single product
 * @route: DELETE /api/products/:id
 * @access: Private/AdminOnly
 */
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({
            message: 'Product Removed',
        });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

/**
 * @description: Create a product
 * @route: POST /api/products
 * @access: Private/AdminOnly
 */
const createProduct = asyncHandler(async (req, res) => {
    const product = new Products({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

/**
 * @description: Update a product
 * @route: PUT /api/products/:id
 * @access: Private/AdminOnly
 */
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body;

    const product = await Products.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

/**
 * @description: Create new review
 * @route: POST /api/products/:id/reviews
 * @access: Private
 */
const createNewReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Products.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({
            message: 'Review Added',
        });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {
    getProductById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    createNewReview,
};
