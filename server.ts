import express from "express"
import { routes } from "./constants/routes";
import { corsConfig } from "./configs/cors";
import cors from 'cors'
import logger from 'morgan'

const app = express();

const port = 3001;

app.use(cors(corsConfig));
app.use(logger("dev"))
app.use(express.json());
routes(app);

app.listen(port, () => {
  console.log(`Started at ${port}`)
})