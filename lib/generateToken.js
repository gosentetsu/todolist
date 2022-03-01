import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

function generateToken(data, validHour) {
    const created = Date.now();
    //私钥 加密
    const cert = fs.readFileSync(path.join(process.cwd(), 'public/pem/rsa_private_key.pem'));
    const validTime = validHour * 60 * 60 * 1000;  // 过期时间
    const token = jwt.sign(
        {data, exp: created + validTime},
        cert,
        { algorithm: 'RS256' }
    );
    return token;
}

export default generateToken; 
