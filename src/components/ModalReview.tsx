import { useState } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Stars from '@/components/Stars';
import { ModalChildProps } from '@/interfaces';

export default function ModalReview({ isOpen, setIsOpen }: ModalChildProps) {
    const [text, setText] = useState("");

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="mb-8 text-2xl font-semibold text-center">Оцените номер</h2>
            <textarea
                className="block w-full p-4 mb-4 border border-gray-200 rounded-lg resize-none bg-gray-50"
                placeholder="Текст"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="flex items-center justify-between w-full gap-4">
                <Stars rating={4} />
                <Button>
                    Отправить
                </Button>
            </div>
        </Modal>
    );
}