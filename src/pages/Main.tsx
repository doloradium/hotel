import { useState } from 'react';

import empty from '@/assets/empty.svg';
import heroImage from '@/assets/hero.jpg';
import Button from '@/components/Button';
import CardRoom from '@/components/CardRoom';
import ModalCalendar from '@/components/ModalCalendar';
import ModalFilters from '@/components/ModalFilters';
import ModalRating from '@/components/ModalRating';
import { monthNames, tags } from '@/data/constants';
import { Interface } from '@/interfaces';
import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function Main() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guestCount, setGuestCount] = useState<string>('');
  const [searchParams, setSearchParams] = useState<Interface.RoomParams>({});

  const getFilterParams = () => {
    const filterParams: Record<string, boolean> = {};
    
    if (selectedFilters.includes('pc')) filterParams.id_pc = true;
    if (selectedFilters.includes('noiseCancelling')) filterParams.is_noisecancelling = true;
    if (selectedFilters.includes('wifi')) filterParams.is_wifi = true;
    if (selectedFilters.includes('breakfast')) filterParams.is_breakfast = true;
    if (selectedFilters.includes('bioKey')) filterParams.is_biometry_key = true;
    if (selectedFilters.includes('tv')) filterParams.is_tv = true;
    
    return filterParams;
  };

  const getSearchParams = () => {
    const filterParams = getFilterParams();
    
    return {
      ...filterParams,
      start_date: checkInDate ? checkInDate.toISOString().split('T')[0] : undefined,
      end_date: checkOutDate ? checkOutDate.toISOString().split('T')[0] : undefined,
      price_from: minPrice ? parseInt(minPrice) : undefined,
      price_to: maxPrice ? parseInt(maxPrice) : undefined,
      rating: selectedRating ? selectedRating : undefined,
      count_of_people: guestCount ? parseInt(guestCount) : undefined,
    };
  };

  const { data: roomData, isLoading } = useQuery({ 
    queryKey: ['getRooms', searchParams], 
    queryFn: () => UserService.getRooms(searchParams),
    enabled: true, 
  });

  const handleSearch = () => {
    setSearchParams(getSearchParams());
  };

  return (
    <div className="min-h-screen">
      <div style={{ backgroundImage: `url(${heroImage})` }} className={`w-full relative h-120 sm:h-96 bg-cover bg-center p-4 mb-36 sm:mb-24`}>
        <h1 className='absolute w-[calc(100%-2rem)] px-8 py-4 text-3xl font-semibold text-center text-gray-800 sm:whitespace-pre sm:w-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-8/7 sm:-translate-y-5/6 bg-white/50 backdrop-blur-sm rounded-2xl'>Лучший горный курорт в России</h1>
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
              value={checkInDate ? `${checkInDate.getDate()} ${monthNames[checkInDate.getMonth()]}` : ''}
              readOnly
              onClick={() => setIsCalendarOpen(true)}
            />
            <input
              type="text"
              placeholder="Выезд"
              className={`w-full h-10 px-4 placeholder-gray-500 border border-gray-200 cursor-pointer bg-gray-50 sm:col-span-2 transition-all duration-300 ${isHovered ? 'rounded-sm sm:rounded-tr-2xl' : 'rounded-sm'}`}
              value={checkOutDate ? `${checkOutDate.getDate()} ${monthNames[checkOutDate.getMonth()]}` : ''}
              readOnly
              onClick={() => setIsCalendarOpen(true)}
            />
            <div
              className="order-last col-span-2 sm:order-none sm:col-span-2 sm:row-span-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button 
                className="w-full h-full rounded-sm rounded-t-sm hover:rounded-2xl rounded-b-2xl sm:rounded-tr-2xl sm:rounded-l-sm"
                onClick={handleSearch}
              >
                {isLoading ? 'Поиск...' : 'Найти'}
              </Button>
            </div>
            <input
              type="number"
              placeholder="Количество жильцов"
              className={`w-full h-10 px-4 placeholder-gray-500 border border-gray-200 bg-gray-50 sm:col-span-2 transition-all duration-300 rounded-sm sm:rounded-bl-2xl`}
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            />
            <div
              onClick={() => setIsRatingOpen(true)}
              className={`sm:col-span-2 cursor-pointer w-full flex items-center justify-baseline h-10 px-4 border border-gray-200 bg-gray-50 transition-all rounded-sm duration-300`}
            >
              {selectedRating ? <div className="text-black">Рейтинг: от {selectedRating}</div> : <div className="text-gray-500">Рейтинг</div>}
            </div>
            <div
              className={`flex items-center w-full h-10 px-4 text-gray-500 border border-gray-200 cursor-pointer bg-gray-50 col-span-2 transition-all duration-300 ${isHovered ? 'rounded-sm sm:rounded-br-2xl' : 'rounded-sm'}`}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              {
                selectedFilters.length > 0 
                ? 
                <div className="text-black truncate">
                  {selectedFilters.map(filter => {
                    const tag = tags.find(tag => tag.name === filter);
                    return tag ? tag.text : filter;
                  }).join(', ')}
                </div> 
                : 
                'Удобства'
              }
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 mx-auto max-w-7xl">
        <h2 className="mb-10 text-2xl font-semibold text-center">Доступные номера</h2>
        {
          isLoading ? (
            <div className="py-8 text-xl text-center">Загрузка...</div>
          ) : roomData?.data && roomData.data.length > 0 ? (
            <div className="mb-8 space-y-4">
              {roomData.data.map((room, index) => (
                <CardRoom
                  id={room.id}
                  description={room.description ?? ''}
                  features={room.features ?? []}
                  image={room.preview ?? ''}
                  name={String(room.id)}
                  key={index}
                  price={room.price}
                  rating={room.rating}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto my-8 w-fit">
              <img src={empty} alt="Empty" className="w-full p-4 max-w-64" />
            </div>
          )
        }
      </div>
      <ModalFilters 
        isOpen={isFiltersOpen} 
        setIsOpen={setIsFiltersOpen} 
        selectedFilters={selectedFilters} 
        setSelectedFilters={setSelectedFilters} 
      />
      <ModalRating 
        isOpen={isRatingOpen} 
        setIsOpen={setIsRatingOpen} 
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      <ModalCalendar 
        isOpen={isCalendarOpen} 
        setIsOpen={setIsCalendarOpen} 
        onDatesSelected={(start, end) => {
          setCheckInDate(start);
          setCheckOutDate(end);
        }}
      />
    </div>
  );
}


