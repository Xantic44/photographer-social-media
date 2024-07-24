import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PhotoDetails() {
    const [photo, setPhoto] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetch(`/api/photo?id=${id}`)
                .then((res) => res.json())
                .then((data) => setPhoto(data));

            fetch(`/api/comment?photoId=${id}`)
                .then((res) => res.json())
                .then((data) => setComments(data));
        }
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const res = await fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ photoId: id, text: comment }),
        });

        if (res.ok) {
            const newComment = await res.json();
            setComments([...comments, newComment]);
            setComment('');
        } else {
            const data = await res.json();
            alert(data.message);
        }
    };

    if (!photo) return <div>Loading...</div>;

    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white p-4 rounded shadow-md">
                <imgage  src={photo.photoUrl} alt={photo.description} className="w-full h-auto" />
                <p>{photo.description}</p>
                <p>By: {photo.user.name}</p>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Comments</h3>
                <form onSubmit={handleCommentSubmit} className="mb-4">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Add a comment"
                        required
                    ></textarea>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Submit</button>
                </form>
                {comments.map((comment) => (
                    <div key={comment._id} className="bg-gray-100 p-2 rounded mb-2">
                        <p><strong>{comment.user.name}</strong>: {comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
