import connectDB from '../../../utils/db';
import Photo from '../../../app/models/photo';

connectDB();

export default async function handler(req, res) {
    const { method } = req;
    const { query } = req.query;

    switch (method) {
        case 'GET':
            const photos = await Photo.find({
                $or: [
                    { description: { $regex: query, $options: 'i' } },
                    { tags: { $regex: query, $options: 'i' } },
                ],
            }).populate('user', 'name');
            res.status(200).json(photos);
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
