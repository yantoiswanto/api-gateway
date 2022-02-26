import axios from 'axios';
import { Request, Response } from 'express';
import { env } from 'process';
import Jwt from '../utils/Jwt';

class UsersController {

    index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const users = await axios.get(`${env.URL_SERVICE_USER}/users`);
            return res.json(users.data)
        } catch (err: any) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).json({ status: 'error', message: 'service unavailable' })
            }
            if (err.response) {
                const { status, data } = err.response;
                return res.status(status).json(data);
            }

            return res.status(500).json({ status: 'error', message: err.message });
        }
    }

    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await axios.post(`${env.URL_SERVICE_USER}/users/register`, req.body);
            return res.json(user.data)
        } catch (err: any) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).json({ status: 'error', message: 'service unavailable' })
            }

            if (err.response) {
                const { status, data } = err.response;
                return res.status(status).json(data);
            }

            return res.status(500).json({ status: 'error', message: err.message });
        }
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await axios.post(`${env.URL_SERVICE_USER}/users/login`, req.body);

            const dataUser = user.data.data;

            const token = Jwt.generateToken(dataUser);
            const refreshToken = Jwt.generateRefreshToken(dataUser);

            await axios.post(`${env.URL_SERVICE_USER}/refresh-token`, {
                refresh_token: refreshToken,
                user_id: dataUser.id
            });

            return res.json({
                status: 'success',
                data: {
                    token,
                    refreshToken
                }
            });

        } catch (err: any) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).json({ status: 'error', message: 'service unavailable' })
            }

            if (err.response) {
                const { status, data } = err.response;
                return res.status(status).json(data);
            }

            return res.status(500).json({ status: 'error', message: err.message });
        }
    }


    logout = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await axios.post(`${env.URL_SERVICE_USER}/users/logout`, req.body);
            return res.json(user.data)
        } catch (err: any) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).json({ status: 'error', message: 'service unavailable' })
            }
            if (err.response) {
                const { status, data } = err.response;
                return res.status(status).json(data);
            }

            return res.status(500).json({ status: 'error', message: err.message });
        }
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const user = await axios.put(`${env.URL_SERVICE_USER}/users/${id}`, req.body);
            return res.json(user.data)
        } catch (err: any) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).json({ status: 'error', message: 'service unavailable' })
            }
            if (err.response) {
                const { status, data } = err.response;
                return res.status(status).json(data);
            }

            return res.status(500).json({ status: 'error', message: err.message });
        }
    }

    getUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const user = await axios.get(`${env.URL_SERVICE_USER}/users/${id}`);
            return res.json(user.data)
        } catch (err: any) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).json({ status: 'error', message: 'service unavailable' })
            }
            if (err.response) {
                const { status, data } = err.response;
                return res.status(status).json(data);
            }

            return res.status(500).json({ status: 'error', message: err.message });
        }
    }

}

export default new UsersController;
