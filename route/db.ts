import express, { Router } from 'express';
import { init_db } from '../controller/DbController';

const router: Router = express.Router();

router.post('/', init_db);

export default router;