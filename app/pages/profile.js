import connectDB from '../../../utils/db';
import User from '../../../models/User';
import auth from '../../../utils/auth';

connectDB();

export default async function handler(req, res) {
    const user = await auth(req, res);
    if (!user) return;

    res.status(200).json(user);
}
