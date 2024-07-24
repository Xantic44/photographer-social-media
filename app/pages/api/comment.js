import connectDB from '../../utils/db';
import Comment from '../../models/comment';
import auth from '../../utils/auth';

connectDB();

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const user = await auth(req, res);
            if (!user) return;

            const { photoId, text } = req.body;

            if (!photoId || !text) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }

            const comment = new Comment({
                user: user._id,
                photo: photoId,
                text,
            });

            await comment.save();
            res.status(201).json(comment);
            break;
        case 'GET':
            const { photoId: getPhotoId } = req.query;
            if (!getPhotoId) {
                return res.status(400).json({ message: 'Photo ID is required' });
            }

            const comments = await Comment.find({ photo: getPhotoId }).populate('user', 'name');
            res.status(200).json(comments);
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
