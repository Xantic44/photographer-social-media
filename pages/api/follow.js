import connectDB from '../../../app/utils/db';
import User from '../../../app/models/user';
import auth from '../../../app/utils/auth';

connectDB();

export default async function handler(req, res) {
    const { method } = req;
    const { userId } = req.body;

    switch (method) {
        case 'POST':
            const user = await auth(req, res);
            if (!user) return;

            const targetUser = await User.findById(userId);
            if (!targetUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.following.includes(targetUser._id)) {
                user.following = user.following.filter(followingId => followingId.toString() !== targetUser._id.toString());
                targetUser.followers = targetUser.followers.filter(followerId => followerId.toString() !== user._id.toString());
            } else {
                user.following.push(targetUser._id);
                targetUser.followers.push(user._id);
            }

            await user.save();
            await targetUser.save();

            res.status(200).json({ message: 'Follow status updated' });
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
