import { useState } from 'react';
import { useNavigate } from 'react-router';

import logo from '@/assets/logo.svg';
import Button from '@/components/Button';
import ModalHistory from '@/components/ModalHistory';
import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function Header() {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

    const { data: userData, isLoading } = useQuery({ queryKey: ['getMe'], queryFn: () => UserService.getMe() });

    return (
        <>
            <header className="w-full sticky top-0 shadow-(--custom-shadow) bg-white border-b z-3 border-gray-200">
                <div className="flex items-center justify-between w-full p-4 m-auto max-w-7xl">
                    <div onClick={() => navigate('/')} className="flex items-center gap-4 transition-transform duration-200 cursor-pointer hover:scale-90 active:scale-90">
                        <img src={logo} alt="logo" className="w-10 h-10" />
                        <h1 className="hidden text-2xl font-semibold sm:block">Высота 1488</h1>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8">
                        <Button onClick={() => setIsOpen(true)}>История</Button>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-200 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-xl font-semibold text-black">{isLoading ? 'Загрузка' : userData?.data?.name}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="transition-all duration-300 cursor-pointer stroke-gray-500 hover:scale-90 active:scale-90 active:stroke-orange-500 size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>
            <ModalHistory isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}