import { Router } from 'express';
import { getAiResult } from '../controllers/ai.controller.js';
const router = Router();

router.get('/get-result', getAiResult)


export default router;