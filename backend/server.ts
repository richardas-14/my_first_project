import * as express from 'express'; 
import { Router, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as fs from 'fs-extra';

interface User {
  login: string;
  email: string;
  password: string;
}

const config = {
  node: {
    port: 3000
  },
  usersFilePath: path.resolve(__dirname, 'data', 'users.json')
}

class Server {
  private app: express.Express;

  private async initApp () {
    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.get('/hello', async (req: Request, res: Response, next: NextFunction) => {
      res.send('fortune')
    });

    this.app.get('/api/hello', async (req: Request, res: Response, next: NextFunction) => {
      res.send('hello')
    });

    this.app.post('/api/user/reg', async (req: Request, res: Response, next: NextFunction) => {
      const user = req.body as User;
      const users = await fs.readJSON(config.usersFilePath) as User[];

      for (const user of users) {
        if (user.email === user.email) {
          return res.status(409).send();
        }
      }

      users.push(user);
      await fs.writeJSON(config.usersFilePath, users);

      return res.status(201).send();
    });
  }

  private async initData () {
    if (!(await fs.pathExists(config.usersFilePath))) {
      await fs.writeJSON(config.usersFilePath, []);
    }
  }

  public async start () {
    await this.initApp();
    await this.initData();
    this.app.listen(config.node.port, () => {
      console.log('listen on ' + config.node.port);
    });
  }
}

const server = new Server();
server.start();