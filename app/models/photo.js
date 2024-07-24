import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Photo || mongoose.model('Photo', PhotoSchema);
