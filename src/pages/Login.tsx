export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <div className="w-full max-w-md flex flex-col gap-8 items-center p-8 border border-gray-200 bg-white shadow-(--custom-shadow) rounded-xl">
        <h1 className="text-2xl font-semibold text-center">Вход в систему</h1>
        <form className="flex flex-col items-center w-full space-y-4">
          <input
            type="email"
            className="w-full h-10 px-4 py-2 placeholder-gray-400 border border-gray-200 rounded-lg bg-gray-50"
            placeholder="Почта"
          />
          <input
            type="password"
            className="w-full h-10 px-4 py-2 placeholder-gray-400 border border-gray-200 rounded-lg bg-gray-50"
            placeholder="Пароль"
          />
          <Button type='submit' className='mt-4'>
            Войти
          </Button>
        </form>
      </div>
      <a href="register" className="block text-left text-blue-500 transition-all duration-300 cursor-pointer hover:scale-90 active:scale-90 active:text-orange-500 touch-action-manipulation">Нет аккаунта? Зарегистрироваться</a>
    </div>
  );
}

// Фильтры номеров
import { useState } from 'react';
import {
    FaDesktop, FaHandSparkles, FaKey, FaStar, FaUtensils, FaVolumeMute, FaWifi
} from 'react-icons/fa';

import Button from '@/components/Button';

export function FeaturesSelection() {
  const features = [
    { name: "Завтрак в постель", icon: <FaUtensils /> },
    { name: "Шумоизоляция", icon: <FaVolumeMute /> },
    { name: "Личный дворецкий", icon: <FaHandSparkles /> },
    { name: "Есть интернет", icon: <FaWifi /> },
    { name: "Есть компьютер", icon: <FaDesktop /> },
    { name: "Биометрический ключ", icon: <FaKey /> }
  ];

  const [selectedFeatures, setSelectedFeatures] = useState(["Завтрак в постель", "Биометрический ключ"]);

  const toggleFeature = (feature: any) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-white rounded-lg shadow-md sm:p-4">
      {features.map((feature, index) => (
        <button
          key={index}
          className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${selectedFeatures.includes(feature.name)
            ? "bg-blue-500 text-white"
            : "bg-blue-100 text-blue-500"
            }`}
          onClick={() => toggleFeature(feature.name)}
        >
          <span className="text-sm sm:text-base">{feature.icon}</span>
          <span className="whitespace-nowrap">{feature.name}</span>
        </button>
      ))}
    </div>
  );
}

export function RatingFilter() {
  const ratings = [5, 4, 3, 2];

  return (
    <div className="w-full p-3 bg-white rounded-lg shadow-md sm:w-48 sm:p-4">
      <div className="flex flex-col items-start px-2 sm:px-3 py-1.5 sm:py-2 text-white bg-blue-500 rounded-t-lg">
        <span className="mb-1 text-xs font-semibold sm:text-sm">только</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-sm sm:text-base" />
          ))}
        </div>
      </div>
      <div className="p-2 space-y-1.5 sm:space-y-2">
        {ratings.map((stars) => (
          <div key={stars} className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="text-xs sm:text-sm">от</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm sm:text-base ${i < stars ? "text-blue-500" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
        ))}
        <p className="mt-2 text-xs text-gray-500 sm:text-sm">любой рейтинг</p>
      </div>
    </div>
  );
}