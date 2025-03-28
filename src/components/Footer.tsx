import { useState } from 'react';
import { useNavigate } from 'react-router';

import logo from '@/assets/logo.svg';
import ModalHistory from '@/components/ModalHistory';

export default function Footer() {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <footer className="w-full z-1 sticky top-0 shadow-(--custom-shadow) bg-white py-8 border-t border-gray-200">
                <div className="relative flex flex-col items-center justify-between w-full gap-12 p-4 m-auto sm:gap-0 sm:flex-row max-w-7xl">
                    <div className="flex flex-col items-center justify-center order-first gap-2 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-2/4">
                        <div onClick={() => navigate('/')} className="flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer hover:scale-90 active:scale-90 touch-action-manipulation">
                            <img src={logo} alt="logo" className="w-10 h-10" />
                            <h1 className="text-2xl font-semibold">Высота 1488</h1>
                        </div>
                        <p className="text-black/50 ">© 2025, Все права защищены</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 sm:items-start">
                        <h2 className="mb-2 text-xl font-semibold">Страницы</h2>
                        <button onClick={() => setIsOpen(true)} className="block text-left text-blue-500 transition-all duration-300 cursor-pointer hover:scale-90 active:scale-90 active:text-orange-500 touch-action-manipulation">История бронирования</button>
                        <button onClick={() => navigate('/login')} className="block text-left text-blue-500 transition-all duration-300 cursor-pointer hover:scale-90 active:scale-90 active:text-orange-500 touch-action-manipulation">Авторизация</button>
                        <button onClick={() => navigate('/')} className="block text-left text-blue-500 transition-all duration-300 cursor-pointer hover:scale-90 active:scale-90 active:text-orange-500 touch-action-manipulation">Главная</button>
                    </div>
                    <div className="flex flex-col items-center gap-2 sm:items-end">
                        <h2 className="mb-2 text-xl font-semibold">Над проектом работали</h2>
                        <p>Демьяненко Владислав</p>
                        <p>Сафонов Максим</p>
                        <p>Макей Валерий</p>
                    </div>
                </div>
            </footer>
            <ModalHistory isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}