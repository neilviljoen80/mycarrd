export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Site not found</p>
                <a
                    href="https://mycarrd.online"
                    className="text-indigo-600 hover:underline"
                >
                    Create your own site at mycarrd.online
                </a>
            </div>
        </div>
    );
}
