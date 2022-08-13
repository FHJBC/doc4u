import express, { Request, Response, NextFunction } from 'express';
import config from 'config';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from '../src/utils/connect';
import logger from '../src/utils/logger';
import { StatusError } from './utils/error';

dotenv.config();

const PORT = config.get<number>('port');

const app = express();

//middlewares
app.use(cors());
// app.use(cookieParser())
app.use(express.json());

app.use((err: StatusError, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect();
});
