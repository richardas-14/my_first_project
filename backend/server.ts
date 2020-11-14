import * as express from 'express'; 
import { Router, Request, Response, NextFunction } from 'express';

const config = {
  node: {
    port: 3000
  }
}

class Server {
  private app: express.Express;

  private initApp () {
    this.app = express();

    this.app.get('/hello', async (req: Request, res: Response, next: NextFunction) => {
      res.send('fortune')
    });
  }

  public start () {
    this.initApp();
    this.app.listen(config.node.port, () => {
      console.log('listen on ' + config.node.port);
    });
  }
}

const server = new Server();
server.start();