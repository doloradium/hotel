import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { z } from 'zod';

import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { UserService } from '@/services';

const registrationSchema = z.object({
    name: z.string().min(2, 'Минимум 2 символa').nonempty('Имя обязательно'),
    surname: z.string().nonempty('Фамилия обязательна'),
    email: z.string().email('Неверный адрес').nonempty('Почта обязательна'),
    password: z.string().min(6, 'Минимум 6 символов').nonempty('Пароль обязателен'),
    confirmPassword: z.string().min(6, 'Минимум 6 символов').nonempty('Пароль обязателен'),
    birthDate: z.string().nonempty('Дата рождения обязательна'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
});

export default function Register() {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthDate: '',
        },
        validate: (values) => {
            const result = registrationSchema.safeParse(values);
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
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
                birth_date: values.birthDate,
            };

            try {
                const result = await UserService.register(payload);
                if (result?.success) {
                    console.log('Registration successful:', result.data);
                    toast.success('Пользователь создан')
                    navigate('/login')
                } else {
                    console.error('Registration failed:', result?.message);
                }
            } catch (error) {
                console.error('An error occurred during registration:', error);
            }
        },
    });

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 p-4">
            <div className="w-full max-w-md flex flex-col gap-8 items-center p-8 border border-gray-200 bg-white shadow-(--custom-shadow) rounded-xl">
                <h1 className="text-2xl font-semibold text-center">Регистрация</h1>
                <form className="flex flex-col items-center w-full space-y-4" onSubmit={formik.handleSubmit}>
                    <FormInput
                        name="name"
                        type="text"
                        placeholder="Имя"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                    />
                    <FormInput
                        name="surname"
                        type="text"
                        placeholder="Фамилия"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.surname && formik.errors.surname ? formik.errors.surname : undefined}
                    />
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
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        placeholder="Повторите пароль"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : undefined}
                    />
                    <FormInput
                        name="birthDate"
                        placeholder="Введите дату рождения"
                        type="date"
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.birthDate && formik.errors.birthDate ? formik.errors.birthDate : undefined}
                    />
                    <Button type='submit' className='mt-4'>
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
            <a href="login" className="block text-left text-blue-500 transition-all duration-300 cursor-pointer hover:scale-90 active:scale-90 active:text-orange-500 touch-action-manipulation">Уже есть аккаунт? Войти</a>
        </div>
    );
}