import axios from "axios";
import { Request, Response } from "express";
import { env } from "process";
import Jwt from "../utils/Jwt";


class RefreshToken {

    index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const refreshToken = req.body.refresh_token;
            const email = req.body.email;
            if (!refreshToken || !email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'refresh token and email invalid'
                })
            }

            await axios.get(`${env.URL_SERVICE_USER}/refresh-token`, {
                params: {
                    refresh_token: refreshToken
                }
            });

            const verifyToken = Jwt.verifyToken(refreshToken);
            console.log(verifyToken);
            if (verifyToken.data.email !== email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'email not valid'
                })
            }

            const token = Jwt.generateToken(verifyToken);
            return res.json({
                status: 'success',
                data: {
                    token
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


}


export default new RefreshToken();
