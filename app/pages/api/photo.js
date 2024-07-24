import connectDB from '../../utils/db';
import Photo from '../../models/photo';
import auth from '../../utils/auth';

connectDB();

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const user = await auth(req, res);
            if (!user) return;

            const { photoUrl, description } = req.body;

            if (!photoUrl || !description) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }

            const photo = new Photo({
                user: user._id,
                photoUrl,
                description,
            });

            await photo.save();
            res.status(201).json(photo);
            break;
        case 'GET':
            const photos = await Photo.find().populate('user', 'name');
            res.status(200).json(photos);
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
