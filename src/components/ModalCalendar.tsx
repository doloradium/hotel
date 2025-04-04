import Button from '@/components/Button';
import Calendar from '@/components/Calendar';
import Modal from '@/components/Modal';
import { ModalChildProps } from '@/interfaces';

export default function ModalFilters({ isOpen, setIsOpen }: ModalChildProps) {
    return (
        <Modal className='flex flex-col items-center gap-4 sm:w-fit' setIsOpen={setIsOpen} isOpen={isOpen}>
            <h2 className="mb-4 text-2xl font-semibold text-center">Выберите даты</h2>
            <Calendar />
            <Button className='block m-auto'>
                Подтвердить
            </Button>
        </Modal>
    );
}