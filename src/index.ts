import dotenv from 'dotenv';
dotenv.config();
import 'tsconfig-paths/register';
import express from 'express';
import '@services/browser';
import { rootRoutes } from '@routes/rootRoutes';
import { errorHandler } from '@middleware/errorMiddleware';
import helmet from 'helmet';
import cors from 'cors';
import { PORT } from '@conf/env';

const app = express();
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('ok');
});

app.use('/api', rootRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`.cyan);
});
