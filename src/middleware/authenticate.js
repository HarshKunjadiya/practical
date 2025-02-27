import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticate = async (req, res,next) => {
    try {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid Token!"})
    }
}