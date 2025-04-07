import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Stars from '@/components/Stars';
import { Interface } from '@/interfaces';

interface ModalRatingProps extends Interface.ModalChildProps {
    selectedRating: number | null;
    setSelectedRating: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function ModalRating({ isOpen, setIsOpen, selectedRating, setSelectedRating }: ModalRatingProps) {
    // Temporary state for rating that's being selected in the modal
    const [tempRating, setTempRating] = useState<number | null>(selectedRating);
    
    // Reset temp rating when modal opens/closes or selectedRating changes
    useEffect(() => {
        if (isOpen) {
            setTempRating(selectedRating);
        }
    }, [isOpen, selectedRating]);
    
    const handleConfirm = () => {
        // Apply the temporary rating to the actual state
        setSelectedRating(tempRating);
        setIsOpen(false);
    };

    return (
        <Modal className='!p-0 !max-w-120' isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="mt-4 mb-8 text-2xl font-semibold text-center sm:mt-8">Выберите рейтинг</h2>
            <div className='mb-4'>
                {[5, 4, 3, 2].map((stars) => (
                    <button 
                        onClick={() => {
                            // Update the temporary rating only
                            setTempRating(stars);
                        }} 
                        key={stars} 
                        className={`flex transition duration-300 items-center w-full gap-4 p-2 pl-8 cursor-pointer ${tempRating === stars ? 'bg-gray-100' : ''} hover:bg-gray-100`}
                    >
                        <span>От</span>
                        <div className="flex">
                            <Stars rating={stars} />
                        </div>
                    </button>
                ))}
                <button 
                    onClick={() => {
                        // Update the temporary rating only
                        setTempRating(null);
                    }} 
                    className={`flex transition duration-300 items-center w-full gap-4 p-2 pl-8 cursor-pointer ${tempRating === null ? 'bg-gray-100' : ''} hover:bg-gray-100`}
                >
                    Любой рейтинг
                </button>
            </div>
            <Button 
                onClick={handleConfirm} 
                className='block m-auto mb-4 sm:mb-8'
            >
                Подтвердить
            </Button>
        </Modal>
    );
}