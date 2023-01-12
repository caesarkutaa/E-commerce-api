const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const auth = require("../middleware/authentication");


router.get('/',  productController.getAllProducts);
router.get('/:id', productController.getOneProductById);
router.post('/', auth, productController.addProduct);
router.patch('/:id',auth, productController.updateProduct);
router.delete('/:id',auth,  productController.deleteProduct);

module.exports = router;

