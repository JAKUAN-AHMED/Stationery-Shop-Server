import { Router } from "express";
import auth from "../../middlewares/auth";
import { ProductControllers } from "./product.controller";

const router=Router();

//create product
router.post('/create-product',auth('admin'),ProductControllers.createProduct)

export const ProductRoutes=router;