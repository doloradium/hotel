import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import Button from '@/components/Button';
import { monthNames } from '@/data/constants';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => lastDayOfPreviousMonth - i).reverse();

  const totalDays = previousMonthDays.length + days.length;
  const remainingDays = (totalDays % 7 === 0) ? 0 : 7 - (totalDays % 7);
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1);

  const totalRows = Math.ceil((previousMonthDays.length + days.length + nextMonthDays.length) / 7);

  const requiredPreviousDays = totalRows < 6 ? 7 : 0;
  const requiredNextDays = totalRows < 5 ? 7 : 0;

  const additionalPreviousDays = requiredPreviousDays > 0 ? Array.from({ length: requiredPreviousDays }, (_, i) => lastDayOfPreviousMonth - i - previousMonthDays.length).reverse() : [];
  const additionalNextDays = requiredNextDays > 0 ? Array.from({ length: requiredNextDays }, (_, i) => i + 1) : [];

  return (
    <AnimatePresence>
      <motion.div
        layout
        transition={{ duration: 0.1, ease: "linear" }}
        className={`sm:w-md w-full overflow-hidden bg-white sm:p-8 p-4 rounded-xl shadow-(--custom-shadow) text-center border border-gray-200`}
      >
        <div className="relative flex items-center justify-between w-full">
          <Button isMain={false} onClick={handlePreviousMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Button>
          <h2 className="absolute text-xl font-semibold top-1/2 -translate-1/2 left-1/2">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <Button isMain={false} onClick={handleNextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Button>
        </div>
        <div className='flex w-full'>
          {["ПН", "ВТ", "СР", "ЧТ", "ПТ"].map((item) => (
            <div key={item} className="flex items-center justify-center w-full font-semibold text-gray-500 aspect-square">{item}</div>
          ))}
          {["СБ", "ВС"].map((item) => (
            <div key={item} className="flex items-center justify-center w-full font-semibold aspect-square">{item}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {additionalPreviousDays.map((day) => (
            <div key={day} className="flex items-center justify-center w-full font-semibold text-gray-200 aspect-square">{day}</div>
          ))}
          {previousMonthDays.map((day) => (
            <div key={day} className="flex items-center justify-center w-full font-semibold text-gray-200 aspect-square">{day}</div>
          ))}
          {days.map((day) => (
            <button
              key={day}
              className='relative flex items-center justify-center w-full font-semibold rounded-lg aspect-square'
            >
              {
                day > 5 && day < 16 &&
                <div className="absolute top-0 z-0 h-full -translate-x-1/2 bg-blue-200 left-1/2 w-5/2"></div>
              }
              {
                day === 5 &&
                <div className="absolute top-0 right-0 z-0 h-full translate-x-1/2 bg-blue-200 w-3/2"></div>
              }
              {
                day === 16 &&
                <div className="absolute top-0 left-0 z-0 h-full -translate-x-1/2 bg-blue-200 w-3/2"></div>
              }
              {
                (day === 5 || day === 16) &&
                <div className="absolute top-0 left-0 w-full h-full bg-blue-500 rounded-lg z-1"></div>
              }
              <div className={`z-2 ${(day === 5 || day === 16) && 'text-white'}`}>{day}</div>
            </button>
          ))}
          {nextMonthDays.map((day) => (
            <div key={day} className="flex items-center justify-center w-full font-semibold text-gray-200 aspect-square">{day}</div>
          ))}
          {additionalNextDays.map((day) => (
            <div key={day} className="flex items-center justify-center w-full font-semibold text-gray-200 aspect-square">{day}</div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
