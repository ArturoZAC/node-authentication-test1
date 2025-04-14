import express, { Router } from "express"
import cors from 'cors';

import { invalidJsonMiddleware } from "./middleware/invalid-json.middleware";

export class AppServer {

  private readonly app = express();

  public constructor(
    private readonly port: number,
    private readonly routes: Router,
  ){}


  public start = () => {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use( invalidJsonMiddleware )
    this.app.use( this.routes )
    this.app.listen( this.port, () => {
      console.log(`Server is running on port ${ this.port}`);
    })
  }
};