import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Stars from '@/components/Stars';
import { Interface } from '@/interfaces';

export default function ModalRating({ isOpen, setIsOpen }: Interface.ModalChildProps) {
    return (
        <Modal className='!p-0 !max-w-120' isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="mt-4 mb-8 text-2xl font-semibold text-center sm:mt-8">Выберите рейтинг</h2>
            <div className='mb-4'>
                {[5, 4, 3, 2].map((stars) => (
                    <button onClick={() => setIsOpen(false)} key={stars} className="flex items-center w-full gap-4 p-2 pl-8 cursor-pointer hover:bg-gray-100">
                        <span>От</span>
                        <div className="flex">
                            <Stars rating={stars} />
                        </div>
                    </button>
                ))}
                <button onClick={() => setIsOpen(false)} className='flex items-center w-full gap-4 p-2 pl-8 cursor-pointer hover:bg-gray-100'>Любой рейтинг</button>
            </div>
            <Button className='block m-auto mb-4 sm:mb-8'>
                Подтвердить
            </Button>
        </Modal>
    );
}