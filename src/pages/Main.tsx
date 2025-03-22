import { useState } from "react";
import Calendar from "./Calendar";
import { FeaturesSelection, RatingFilter, RoomCard } from "@/pages/Login";
import heroImage from "@/assets/hero.jpg";
import { useNavigate } from "react-router";

export default function Main() {
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(55000);
  const [rating, setRating] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
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
    <div className="min-h-screen bg-gray-100">
      <div style={{ backgroundImage: `url(${heroImage})` }} className={`w-full h-32 sm:h-40 md:h-96 bg-cover bg-center`}></div>
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md mt-3 sm:mt-4 md:mt-6 w-[98%] sm:w-[95%] md:w-[90%] lg:w-4/5 mx-auto">
        <div className="flex flex-col gap-2 sm:gap-1">
          <div className="flex flex-col sm:flex-col md:flex-row gap-3 sm:gap-4 md:items-end">
            <div className="w-full md:w-auto">
              <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Стоимость за сутки</div>
              <div className="flex flex-row gap-2 sm:gap-4">
                <input
                  type="number"
                  placeholder="от 0"
                  className="w-full md:w-[160px] lg:w-[200px] h-10 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-gray-50 text-gray-400 placeholder-gray-400 text-sm"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <input
                  type="number"
                  placeholder="до 55 000"
                  className="w-full md:w-[160px] lg:w-[200px] h-10 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-gray-50 text-gray-400 placeholder-gray-400 text-sm"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="w-full md:w-auto">
              <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Даты пребывания</div>
              <div className="flex flex-row gap-2 sm:gap-4">
                <div className="relative w-full md:w-auto flex-1 md:flex-none">
                  <input
                    type="text"
                    placeholder="Заезд"
                    className="w-full md:w-[140px] lg:w-[160px] h-10 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-gray-50 text-gray-400 placeholder-gray-400 cursor-pointer text-sm"
                    value={startDate ? startDate.toLocaleDateString() : ''}
                    onClick={() => setShowStartCalendar(!showStartCalendar)}
                    readOnly
                  />
                  {showStartCalendar && (
                    <div className="absolute top-12 sm:top-14 left-0 z-50 bg-white shadow-lg rounded-lg">
                      <Calendar
                        selectedDate={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          setShowStartCalendar(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="relative w-full md:w-auto flex-1 md:flex-none">
                  <input
                    type="text"
                    placeholder="Выезд"
                    className="w-full md:w-[140px] lg:w-[160px] h-10 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-gray-50 text-gray-400 placeholder-gray-400 cursor-pointer text-sm"
                    value={endDate ? endDate.toLocaleDateString() : ''}
                    onClick={() => setShowEndCalendar(!showEndCalendar)}
                    readOnly
                  />
                  {showEndCalendar && (
                    <div className="absolute top-12 sm:top-14 left-0 z-50 bg-white shadow-lg rounded-lg">
                      <Calendar
                        selectedDate={endDate}
                        onChange={(date) => {
                          setEndDate(date);
                          setShowEndCalendar(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Количество человек</div>
              <input
                type="number"
                placeholder="1"
                className="w-full md:w-[100px] lg:w-[120px] h-10 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-gray-50 text-gray-400 placeholder-gray-400 text-sm"
              />
            </div>
            <button onClick={() => navigate("/room")} className="h-full absolute top-1/2 left-8/10 -translate-2/4  bg-[#3B82F6] hover:bg-blue-600 text-white h-10  sm:h-20 px-16 rounded-xl sm:rounded-2xl md:ml-auto mt-0 md:mt-0 text-sm sm:text-base font-medium">
              Найти
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative w-full sm:w-[445px]">
              <div
                className="w-full h-10 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-gray-50 text-gray-400 cursor-pointer flex items-center text-sm"
                onClick={() => setShowAmenities(!showAmenities)}
              >
                {selectedAmenities.length ? `Выбрано: ${selectedAmenities.length}` : 'Удобства'}
              </div>

              {showAmenities && (
                <div className="absolute top-12 sm:top-14 left-0 z-50 bg-white shadow-lg rounded-lg p-3 sm:p-4 w-full">
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
                          className="rounded border-gray-300"
                        />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full sm:w-[445px]">
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full h-10 sm:h-12 border border-gray-200 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-gray-50 text-gray-400 text-sm"
              >
                <option value={0}>Рейтинг</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>{star} ★</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[98%] sm:w-[95%] md:w-[90%] lg:w-4/5 mx-auto mt-4 sm:mt-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Доступные номера</h2>
        <div className="space-y-4">
          {rooms.map((room, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
              <img
                src={room.image}
                alt={room.name}
                className="w-full md:w-[250px] h-[180px] object-cover rounded-lg"
              />
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <div className="flex gap-1">
                    {[...Array(room.rating)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2B7FFF" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                    ))}
                    {[...Array(5 - room.rating)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#BEDBFF" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-2 text-sm">{room.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {room.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-blue-100 text-blue-500 px-3 py-1.5 rounded-lg text-sm">
                      {feature === "Завтрак в постель" && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                        </svg>
                      )}
                      {feature === "Шумоизоляция" && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg>
                      )}
                      {feature === "Есть интернет" && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                        </svg>
                      )}
                      {feature === "Есть компьютер" && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                        </svg>
                      )}
                      {feature === "Биометрический ключ" && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                        </svg>
                      )}
                      {feature === "Личный дворецкий" && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      )}
                      {feature}
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-fit bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm">
                  Забронировать • {room.price} ₽
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <RoomCard />
      <RatingFilter />
      <FeaturesSelection />
    </div>
  );
}



