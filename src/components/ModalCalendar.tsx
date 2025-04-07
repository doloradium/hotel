import { useState } from 'react';

import Button from '@/components/Button';
import Calendar from '@/components/Calendar';
import Modal from '@/components/Modal';
import { Interface } from '@/interfaces';

interface ModalCalendarProps extends Interface.ModalChildProps {
  onDatesSelected?: (startDate: Date | null, endDate: Date | null) => void;
}

export default function ModalCalendar({ isOpen, setIsOpen, onDatesSelected }: ModalCalendarProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateSelect = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleConfirm = () => {
    if (onDatesSelected) {
      onDatesSelected(startDate, endDate);
    }
    setIsOpen(false);
  };

  return (
    <Modal className='flex flex-col items-center gap-4 sm:w-fit' setIsOpen={setIsOpen} isOpen={isOpen}>
      <h2 className="mb-4 text-2xl font-semibold text-center">Выберите даты</h2>
            
      <Calendar 
        isActive={true}
        startDate={startDate}
        endDate={endDate}
        onDateSelect={handleDateSelect}
      />
      
      <Button 
        className='block m-auto'
        onClick={handleConfirm}
      >
        Подтвердить
      </Button>
    </Modal>
  );
}