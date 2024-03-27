import express from 'express';
import { CreditController } from '../controllers/creditController';

const router = express.Router();
const creditController = new CreditController();

router.get('/credits', creditController.getAllCredits);
router.post('/credits', creditController.createCredit);

export { router as creditRoutes };
