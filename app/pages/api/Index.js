import { useEffect, useState } from 'react';

export default function Home() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch('/api/photo')
            .then((res) => res.json())
            .then((data) => setPhotos(data));
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-4">Photo Feed</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo._id} className="bg-white p-4 rounded shadow-md">
                        <img src={photo.photoUrl} alt={photo.description} className="w-full h-auto" />
                        <p>{photo.description}</p>
                        <p>By: {photo.user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
