import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [photos, setPhotos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        fetch('/api/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setUser(data));

        fetch('/api/photo/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setPhotos(data));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-4">Profile</h2>
            <div className="bg-white p-6 rounded shadow-md mb-4">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo._id} className="bg-white p-4 rounded shadow-md">
                        <img src={photo.photoUrl} alt={photo.description} className="w-full h-auto" />
                        <p>{photo.description}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white p-2 rounded">Logout</button>
        </div>
    );
}
