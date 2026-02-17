const express = require('express');
const {
    getProducts,
    getPublicProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    reorderProducts,
    getProductBySlug
} = require('../controllers/products');

const router = express.Router();
// Assuming we have an auth middleware
const { protect } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

router.route('/public').get(getPublicProducts);
router.route('/slug/:slug').get(getProductBySlug);
router.route('/reorder').put(protect, authorize('admin', 'super_admin'), reorderProducts);

router.route('/')
    .get(getProducts)
    .post(protect, authorize('admin', 'super-admin'), createProduct);

router.route('/:id')
    .get(getProduct)
    .put(protect, authorize('admin', 'super_admin'), updateProduct)
    .delete(protect, authorize('admin', 'super_admin'), deleteProduct);

module.exports = router;
