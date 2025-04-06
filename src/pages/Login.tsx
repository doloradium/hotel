import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { z } from 'zod';

import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { UserService } from '@/services';

const loginSchema = z.object({
    email: z.string().email('Неверный адрес электронной почты').nonempty('Почта обязательна'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов').nonempty('Пароль обязателен'),
});

export default function Login() {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const result = loginSchema.safeParse(values);
            if (!result.success) {
                const errors: { [key: string]: string } = {};
                result.error.errors.forEach((issue) => {
                    if (issue.path.length > 0) {
                        errors[issue.path[0]] = issue.message;
                    }
                });
                return errors;
            }
            return {};
        },
        onSubmit: async (values) => {
            const payload = {
                email: values.email,
                password: values.password,
            };

            try {
                const result = await UserService.login(payload);
                if (result?.success) {
                    console.log('Login successful:', result.data);
                    toast.success('Успешно!')
                    navigate('/')
                } else {
                    console.error('Login failed:', result?.message);
                }
            } catch (error) {
                console.error('An error occurred during login:', error);
            }
        },
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
            <div className="w-full max-w-md flex flex-col gap-8 items-center p-8 border border-gray-200 bg-white shadow-(--custom-shadow) rounded-xl">
                <h1 className="text-2xl font-semibold text-center">Вход в систему</h1>
                <form className="flex flex-col items-center w-full space-y-4" onSubmit={formik.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        placeholder="Почта"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                    />
                    <FormInput
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
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