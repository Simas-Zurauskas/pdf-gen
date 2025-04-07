import express from 'express';
import { genPDF } from '@controlers/root';
import { protect } from '@middleware/authMiddleware';

const router = express.Router();

router.post('/gen-pdf', protect, genPDF);

export { router as rootRoutes };
