import { useEffect, useState } from 'react';

export default function Home() {
    const [photos, setPhotos] = useState([]); // State to store photos

    useEffect(() => {
        fetch('/api/photo') // Fetch photos from the API
            .then((res) => res.json())
            .then((data) => setPhotos(data)); // Update state with fetched photos
    }, []);

    const handleLike = async (photoId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in to like photos');
            return;
        }

        const res = await fetch(`/api/photo/like/${photoId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const updatedPhoto = await res.json();
            setPhotos(photos.map(photo => photo._id === photoId ? updatedPhoto : photo)); // Update the liked photo in state
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-4">Photo Feed</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo._id} className="bg-white p-4 rounded shadow-md relative">
                        <image src={photo.photoUrl} alt={photo.description} className="w-full h-auto" />
                        <p>{photo.description}</p>
                        <div className="flex items-center">
                            <button onClick={() => handleLike(photo._id)} className="mr-2 bg-blue-500 text-white p-1 rounded">Like</button>
                            <span>{photo.likes.length} {photo.likes.length === 1 ? 'like' : 'likes'}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
