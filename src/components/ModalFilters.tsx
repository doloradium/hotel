import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Tag from '@/components/Tag';
import { tags } from '@/data/constants';
import { Interface } from '@/interfaces';

export default function ModalFilters({ isOpen, setIsOpen, selectedFilters, setSelectedFilters }: Interface.ModalFiltersProps) {
    // Temporary state for filters that are being selected in the modal
    const [tempFilters, setTempFilters] = useState<string[]>(selectedFilters || []);
    
    // Reset temp filters when modal opens/closes or selectedFilters changes
    useEffect(() => {
        if (isOpen) {
            setTempFilters(selectedFilters || []);
        }
    }, [isOpen, selectedFilters]);
    
    const handleFilterToggle = (filter: string) => {
        setTempFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };
    
    const handleConfirm = () => {
        // Apply the temporary filters to the actual state
        setSelectedFilters(tempFilters);
        setIsOpen(false);
    };

    return (
        <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
            <h2 className="mb-8 text-2xl font-semibold text-center">Выберите удобства</h2>
            <div className="flex flex-wrap justify-center gap-1 mb-4">
                {tags.map((item, index) => (
                    <Tag
                        isClickable={true}
                        key={index}
                        name={item.name} // Use item.name as expected by the Tag component
                        isActive={tempFilters.includes(item.name)}
                        onClick={() => handleFilterToggle(item.name)}
                    />
                ))}
            </div>
            <Button 
                onClick={handleConfirm} 
                className='block m-auto'
            >
                Подтвердить
            </Button>
        </Modal>
    );
}