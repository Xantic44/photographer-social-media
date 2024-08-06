import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditPhoto() {
    const [form, setForm] = useState({ description: '', tags: '' });
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const res = await fetch(`/api/photo/${id}`);
                const data = await res.json();
                setForm({ description: data.description, tags: data.tags.join(', ') });
            };

            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/photo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...form, tags: form.tags.split(',').map(tag => tag.trim()) }),
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
            <h2 className="text-3xl font-bold mb-4">Edit Photo</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <textarea name="description" id="description" className="w-full p-2 border border-gray-300 rounded mt-1" value={form.description} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="tags" className="block text-gray-700">Tags</label>
                    <input type="text" name="tags" id="tags" className="w-full p-2 border border-gray-300 rounded mt-1" value={form.tags} onChange={handleChange} required />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
            </form>
        </div>
    );
}
