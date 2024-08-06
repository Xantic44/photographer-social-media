export default function Form({ children, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md">
            {children}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Submit</button>
        </form>
    );
}
