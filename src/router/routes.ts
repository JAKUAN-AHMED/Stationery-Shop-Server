import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.router';
import { ProductRoutes } from '../modules/products/product.routes';
import { OrderRoutes } from '../modules/orders/order.routes';


const router = express.Router();

const moduleRoutes = [
  
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },

];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
