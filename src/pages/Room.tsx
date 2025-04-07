import { useState } from 'react';
import { useLocation } from 'react-router';

import Button from '@/components/Button';
import Calendar from '@/components/Calendar';
import ModalReview from '@/components/ModalReview';
import Stars from '@/components/Stars';
import Tag from '@/components/Tag';
import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function Room() {
  const [isOpen, setIsOpen] = useState(false);

  const params = new URLSearchParams(useLocation().search)
  const id = params.get('id');

  const { data: roomData, isLoading: isRoomDataLoading } = useQuery({ queryKey: ['getRoom'], queryFn: () => UserService.getRoomData(Number(id)) });
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery({ queryKey: ['getReviews'], queryFn: () => UserService.getReviews(Number(id)) });

  return (
    <div className="w-full p-4 m-auto max-w-7xl">
      <div className="flex flex-col gap-8 mb-16 md:flex-row">
        <div className='flex flex-col w-full gap-4'>
          <div className="flex justify-between w-full">
            <h2 className="text-2xl font-semibold">{isRoomDataLoading ? 'Загрузка' : `Номер ${roomData?.data?.id}`}</h2>
            <Stars rating={roomData?.data?.rating ?? 0} />
          </div>
          <p className="text-gray-500">{isRoomDataLoading ? 'Загрузка' : roomData?.data?.description}</p>
          <div className="flex flex-wrap gap-1">
            {roomData?.data?.features?.map((item) => (
              <Tag name={item} />
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
          <Calendar />
          <Button>Забронировать • {roomData?.data?.price} ₽</Button>
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