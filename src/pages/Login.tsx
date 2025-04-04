import Button from '@/components/Button';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <div className="w-full max-w-md flex flex-col gap-8 items-center p-8 border border-gray-200 bg-white shadow-(--custom-shadow) rounded-xl">
        <h1 className="text-2xl font-semibold text-center">Вход в систему</h1>
        <form className="flex flex-col items-center w-full space-y-4">
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
          <Button type='submit' className='mt-4'>
            Войти
          </Button>
        </form>
      </div>
      <a href="register" className="block text-left text-blue-500 transition-all duration-300 cursor-pointer hover:scale-90 active:scale-90 active:text-orange-500 touch-action-manipulation">Нет аккаунта? Зарегистрироваться</a>
    </div>
  );
}