import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

import Button from '@/components/Button';
import Calendar from '@/components/Calendar';
import ModalReview from '@/components/ModalReview';
import Stars from '@/components/Stars';
import Tag from '@/components/Tag';
import { UserService } from '@/services';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Room() {
  const [isOpen, setIsOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [reservationId, setReservationId] = useState<number | null>(null);
  const [countOfPeople, setCountOfPeople] = useState<number>(1);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const queryClient = useQueryClient();

  useEffect(() => {
    const editMode = params.get('edit_mode') === 'true';
    const startDateParam = params.get('start_date');
    const endDateParam = params.get('end_date');
    const reservationIdParam = params.get('reservation_id');
    const countOfPeopleParam = params.get('count_of_people');
    
    if (editMode && startDateParam && endDateParam && reservationIdParam) {
      setIsEditMode(true);
      setReservationId(parseInt(reservationIdParam));
      
      const parseDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
      };
      
      setCheckInDate(parseDate(startDateParam));
      setCheckOutDate(parseDate(endDateParam));
      
      if (countOfPeopleParam) {
        setCountOfPeople(parseInt(countOfPeopleParam));
      }
    } else {
      setIsEditMode(false);
      setReservationId(null);
      setCountOfPeople(1);
    }
  }, [location.search]);

  useEffect(() => {
    if (!isEditMode) {
      setCheckInDate(null);
      setCheckOutDate(null);
    }
    
  }, [id, isEditMode]);

  const { data: roomData, isLoading: isRoomDataLoading } = useQuery({ 
    queryKey: ['getRoom', id], 
    queryFn: () => UserService.getRoomData(Number(id)),
    enabled: !!id
  });
  
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery({ 
    queryKey: ['getReviews', id], 
    queryFn: () => UserService.getReviews(Number(id)),
    enabled: !!id
  });
  
  const { data: bookedDatesData } = useQuery({ 
    queryKey: ['getBookedDates', id], 
    queryFn: () => UserService.getBookedDates(Number(id)),
    enabled: !!id
  });

  const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
    setCheckInDate(startDate);
    setCheckOutDate(endDate);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      return;
    }

    setIsBooking(true);

    try {
      let response;
      
      if (isEditMode && reservationId !== null) {
        const updateData = {
          reservation_id: reservationId,
          start_date: formatDate(checkInDate),
          end_date: formatDate(checkOutDate),
          count_of_people: countOfPeople
        };
        
        response = await UserService.updateReservation(updateData);
      } else {
        const bookingData = {
          room_id: Number(id),
          start_date: formatDate(checkInDate),
          end_date: formatDate(checkOutDate),
          price: roomData?.data?.price,
          count_of_people: countOfPeople
        };
        
        response = await UserService.bookRoom(bookingData);
      }
      
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: ['getBookedDates'] });
        queryClient.invalidateQueries({ queryKey: ['getRooms'] });
        
        if (isEditMode) {
          window.history.replaceState({}, '', `/room?id=${id}`);
          setIsEditMode(false);
          setReservationId(null);
        }
      } else {
        console.error('Error:', response?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const filteredBookedDates = useMemo(() => {
    if (!bookedDatesData?.success || !bookedDatesData.data) {
      return [];
    }
    
    if (!isEditMode || !reservationId) {
      return bookedDatesData.data;
    }
    
    const originalStartDate = params.get('start_date');
    const originalEndDate = params.get('end_date');
    
    const currentStartStr = checkInDate ? formatDate(checkInDate) : '';
    const currentEndStr = checkOutDate ? formatDate(checkOutDate) : '';
    
    return bookedDatesData.data.filter(date => {
      if (originalStartDate && originalEndDate && 
          date.start_date === originalStartDate && 
          date.end_date === originalEndDate) {
        return false;
      }
      
      if (currentStartStr && currentEndStr &&
          date.start_date === currentStartStr && 
          date.end_date === currentEndStr) {
        return false;
      }
      
      return true;
    });
  }, [bookedDatesData, isEditMode, reservationId, checkInDate, checkOutDate, params]);

  return (
    <div className="w-full p-4 m-auto max-w-7xl">
      <div className="flex flex-col gap-8 mb-16 md:flex-row">
        <div className='flex flex-col w-full gap-4'>
          <div className="flex justify-between w-full">
            <h2 className="text-2xl font-semibold">
              {isRoomDataLoading ? 'Загрузка' : `Номер ${roomData?.data?.name}`}
              {isEditMode && ' (Редактирование бронирования)'}
            </h2>
            <Stars rating={roomData?.data?.rating ?? 0} />
          </div>
          <p className="text-gray-500">{isRoomDataLoading ? 'Загрузка' : roomData?.data?.description}</p>
          <div className="flex flex-wrap gap-1">
            {roomData?.data?.features?.map((item, index) => (
              <Tag key={index} name={item} />
            ))}
          </div>
          <div className="relative w-full md:h-full h-80">
            <img
              src={roomData?.data?.preview ?? ''}
              alt="Room"
              className="absolute top-0 left-0 object-cover w-full h-full overflow-hidden rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-8 sm:w-fit h-fit">
          <div className="w-full">
            <Calendar 
              onDateSelect={handleDateSelect}
              startDate={checkInDate}
              endDate={checkOutDate}
              isActive={true}
              bookedDates={filteredBookedDates}
            />
          </div>
          <Button 
            onClick={handleBooking} 
            className={isBooking || !checkInDate || !checkOutDate ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isBooking 
              ? 'Обработка...' 
              : isEditMode 
                ? `Сохранить изменения • ${roomData?.data?.price} ₽` 
                : `Забронировать • ${roomData?.data?.price} ₽`
            }
          </Button>
        </div>
      </div>
      <div className='mb-8'>
        <div className="relative flex items-center mb-8">
          <Button isMain={false} onClick={() => setIsOpen(true)}>
            <div className="hidden sm:block">Оставить отзыв</div>
            <div className="block font-semibold sm:hidden">+</div>
          </Button>
          <h2 className="absolute text-2xl font-semibold -translate-x-1/2 left-1/2">Отзывы</h2>
        </div>
        {
          isReviewsLoading
          ?
          <div className="text-center">
              Загрузка
          </div>
          :
          <div className="space-y-4">
            {reviewsData?.data?.reviews.map((item, index) => (
              <div key={index} className="w-full p-4 flex flex-col gap-4 bg-white border border-gray-200 rounded-2xl shadow-(--custom-shadow)">
                <div className="flex justify-between w-full">
                  <div className="text-xl font-semibold">{item.user.name}</div>
                  <Stars rating={item.rating} />
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        }
      </div>
      <ModalReview id={Number(id)} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
} 