import UsersController from '../controllers/Users.controller';
import { verifyToken } from '../middlewares/AuthMiddleware';
import BaseRoutes from './Base.router';


class UsersRouter extends BaseRoutes {
    public routes(): void {
        this.router.post('/register', UsersController.register);
        this.router.post('/login', UsersController.login)
        this.router.post('/logout', UsersController.logout)
        this.router.put('/:id', verifyToken, UsersController.update);
        this.router.get('/:id', verifyToken, UsersController.getUser);
        this.router.get('/', verifyToken, UsersController.index);
    }
}

export default new UsersRouter().router;
