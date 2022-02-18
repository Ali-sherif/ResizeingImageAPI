import express from 'express';
import { imageResizer } from '../controller/imageResizer';

const router = express.Router();
router.get('/image', imageResizer);

export { router };
