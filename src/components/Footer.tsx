export default function Footer() {
    return (
        <footer className="w-full sticky top-0 shadow-(--custom-shadow) bg-white px-4 py-8 border-t border-gray-200">
            <div className="relative flex items-center justify-between w-full m-auto max-w-7xl">
                <div className="flex flex-col gap-2">
                    <h2 className="mb-2 text-xl font-semibold">Страницы</h2>
                    <a href="#" className="block text-blue-500">История бронирования</a>
                    <a href="#" className="block text-blue-500">Авторизация</a>
                    <a href="#" className="block text-blue-500">Главная</a>
                </div>
                <div className="absolute flex flex-col items-center justify-center gap-2 top-1/2 left-1/2 -translate-2/4">
                    <h2 className="text-2xl font-semibold">Высота 1488</h2>
                    <p className="text-black/50 ">© 2025, Все права защищены</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="mb-2 text-xl font-semibold">Над проектом работали</h2>
                    <p>Демьяненко Владислав</p>
                    <p>Сафонов Максим</p>
                    <p>Макей Валерий</p>
                </div>
            </div>
        </footer>
    )
}