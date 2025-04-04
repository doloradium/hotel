import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Tag from '@/components/Tag';
import { tags } from '@/data/constants';
import { ModalChildProps } from '@/interfaces';

export default function ModalFilters({ isOpen, setIsOpen }: ModalChildProps) {
    return (
        <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
            <h2 className="mb-8 text-2xl font-semibold text-center">Выберите удобства</h2>
            <div className="flex flex-wrap justify-center gap-1 mb-4">
                {tags.map((item, index) => (
                    <Tag isClickable={true} key={index} name={item.name} />
                ))}
            </div>
            <Button className='block m-auto'>
                Подтвердить
            </Button>
        </Modal>
    );
}