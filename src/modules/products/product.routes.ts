import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../middlewares/auth';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/ValidateRequest';
import { ProductValidations } from './product.validation';
import { upload } from '../../utility/sendImageToCloudinary';

const router = Router();

//create product
router.post(
  '/create-product',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductValidations.createProductValidation),
  ProductControllers.createProduct,
);

//get all products
router.get('/', ProductControllers.getAllProduct);

//product by Id
router.get('/:productId', ProductControllers.singleProduct);

//product update by Id
router.patch(
  '/:productId',
  auth('admin'),
  validateRequest(ProductValidations.updateProductValidation),
  ProductControllers.updateProduct,
);

//product by Id
router.delete('/:productId', auth('admin'), ProductControllers.deleteProduct);
export const ProductRoutes = router;
