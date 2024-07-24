import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...form, type: 'register' }),
        });

        if (res.ok) {
            router.push('/login');
        } else {
            const data = await res.json();
            alert(data.message);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input type="text" name="name" id="name" className="w-full p-2 border border-gray-300 rounded mt-1" value={form.name} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" name="email" id="email" className="w-full p-2 border border-gray-300 rounded mt-1" value={form.email} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" name="password" id="password" className="w-full p-2 border border-gray-300 rounded mt-1" value={form.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
            </form>
        </div>
    );
}
