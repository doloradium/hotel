import Button from '@/components/Button';

export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
            <div className="w-full max-w-md flex flex-col gap-8 items-center p-8 border border-gray-200 bg-white shadow-(--custom-shadow) rounded-xl">
                <h1 className="text-2xl font-semibold text-center">Регистрация</h1>
                <form className="flex flex-col items-center w-full space-y-4">
                    <input
                        type="text"
                        className="w-full h-10 px-4 py-2 placeholder-gray-400 border border-gray-200 rounded-lg bg-gray-50"
                        placeholder="Имя"
                    />
                    <input
                        type="email"
                        className="w-full h-10 px-4 py-2 placeholder-gray-400 border border-gray-200 rounded-lg bg-gray-50"
                        placeholder="Почта"
                    />
                    <input
                        type="password"
                        className="w-full h-10 px-4 py-2 placeholder-gray-400 border border-gray-200 rounded-lg bg-gray-50"
                        placeholder="Пароль"
                    />
                    <input
                        type="password"
                        className="w-full h-10 px-4 py-2 placeholder-gray-400 border border-gray-200 rounded-lg bg-gray-50"
                        placeholder="Повторите пароль"
                    />
                    <Button type='submit' className='mt-4'>
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
            <a href="login" className="block text-left text-blue-500 transition-all duration-300 cursor-pointer hover:scale-90 active:scale-90 active:text-orange-500 touch-action-manipulation">Уже есть аккаунт? Войти</a>
        </div>
    )
}