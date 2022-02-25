import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import MediaRouter from './routers/Media.router';
import UsersRouter from './routers/Users.router';


class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void {
        this.app.route('/').get((req: Request, res: Response) => {
            res.send('Router Typescript');
        });

        this.app.use('/users', UsersRouter);
        this.app.use('/media', MediaRouter);
    }
}

const port: number = Number(process.env.PORT) || 3000;
const app = new App().app;

app.listen(port, () => {
    console.log("app is running on port " + port);

    console.log(process.env.NODE_ENV);
});
