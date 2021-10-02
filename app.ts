import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { createConnection } from "typeorm";
import { setup } from './src/api/routes/index';
import { development, test, production } from "./src/database/config";
import cors from 'cors';
import { socketServer } from './src/socket';

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: ['https://rajmangukiya.github.io', 'http://localhost:3000']
}))

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Server is running</h1>')
})

app.use(express.json());
setup(app);
socketServer(httpServer);

createConnection(test)
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((e) => {
    consol.log("Error: ", e);
  });