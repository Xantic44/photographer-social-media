import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Upload() {
    const [form, setForm] = useState({ photoUrl: '', description: '', tags: '' }); // State to manage form inputs
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); // Update form state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login'); // Redirect to login if no token is found
            return;
        }

        const res = await fetch('/api/photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form), // Send form data to the API
        });

        if (res.ok) {
            router.push('/'); // Redirect to home page if upload is successful
        } else {
            const data = await res.json();
            alert(data.message); // Show error message if upload fails
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-4">Upload Photo</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="photoUrl" className="block text-gray-700">Photo URL</label>
                    <input type="text" name="photoUrl" id="photoUrl" className="w-full p-2 border border-gray-300 rounded mt-1" value={form.photoUrl} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <textarea name="description" id="description" className="w-full p-2 border border-gray-300 rounded mt-1" value={form.description} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="tags" className="block text-gray-700">Tags</label>
                    <input type="text" name="tags" id="tags" className="w-full p-2 border border-gray-300 rounded mt-1" value={form.tags} onChange={handleChange} placeholder="Comma separated" />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload</button>
            </form>
        </div>
    );
}
