import express from 'express';
import {routes} from './routes';

class Api {
  public express;

  constructor() {
    this.express = express();
    this.express.use(express.json());
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.express.use('/', routes);
  }
}

export default new Api().express;
