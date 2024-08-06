import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Header() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between">
                <div>
                    <Link href="/">
                        <a className="text-lg font-bold">PhotoApp</a>
                    </Link>
                </div>
                <div>
                    <Link href="/upload">
                        <a className="mr-4">Upload</a>
                    </Link>
                    <Link href="/profile">
                        <a className="mr-4">Profile</a>
                    </Link>
                    <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                </div>
            </nav>
        </header>
    );
}
