import express from 'express';
import { requestLogger } from './middlewares/middlewares';
import userRouter from './routes/userRouter';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(requestLogger);
server.use('', userRouter);

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
