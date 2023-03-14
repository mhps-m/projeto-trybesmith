import 'express-async-errors';
import express from 'express';
import ProductRoutes from './routes/product.routes';
import UserRoutes from './routes/user.routes';
import errorHandlerMiddleware from './middlewares/errorHandler.middleware';

const app = express();

app.use(express.json());

app.use(ProductRoutes);
app.use(UserRoutes);

app.use(errorHandlerMiddleware);

export default app;
