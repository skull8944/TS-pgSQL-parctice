import express, { Request, Response } from "express";
import log from "./utils/log";
import route from "./routes/route";

const app = express();

app.listen(5278, () => {
  app.use(express.json());
  app.use(route);
  log.info(`server listen at http://localhost:5278`);
  
  app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  
  app.get('*', (req: Request, res: Response) => {
    res.status(404).send("WRONG URL")
  })

});