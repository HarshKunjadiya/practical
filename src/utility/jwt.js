import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;
export function signJWT(payload) {
    const token = jwt.sign(payload, secret);
    return token;
}

export async function verifyToken(token){
    console.log("in verify method");
    
     jwt.verify(token, secret, function(err, decoded) {
        if(err) {

        } 
     })

     jwt.sign(payload, secret)
    console.log("==========", decoded);
    
    return decoded;
}

