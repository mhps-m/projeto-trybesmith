import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import authUserMiddleware from '../middlewares/authUser.middleware';

const router = Router();

const orderController = new OrderController();

router.get('/orders', orderController.getAll);
router.post('/orders', authUserMiddleware, orderController.create);

export default router;