import {Router} from 'express';
import { addTransaction, getTRansactions } from '../controller/transactionController.js';

const transactionRouter = Router();

transactionRouter.get("/transactions",getTRansactions)
transactionRouter.post('/addtransaction',addTransaction)

export default transactionRouter;