import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

function verifyToken(token) {
    const cert = fs.readFileSync(path.join(process.cwd(), 'public/pem/rsa_public_key.pem'));
    let res;
    try {
        //公钥 解密
        const result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
        const { exp = 0 } = result;
        const current = Date.now();
        //验证时效性
        if (current <= exp) {
            res = result.data || {};
        }
    } catch (e) {
        res = 'err';
    }
    return res;
}

export default verifyToken; 
