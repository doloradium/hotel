import { useState } from 'react';

import Button from '@/components/Button';
import Calendar from '@/components/Calendar';
import ModalReview from '@/components/ModalReview';
import Stars from '@/components/Stars';
import Tag from '@/components/Tag';
import { rooms } from '@/data/rooms';

const reviews = [
  {
    name: 'Адольф',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    stars: 4
  },
  {
    name: 'Владимир',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    stars: 3
  },
  {
    name: 'Дядя Саша',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    stars: 5
  },
]

export default function Room() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full p-4 m-auto max-w-7xl">
      <div className="flex flex-col gap-8 mb-16 md:flex-row">
        <div className='flex flex-col gap-4'>
          <div className="flex justify-between w-full">
            <h2 className="text-2xl font-semibold">Номер "Люкс"</h2>
            <Stars rating={4} />
          </div>
          <p className="text-gray-500">Данный номер имеет окно с видом на гору Эверест, а еще в нем ночевал Владимир Путин</p>
          <div className="flex flex-wrap gap-1">
            {
              rooms[0].features.map((item) => (
                <Tag name={item} />
              ))
            }
          </div>
          <div className="relative w-full md:h-full h-80">
            <img
              src="https://standarthotel.com/upload/iblock/1ea/1eaaf3d47deeafcff9b1931a8fad2dc1.jpg"
              alt="Room"
              className="absolute top-0 left-0 object-cover w-full h-full overflow-hidden rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-8 sm:w-fit h-fit">
          <Calendar />
          <Button>Забронировать • 12 000 ₽</Button>
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
        <div className="space-y-4">
          {reviews.map((item, index) => (
            <div key={index} className="w-full p-4 flex flex-col gap-4 bg-white border border-gray-200 rounded-2xl shadow-(--custom-shadow)">
              <div className="flex justify-between w-full">
                <div className="text-xl font-semibold">{item.name}</div>
                <Stars rating={item.stars} />
              </div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <ModalReview isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
} 