import { Router } from "express";
import auth from "../../middlewares/auth";
import { ProductControllers } from "./product.controller";
import validateRequest from "../../middlewares/ValidateRequest";
import { ProductValidation } from "./product.validation";

const router=Router();

//create product
router.post('/create-product',auth('admin'),validateRequest(ProductValidation.createProductValidation),ProductControllers.createProduct)

//get all products
router.get('/',ProductControllers.getAllProduct);

//product by Id
router.get('/:productId',ProductControllers.singleProduct)

//product update by Id
router.patch('/:productId',auth('admin'),validateRequest(ProductValidation.updateProductValidation),ProductControllers.updateProduct)


//product by Id
router.delete('/:productId',auth('admin'),ProductControllers.deleteProduct)
export const ProductRoutes=router;