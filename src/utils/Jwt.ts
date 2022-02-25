import jwt from 'jsonwebtoken';
import { env } from 'process';

class Jwt {
    public static generateToken = (data: any): string => {
        const secretKey = env.JWT_SECRET || 'secret';
        const expiresIn = env.JWT_ACCESS_TOKEN_EXPIRED || '5m';

        const token = jwt.sign({ data }, secretKey, { expiresIn, algorithm: 'HS256' });
        return token;
    }

    public static generateRefreshToken = (data: any): string => {
        const secretKey = env.JWT_SECRET_REFRESH_TOKEN || 'secret';
        const expiresIn = env.JWT_ACCESS_TOKEN_EXPIRED || '1d';
        const token = jwt.sign({ data }, secretKey, { expiresIn, algorithm: 'HS256' });
        return token;
    }

}

export default Jwt;