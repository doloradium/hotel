import { useState } from 'react';

import group8 from '@/assets/Group 8.svg';
import heroImage from '@/assets/hero.jpg';
import Button from '@/components/Button';
import CardRoom from '@/components/CardRoom';

import { FeaturesSelection, RatingFilter } from './Login';

export default function Main() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(55000);
  const [rating, setRating] = useState(0);
  const [showAmenities, setShowAmenities] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rooms = [
    {
      name: "Номер 'Люкс'",
      description: "Вид на гору Эверест, ночевал Владимир Путин.",
      price: 14000,
      features: ["Шумоизоляция", "Завтрак в постель", "Есть интернет", "Биометрический ключ", "Личный дворецкий"],
      rating: 5,
      image: "https://images.unsplash.com/photo-1593006526979-5f8814c229f9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJvb20lMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      name: "Номер 'Престиж'",
      description: "Вид на гору Эверест, ночевал Дональд Трамп.",
      price: 12000,
      features: ["Шумоизоляция", "Есть интернет", "Личный дворецкий"],
      rating: 4,
      image: "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9vbSUyMGhvdGVsfGVufDB8fDB8fHww"
    },
    {
      name: "Номер 'Пушка'",
      description: "Вид на гору Эверест, ночевал Александр Лукашенко.",
      price: 8000,
      features: ["Завтрак в постель", "Есть интернет", "Личный дворецкий"],
      rating: 5,
      image: "https://standarthotel.com/upload/iblock/1ea/1eaaf3d47deeafcff9b1931a8fad2dc1.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      <div style={{ backgroundImage: `url(${heroImage})` }} className={`w-full relative h-120 sm:h-96 bg-cover bg-center p-4 mb-60 sm:mb-32`}>
        <div className="bg-white p-4 rounded-2xl shadow-(--custom-shadow) w-[calc(100%-2rem)] max-w-7xl absolute top-full left-1/2 -translate-1/2">
          <div className="grid grid-cols-8 gap-1">
            <div className="col-span-2 mb-1 text-xs text-gray-500 sm:text-sm">Стоимость за сутки</div>
            <div className="col-span-2 mb-1 text-xs text-gray-500 sm:text-sm">Даты пребывания</div>
            <div className="col-span-2 mb-1 text-xs text-gray-500 sm:text-sm">Количество человек</div>
            <div className="col-span-2"></div>

            <input
              type="number"
              placeholder="от 0"
              className={`w-full h-12 px-4 text-sm text-gray-400 placeholder-gray-400 border border-gray-200 bg-gray-50 col-span-1 transition-all duration-300 rounded-sm rounded-tl-2xl`}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="до 55 000"
              className={`w-full h-12 px-4 text-sm text-gray-400 placeholder-gray-400 border border-gray-200 bg-gray-50 col-span-1 transition-all duration-300 rounded-sm`}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <input
              type="text"
              placeholder="Заезд"
              className={`w-full h-12 px-4 text-sm text-gray-400 placeholder-gray-400 border border-gray-200 cursor-pointer bg-gray-50 col-span-2 transition-all duration-300 rounded-sm`}
              value={''}
              readOnly
            />
            <input
              type="text"
              placeholder="Выезд"
              className={`w-full h-12 px-4 text-sm text-gray-400 placeholder-gray-400 border border-gray-200 cursor-pointer bg-gray-50 col-span-2 transition-all duration-300 ${isHovered ? 'rounded-sm rounded-tr-2xl' : 'rounded-sm'}`}
              value={''}
              readOnly
            />
            <div
              className="col-span-2 row-span-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button className="w-full h-full rounded-sm hover:rounded-2xl rounded-tr-2xl rounded-br-2xl">
                Найти
              </Button>
            </div>

            <input
              type="number"
              placeholder="1"
              className={`w-full h-12 px-4 text-sm text-gray-400 placeholder-gray-400 border border-gray-200 bg-gray-50 col-span-2 transition-all duration-300 rounded-sm rounded-bl-2xl`}
            />
            <div
              className={`flex items-center w-full h-12 px-4 text-sm text-gray-400 border border-gray-200 cursor-pointer bg-gray-50 col-span-2 transition-all duration-300 rounded-sm`}
              onClick={() => setShowAmenities(!showAmenities)}
            >
              Удобства
            </div>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className={`w-full h-12 px-4 text-sm text-gray-400 border border-gray-200 bg-gray-50 col-span-2 transition-all duration-300 ${isHovered ? 'rounded-sm rounded-br-2xl' : 'rounded-sm'}`}
            >
              <option value={0}>Рейтинг</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>{star} ★</option>
              ))}
            </select>
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
      <RatingFilter />
      <FeaturesSelection />
      <div className="flex justify-center mt-8 mb-8">
        <img src={group8} alt="Decoration" className="w-full max-w-[600px]" />
      </div>
    </div>
  );
}


