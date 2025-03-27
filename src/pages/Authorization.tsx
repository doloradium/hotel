import { useState } from 'react'
import { Link } from 'react-router'

export default function Authorization() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Авторизация</h1>
                
                <form className="space-y-4">
                    <div>
                        <input 
                            type="email" 
                            placeholder="Почта" 
                            className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none"
                        />
                    </div>
                    
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Пароль" 
                            className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none"
                        />
                        <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                                    <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <Link to="/forgot-password" className="text-blue-500 hover:underline">
                            Забыли пароль?
                        </Link>
                        
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                        >
                            Войти
                        </button>
                    </div>
                </form>
                
                <div className="text-center mt-6">
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Нет аккаунта? Зарегистрироваться
                    </Link>
                </div>
            </div>
        </div>
    )
}
