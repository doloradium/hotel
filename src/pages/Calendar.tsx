import { useState } from 'react';

interface CalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
}

export default function Calendar({ selectedDate, onChange }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="p-4 w-64">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-600 hover:text-gray-800">
          ←
        </button>
        <div className="font-medium">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-800">
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        <div className="text-gray-400">Пн</div>
        <div className="text-gray-400">Вт</div>
        <div className="text-gray-400">Ср</div>
        <div className="text-gray-400">Чт</div>
        <div className="text-gray-400">Пт</div>
        <div className="text-gray-400">Сб</div>
        <div className="text-gray-400">Вс</div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              h-8 flex items-center justify-center rounded-full cursor-pointer
              ${!day ? 'invisible' : 'hover:bg-gray-100'}
              ${selectedDate && day && 
                selectedDate.getDate() === day && 
                selectedDate.getMonth() === currentDate.getMonth() && 
                selectedDate.getFullYear() === currentDate.getFullYear()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : ''}
            `}
            onClick={() => day && onChange(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
} 