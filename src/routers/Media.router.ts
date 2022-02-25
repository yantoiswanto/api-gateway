import MediaController from '../controllers/Media.controller';
import BaseRoutes from './Base.router';

class MediaRouter extends BaseRoutes {
    public routes(): void {
        this.router.get('/', MediaController.index);
        this.router.post('/', MediaController.create);
        this.router.delete('/:id', MediaController.delete);
    }
}

export default new MediaRouter().router;
