import connectDB from '../../../utils/db'; // Import the database connection utility
import Photo from '../../../models/photo'; // Import the Photo model
import auth from '../../../utils/auth'; // Import the authentication middleware

connectDB(); // Connect to the database

export default async function handler(req, res) {
    const { method } = req; // Destructure the HTTP method from the request object
    const { id } = req.query; // Destructure the photo ID from the query parameters

    switch (method) {
        case 'DELETE': // Handle DELETE requests
            const user = await auth(req, res); // Authenticate the user
            if (!user) return; // If authentication fails, return early

            const photo = await Photo.findById(id); // Find the photo by ID
            if (!photo) {
                return res.status(404).json({ message: 'Photo not found' }); // Return an error if the photo is not found
            }

            if (photo.user.toString() !== user._id.toString()) {
                return res.status(403).json({ message: 'You do not have permission to delete this photo' }); // Return an error if the user does not own the photo
            }

            await photo.remove(); // Delete the photo
            res.status(200).json({ message: 'Photo deleted' }); // Return a success message
            break;
        case 'POST': // Handle POST requests for likes
            const likeUser = await auth(req, res); // Authenticate the user
            if (!likeUser) return; // If authentication fails, return early

            const likePhoto = await Photo.findById(id); // Find the photo by ID
            if (!likePhoto) {
                return res.status(404).json({ message: 'Photo not found' }); // Return an error if the photo is not found
            }

            if (likePhoto.likes.includes(likeUser._id)) {
                likePhoto.likes = likePhoto.likes.filter(like => like.toString() !== likeUser._id.toString()); // Remove the like if it exists
            } else {
                likePhoto.likes.push(likeUser._id); // Add the like if it does not exist
            }

            await likePhoto.save(); // Save the updated photo
            res.status(200).json(likePhoto); // Return the updated photo
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' }); // Return an error if the method is not allowed
            break;
    }
}
