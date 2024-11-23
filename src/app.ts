import express, { Request, Response } from 'express';
const app = express();
import ProductRoutes from './routes/ProductRoutes';
import OrderRoutes from './routes/OrderRoutes';
app.use(express.json());

//application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
