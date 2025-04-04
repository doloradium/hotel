import { useState } from 'react';

import empty from '@/assets/empty.svg';
import heroImage from '@/assets/hero.jpg';
import Button from '@/components/Button';
import CardRoom from '@/components/CardRoom';
import ModalCalendar from '@/components/ModalCalendar';
import ModalFilters from '@/components/ModalFilters';
import ModalRating from '@/components/ModalRating';
import { rooms } from '@/data/rooms';

export default function Main() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen">
      <div style={{ backgroundImage: `url(${heroImage})` }} className={`w-full relative h-120 sm:h-96 bg-cover bg-center p-4 mb-36 sm:mb-24`}>
        <div className="absolute w-full p-4 max-w-7xl top-full left-1/2 -translate-1/2">
          <div className="grid grid-cols-2 gap-1 p-4 rounded-2xl shadow-(--custom-shadow) bg-white border border-gray-200 sm:grid-cols-8">
            <input
              type="text"
              placeholder="от ₽/сутки"
              className={`w-full h-10 px-4 placeholder-gray-500 border border-gray-200 bg-gray-50 sm:col-span-1 transition-all duration-300 rounded-sm rounded-tl-2xl`}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="до ₽/сутки"
              className={`w-full h-10 px-4 placeholder-gray-500 border border-gray-200 bg-gray-50 sm:col-span-1 transition-all duration-300 sm:rounded-tr-sm rounded-tr-2xl rounded-sm`}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Заезд"
              className={`w-full h-10 px-4 placeholder-gray-500 border border-gray-200 cursor-pointer bg-gray-50 sm:col-span-2 transition-all duration-300 rounded-sm`}
              value={''}
              readOnly
              onClick={() => setIsCalendarOpen(true)}
            />
            <input
              type="text"
              placeholder="Выезд"
              className={`w-full h-10 px-4 placeholder-gray-500 border border-gray-200 cursor-pointer bg-gray-50 sm:col-span-2 transition-all duration-300 ${isHovered ? 'rounded-sm sm:rounded-tr-2xl' : 'rounded-sm'}`}
              value={''}
              readOnly
              onClick={() => setIsCalendarOpen(true)}
            />
            <div
              className="order-last col-span-2 sm:order-none sm:col-span-2 sm:row-span-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button className="w-full h-full rounded-sm rounded-t-sm hover:rounded-2xl rounded-b-2xl sm:rounded-tr-2xl sm:rounded-l-sm">
                Найти
              </Button>
            </div>
            <input
              type="number"
              placeholder="Количество жильцов"
              className={`w-full h-10 px-4 placeholder-gray-500 border border-gray-200 bg-gray-50 sm:col-span-2 transition-all duration-300 rounded-sm sm:rounded-bl-2xl`}
            />
            <div
              onClick={() => setIsRatingOpen(true)}
              className={`sm:col-span-2 w-full flex items-center justify-baseline h-10 px-4 text-gray-500 border border-gray-200 bg-gray-50 transition-all rounded-sm duration-300`}
            >
              Рейтинг
            </div>
            <div
              className={`flex items-center w-full h-10 px-4 text-gray-500 border border-gray-200 cursor-pointer bg-gray-50 col-span-2 transition-all duration-300 ${isHovered ? 'rounded-sm sm:rounded-br-2xl' : 'rounded-sm'}`}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              Удобства
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 mx-auto max-w-7xl">
        <h2 className="mb-10 text-2xl font-semibold text-center">Доступные номера</h2>
        <div className="space-y-4">
          {rooms.map((room, index) => (
            <CardRoom key={index} {...room} index={index} />
          ))}
        </div>
      </div>
      <div className="mx-auto my-8 w-fit">
        <img src={empty} alt="Empty" className="w-full p-4 max-w-64" />
      </div>
      <ModalFilters isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
      <ModalRating isOpen={isRatingOpen} setIsOpen={setIsRatingOpen} />
      <ModalCalendar isOpen={isCalendarOpen} setIsOpen={setIsCalendarOpen} />
    </div>
  );
}


