export default function Header() {
    return (
        <header className="w-full bg-white p-4">
            <div className="w-full max-w-7xl m-auto flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Высота 1488</h1>
                <div className="flex items-center space-x-4 gap-8">
                    <button className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-lg">История бронирования</button>
                    <div className="flex items-center gap-4">
                        <div className="rounded-full p-2 bg-blue-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-black text-xl font-semibold">Иван</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    )
}