import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import { monthNames } from '@/data/constants';

interface BookedDateRange {
  start_date: string;
  end_date: string;
}

interface CalendarProps {
  isActive?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateSelect?: (start: Date | null, end: Date | null) => void;
  bookedDates?: BookedDateRange[];
}

export default function Calendar({ isActive = false, startDate = null, endDate = null, onDateSelect, bookedDates = [] }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);
  const [internalStartDate, setInternalStartDate] = useState<Date | null>(startDate);
  const [internalEndDate, setInternalEndDate] = useState<Date | null>(endDate);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [clickCount, setClickCount] = useState(0);
  
  const parsedBookedDates = bookedDates.map(range => ({
    startDate: new Date(range.start_date),
    endDate: new Date(range.end_date)
  }));

  useEffect(() => {
    setInternalStartDate(startDate);
    setInternalEndDate(endDate);
    setSelectingStart(startDate === null);
    setClickCount(startDate !== null && endDate !== null ? 2 : startDate !== null ? 1 : 0);
  }, [startDate, endDate]);

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

  const handleDateClick = (day: number) => {
    if (!isActive) return;
    
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (isDateBooked(day)) return;

    if (clickCount >= 2 && !selectingStart) {
      setInternalStartDate(null);
      setInternalEndDate(null);
      setSelectingStart(true);
      setClickCount(0);
      setHoveredDate(null);
      
      if (onDateSelect) {
        onDateSelect(null, null);
      }
      return;
    }
    
    if (selectingStart) {
      setInternalStartDate(clickedDate);
      setInternalEndDate(null);
      setSelectingStart(false);
      setClickCount(1);
    } else {
      if (internalStartDate && clickedDate < internalStartDate) {
        setInternalEndDate(internalStartDate);
        setInternalStartDate(clickedDate);
      } else {
        setInternalEndDate(clickedDate);
      }
      setSelectingStart(false);
      setClickCount(2);
      
      if (onDateSelect) {
        if (internalStartDate && clickedDate < internalStartDate) {
          onDateSelect(clickedDate, internalStartDate);
        } else {
          onDateSelect(internalStartDate, clickedDate);
        }
      }
    }
  };

  const handleDateHover = (day: number) => {
    if (!isActive || selectingStart || clickCount >= 2 || isDateBooked(day)) return;
    
    setHoveredDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const isDateInRange = (day: number) => {
    if (!isActive || !internalStartDate) return false;
    
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (internalEndDate) {
      return (
        (currentDay > internalStartDate && currentDay < internalEndDate) ||
        (currentDay < internalStartDate && currentDay > internalEndDate)
      );
    } else if (hoveredDate && !selectingStart) {
      return (
        (currentDay > internalStartDate && currentDay <= hoveredDate) ||
        (currentDay < internalStartDate && currentDay >= hoveredDate)
      );
    }
    
    return false;
  };

  const isSelectedDate = (day: number) => {
    if (!isActive || (!internalStartDate && !internalEndDate)) return false;
    
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    return (
      (internalStartDate && currentDay.getTime() === internalStartDate.getTime()) ||
      (internalEndDate && currentDay.getTime() === internalEndDate.getTime())
    );
  };

  const isDateBooked = (day: number) => {
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    const currentDayWithoutTime = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate());
    
    return parsedBookedDates.some(range => {
      const startDateWithoutTime = new Date(range.startDate.getFullYear(), range.startDate.getMonth(), range.startDate.getDate());
      const endDateWithoutTime = new Date(range.endDate.getFullYear(), range.endDate.getMonth(), range.endDate.getDate());
      
      return currentDayWithoutTime >= startDateWithoutTime && currentDayWithoutTime <= endDateWithoutTime;
    });
  };

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
            <div key={`prev-add-${day}`} className="flex items-center justify-center w-full font-semibold text-gray-200 aspect-square">{day}</div>
          ))}
          {previousMonthDays.map((day) => (
            <div key={`prev-${day}`} className="flex items-center justify-center w-full font-semibold text-gray-200 aspect-square">{day}</div>
          ))}
          {days.map((day) => (
            <button
              key={`current-${day}`}
              className={`relative flex items-center justify-center w-full font-semibold rounded-lg aspect-square ${isActive == true && !isDateBooked(day) ? 'cursor-pointer' : isDateBooked(day) ? 'cursor-not-allowed' : ''}`}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => handleDateHover(day)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              <AnimatePresence>
                {isActive && isDateInRange(day) && !isSelectedDate(day) && !isDateBooked(day) && (
                  <motion.div 
                    className="absolute top-0 z-0 w-full h-full bg-blue-200 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                {isActive && isSelectedDate(day) && !isDateBooked(day) && (
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full bg-blue-500 rounded-lg z-1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                {isActive && isDateBooked(day) && (
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-lg z-1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              <div className={`z-2 ${isActive && (isSelectedDate(day) || isDateBooked(day)) ? 'text-white' : ''}`}>{day}</div>
            </button>
          ))}
          {nextMonthDays.map((day) => (
            <div key={`next-${day}`} className="flex items-center justify-center w-full font-semibold text-gray-200 aspect-square">{day}</div>
          ))}
          {additionalNextDays.map((day) => (
            <div key={`next-add-${day}`} className="flex items-center justify-center w-full font-semibold text-gray-200 aspect-square">{day}</div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
