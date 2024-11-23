import express from 'express';
import { ValidateRequest } from '../middlewares/ValidateRequest';
import {
  productUpdateValidation,
  productValidation,
} from '../utility/ProductValidation';
import { ProductController } from '../Controllers/ProductController';

const router = express.Router();

router.get('/:productId', ProductController.getProductById);
router.put(
  '/:productId',
  ValidateRequest(productUpdateValidation),
  ProductController.updateProduct,
);
router.delete('/:productId', ProductController.deleteProduct);
router.get('/', ProductController.getAllProducts);
router.post(
  '/',
  ValidateRequest(productValidation),
  ProductController.createProduct,
);
export default router;
