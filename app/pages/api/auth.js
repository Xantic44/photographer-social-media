import connectDB from '../../utils/db';
import User from '../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../../utils/auth';
connectDB();

export default async function handler(req, res) {
    
    const { method } = req;

    switch (method) {
        case 'POST':
            const { name, email, password, type } = req.body;

            if (!email || !password || (type === 'register' && !name)) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }

            if (type === 'register') {
                const existingUser = await User.findOne({ email });

                if (existingUser) {
                    return res.status(400).json({ message: 'User already exists' });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const user = new User({
                    name,
                    email,
                    password: hashedPassword,
                });

                await user.save();

                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });

                res.status(201).json({ token });
            } else if (type === 'login') {
                const user = await User.findOne({ email });

                if (!user) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }

                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }

                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });

                res.status(200).json({ token });
            } else {
                res.status(400).json({ message: 'Invalid request' });
            }
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
