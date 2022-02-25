import { Request, Response } from 'express';
import { ApiAdapter } from '../utils/ApiAdapter';
const {
    URL_SERVICE_MEDIA
} = process.env;

const api = ApiAdapter(URL_SERVICE_MEDIA);

class MediaController {

    index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const media = await api.get('/api/v1/todos');
            return res.json(media.data)
        } catch (err: any) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).json({ status: 'error', message: 'service unavailable' })
            }
            const { status, data } = err.response;
            return res.status(status).json(data);
        }
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const media = await api.post('/api/v1/todos', req.body);
            return res.json(media.data)
        } catch (err: any) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).json({ status: 'error', message: 'service unavailable' })
            }
            const { status, data } = err.response;
            return res.status(status).json(data);
        }
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const media = await api.delete(`/media/${id}`);
            return res.json(media.data)
        } catch (err: any) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).json({ status: 'error', message: 'service unavailable' })
            }
            return res.status(404).json({
                status: false,
                message: err.message
            })
        }
    }


}

export default new MediaController;
