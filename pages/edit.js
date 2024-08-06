import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditProfile() {
    const [form, setForm] = useState({ name: '', email: '' });
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const res = await fetch('/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setForm({ name: data.name, email: data.email });
        };

        fetchData();
    }, [
         router,
    ]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch('/api/auth/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push('/profile');
        } else {
            const data = await res.json();
            alert(data.message);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input type="text" name="name" id="name" className="w-full p-2 border border-gray-300 rounded mt-1" value={form.name} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" name="email" id="email" className="w-full p-2 border border-gray-300 rounded mt-1" value={form.email} onChange={handleChange} required />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
            </form>
        </div>
    );
}
