import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { router as imageRouter } from './routes/imageRouter';

const app = express();

const PORT = 3000;

// to parse incoming requests
app.use(express.json());

// middleware to log HTTP requests and errors
app.use(morgan('dev'));

// default route
app.get('/', (req: Request, res: Response): void => {
  res.status(200).send(`sever runnig on port ${PORT}`);
});

app.use('/api', imageRouter);

app.listen(PORT, (): void => console.log(`sever runnig on port ${PORT}`));

export default app;
