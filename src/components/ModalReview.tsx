import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { z } from 'zod';

import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import Modal from '@/components/Modal';
import Stars from '@/components/Stars';
import { Interface } from '@/interfaces';
import { UserService } from '@/services';
import { useQueryClient } from '@tanstack/react-query';

const reviewSchema = z.object({
    text: z.string().min(1, 'Отзыв не должен быть пустым'),
    rating: z.number().min(1, 'Оценка обязательна'),
});

export default function ModalReview({id, isOpen, setIsOpen }: Interface.ModalChildProps) {
    const queryClient = useQueryClient()
    
    const formik = useFormik({
        initialValues: {
            text: '',
            rating: 1,
        },
        validate: (values) => {
            const result = reviewSchema.safeParse(values);
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
                room_id: Number(id),
                text: values.text,
                rating: values.rating
            };

            try {
                const result = await UserService.createReview(payload);
                if (result?.success) {
                    console.log('Successful:', result.data);
                    toast.success('Успешно!')
                    queryClient.invalidateQueries({ queryKey: ['getReviews'] })
                    queryClient.invalidateQueries({ queryKey: ['getRoom'] })
                    setIsOpen(false);
                } else {
                    console.error('Review failed:', result?.message);
                }
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <form onSubmit={formik.handleSubmit}>
                <h2 className="mb-8 text-2xl font-semibold text-center">Оцените номер</h2>

                <FormInput
                    name="text"
                    placeholder="Текст"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.text && formik.errors.text ? formik.errors.text : undefined}
                    textarea
                    rows={3}
                />

                <div className="flex items-center justify-between w-full gap-4">
                    <Stars
                        rating={formik.values.rating}
                        isClickable={true}
                        onRatingChange={(newRating) => formik.setFieldValue('rating', newRating)}
                    />
                    <Button type="submit">Отправить</Button>
                </div>
            </form>
        </Modal>
    );
}
