import { useState } from 'react';

export default function Search() {
    const [query, setQuery] = useState('');
    const [photos, setPhotos] = useState([]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/photo/search?query=${query}`);
        const data = await res.json();
        setPhotos(data);
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-4">Search Photos</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input type="text" name="query" className="w-full p-2 border border-gray-300 rounded mt-1" value={query} onChange={handleChange} required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Search</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo._id} className="bg-white p-4 rounded shadow-md">
                        <image src={photo.photoUrl} alt={photo.description} className="w-full h-auto" />
                        <p>{photo.description}</p>
                        <p>By: {photo.user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
