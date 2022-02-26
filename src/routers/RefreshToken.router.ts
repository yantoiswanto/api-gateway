import RefreshTokenController from "../controllers/RefreshToken.controller";
import BaseRoutes from "./Base.router";


class RefreshTokenRouter extends BaseRoutes {
    public routes(): void {
        this.router.post('/', RefreshTokenController.index);
    }
}


export default new RefreshTokenRouter().router;