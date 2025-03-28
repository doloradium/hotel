import { useState } from 'react';

import group8 from '@/assets/Group 8.svg';
import heroImage from '@/assets/hero.jpg';
import CardRoom from '@/components/CardRoom';

import { FeaturesSelection, RatingFilter } from './Login';

export default function Main() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(55000);
  const [rating, setRating] = useState(0);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const features = [
    "Шумоизоляция",
    "Биометрический ключ",
    "Завтрак в постель",
    "Есть интернет",
    "Есть компьютер",
    "Личный дворецкий"
  ];

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
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 md:items-end">
                <div className="w-full sm:w-auto">
                  <div className="mb-1 text-xs text-gray-500 sm:text-sm">Стоимость за сутки</div>
                  <div className="flex flex-row gap-2 sm:gap-4">
                    <input
                      type="number"
                      placeholder="от 0"
                      className="w-full sm:w-[160px] lg:w-[200px] h-9 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl bg-gray-50 text-gray-400 placeholder-gray-400 text-sm"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                    <input
                      type="number"
                      placeholder="до 55 000"
                      className="w-full sm:w-[160px] lg:w-[200px] h-9 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl bg-gray-50 text-gray-400 placeholder-gray-400 text-sm"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  <div className="mb-1 text-xs text-gray-500 sm:text-sm">Даты пребывания</div>
                  <div className="flex flex-row gap-2 sm:gap-4">
                    <div className="relative flex-1 w-full sm:w-auto sm:flex-none">
                      <input
                        type="text"
                        placeholder="Заезд"
                        className="w-full sm:w-[140px] lg:w-[160px] h-9 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl bg-gray-50 text-gray-400 placeholder-gray-400 cursor-pointer text-sm"
                        value={''}
                        onClick={() => setShowStartCalendar(!showStartCalendar)}
                        readOnly
                      />
                    </div>
                    <div className="relative flex-1 w-full sm:w-auto sm:flex-none">
                      <input
                        type="text"
                        placeholder="Выезд"
                        className="w-full sm:w-[140px] lg:w-[160px] h-9 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl bg-gray-50 text-gray-400 placeholder-gray-400 cursor-pointer text-sm"
                        value={''}
                        onClick={() => setShowEndCalendar(!showEndCalendar)}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  <div className="mb-1 text-xs text-gray-500 sm:text-sm">Количество человек</div>
                  <input
                    type="number"
                    placeholder="1"
                    className="w-full sm:w-[100px] lg:w-[120px] h-9 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl bg-gray-50 text-gray-400 placeholder-gray-400 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <div className="relative w-full">
                  <div
                    className="flex items-center w-full px-2 text-sm text-gray-400 border border-gray-200 cursor-pointer h-9 sm:h-12 sm:px-4 rounded-xl bg-gray-50"
                    onClick={() => setShowAmenities(!showAmenities)}
                  >
                    {selectedAmenities.length ? `Выбрано: ${selectedAmenities.length}` : 'Удобства'}
                  </div>

                  {showAmenities && (
                    <div className="absolute left-0 w-full p-3 bg-white rounded-lg shadow-lg top-10 sm:top-12">
                      <div className="flex flex-col gap-2">
                        {features.map((feature, index) => (
                          <label key={index} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedAmenities.includes(feature)}
                              onChange={() => {
                                if (selectedAmenities.includes(feature)) {
                                  setSelectedAmenities(selectedAmenities.filter(f => f !== feature));
                                } else {
                                  setSelectedAmenities([...selectedAmenities, feature]);
                                }
                              }}
                              className="border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-2 text-sm text-gray-400 border border-gray-200 h-9 sm:h-12 sm:px-4 rounded-xl bg-gray-50"
                  >
                    <option value={0}>Рейтинг</option>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <option key={star} value={star}>{star} ★</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-2 sm:mt-0 sm:ml-2 md:ml-4">
              <button className="w-full sm:w-[140px] h-full min-h-[76px] bg-[#4086F6] hover:bg-[#3575E2] text-white font-normal text-base rounded-xl transition-colors duration-200 flex items-center justify-center">
                Найти
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 mx-auto max-w-7xl">
        <h2 className="mb-4 text-2xl font-semibold text-center">Доступные номера</h2>
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


