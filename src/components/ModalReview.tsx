import { useState } from 'react';

import Modal from '@/components/Modal';
import { ModalChildProps } from '@/interfaces';

export default function ModalReview({ isOpen, setIsOpen }: ModalChildProps) {

    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");

    const handleRating = (index: any) => {
        setRating(index + 1);
    };

    const handleSubmit = () => {
        alert(`Оценка: ${rating}\nОтзыв: ${text}`);
        setText("");
        setRating(5);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="mb-4 text-2xl font-semibold text-center">Оцените номер</h2>
            <textarea
                className="w-full p-4 border border-blue-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Текст"
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex items-center gap-2 my-4">
                {[...Array(5)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleRating(index)}
                        className="p-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={index < rating ? "#2B7FFF" : "#BEDBFF"}
                            className="w-8 h-8 transition-all hover:scale-110"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className="w-full py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
            >
                Отправить
            </button>
        </Modal>
    );
}