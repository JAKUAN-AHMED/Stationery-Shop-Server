import { Router } from "express";
import auth from "../../middlewares/auth";
import { ProductControllers } from "./product.controller";

const router=Router();

//create product
router.post('/create-product',auth('admin'),ProductControllers.createProduct)

//get all products
router.get('/',ProductControllers.getAllProduct);

//product by Id
router.get('/:productId',ProductControllers.singleProduct)

export const ProductRoutes=router;