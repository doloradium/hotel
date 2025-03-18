export default function Footer() {
    return (
        <footer className="w-full sticky top-0 shadow-lg bg-white px-4 py-8 border-t border-gray-200">
            <div className="w-full max-w-7xl m-auto flex items-center justify-between relative">
                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-xl mb-2">Страницы</h2>
                    <a href="#" className="block text-blue-500">История бронирования</a>
                    <a href="#" className="block text-blue-500">Авторизация</a>
                    <a href="#" className="block text-blue-500">Главная</a>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-2/4 flex items-center justify-center flex-col gap-2">
                    <h2 className="font-semibold text-2xl">DSTU Hotel</h2>
                    <p className="text-black/50 ">© 2025, Все права защищены</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-xl mb-2">Над проектом работали</h2>
                    <p>Демьяненко Владислав</p>
                    <p>Сафонов Максим</p>
                    <p>Макей Валерий</p>
                </div>
            </div>
        </footer>
    )
}