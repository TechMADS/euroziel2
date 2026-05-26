export default function Hero() {
    return (
        <>
        <div className="relative h-screen flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-75"></div>
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-5xl font-bold mb-4">Welcome to Our Website</h1>
                <p className="text-xl mb-8">Discover amazing content and connect with us.</p>
                <a href="#learn-more" className="inline-block bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">Learn More</a>
            </div>
        </div>
        </>
    )
}