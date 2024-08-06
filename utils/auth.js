import jwt from 'jsonwebtoken';
import User from '../../models/user';

const auth = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            res.status(401).json({ message: 'Invalid token' });
            return null;
        }
        return user;
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        return null;
    }
};

export default auth;
