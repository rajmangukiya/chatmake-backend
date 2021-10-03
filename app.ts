import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { createConnection } from "typeorm";
import { setup } from './src/api/routes/index';
import { development, test, production } from "./src/database/config";
import cors from 'cors';
import dotenv from "dotenv";
import { socketServer } from './src/socket';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: ['https://rajmangukiya.github.io', 'http://localhost:3000']
}))

app.use(express.json());
setup(app);
socketServer(httpServer);

app.get('/', (req: any, res: Response) => {
  console.log(req.user);
  
  res.send('<h1>Server is running</h1>')
})

createConnection(PORT === 5000 ? development : test)
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Error: ", e);
  });