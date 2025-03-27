import { useState } from 'react';

import Calendar from '@/components/Calendar';
import ModalReview from '@/components/ModalReview';

export default function Room() {
  const [isOpen, setIsOpen] = useState(false)

  const icon_filter = [
    {
      id: 0,
      text: "Завтрак в постель",
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2B7FFF" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
        </svg>
    },
    {
      id: 1,
      text: "Шумоизоляция",
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2B7FFF" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
    },
    {
      id: 2,
      text: "Есть интернет",
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2B7FFF" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
        </svg>
    },
    {
      id: 3,
      text: "Есть компьютер",
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2B7FFF" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
    },
    {
      id: 4,
      text: "Биометрический ключ",
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2B7FFF" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
        </svg>
    },
    {
      id: 5,
      text: "Личный дворецкий",
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2B7FFF" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
        </svg>
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10">
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold">Номер "Люкс"</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Данный номер имеет окно с видом на гору Эверест, а еще в нем ночевал Владимир Путин</p>
          <div className="flex gap-1 sm:gap-2 my-3 sm:my-4">
            {
              [1, 2, 3, 4, 5].map((_, index) => (
                <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2B7FFF" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))
            }
          </div>
          <div className='flex flex-wrap gap-2'>
            {
              icon_filter.map((item) => (
                <div key={item.id} className='flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-blue-500 bg-blue-200 rounded-lg'>
                  {item.icon}
                  {item.text}
                </div>
              ))
            }
          </div>
          <img 
            src="https://standarthotel.com/upload/iblock/1ea/1eaaf3d47deeafcff9b1931a8fad2dc1.jpg" 
            alt="Room" 
            className="w-full h-48 sm:h-64 object-cover rounded-lg mt-4 sm:mt-6" 
          />
        </div>
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full">
          <h2 className="text-xl sm:text-2xl font-semibold">Выберите дату</h2>
          <div className="mt-4">
            <Calendar className="p-2 border rounded-lg w-full max-w-full" />
          </div>
          <button className="w-full px-4 py-2 mt-4 text-sm sm:text-base text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
            Забронировать • 12 000 ₽
          </button>
        </div>
      </div>
      <div className="mt-6 sm:mt-10">
        <div className="relative flex items-center">
          <button 
            onClick={() => setIsOpen(true)} 
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-semibold text-blue-500 bg-blue-200 rounded-lg hover:bg-blue-300 transition-colors"
          >
            Оставить отзыв
          </button>
          <h2 className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl font-semibold">Отзывы</h2>
        </div>
        <div className="mt-4 space-y-3 sm:space-y-4">
          {["Владимир", "Франц", "Дональд"].map((name, index) => (
            <div key={index} className="p-3 sm:p-4 bg-white rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 sm:p-2 bg-blue-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 sm:w-5 sm:h-5">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-medium">{name}</h4>
                </div>
                <div className="flex gap-1">
                  {
                    [1, 2, 3, 4].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2B7FFF" className="w-4 h-4 sm:w-5 sm:h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                    ))
                  }
                  {
                    [1].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#BEDBFF" className="w-4 h-4 sm:w-5 sm:h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                    ))
                  }
                </div>
              </div>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                {name === "Владимир" ?
                  "Мне очень понравилось, всем рекомендую" :
                  name === "Франц" ?
                    "Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое." :
                    "Душа моя озарена неземной радостью, как эти чудесные весенние утра..."}
              </p>
            </div>
          ))}
        </div>
      </div>
      <ModalReview isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
} 