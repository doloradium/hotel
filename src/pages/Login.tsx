export default function Login() {
  return (
    <div>aaa</div>
  )
}



// Фильтры номеров

import { useState } from 'react';
import {
  FaDesktop, FaHandSparkles, FaKey, FaStar, FaUserShield, FaUtensils, FaVolumeMute, FaWifi
} from 'react-icons/fa';

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
    <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-md">
      {features.map((feature, index) => (
        <button
          key={index}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${selectedFeatures.includes(feature.name)
              ? "bg-blue-500 text-white"
              : "bg-blue-100 text-blue-500"
            }`}
          onClick={() => toggleFeature(feature.name)}
        >
          {feature.icon}
          {feature.name}
        </button>
      ))}
    </div>
  );
}

export function RatingFilter() {
  const ratings = [5, 4, 3, 2]; // Уровни рейтинга от 5 до 2 звезд

  return (
    <div className="w-48 p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-start px-3 py-2 text-white bg-blue-500 rounded-t-lg">
        <span className="mb-1 text-sm font-semibold">только</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-white" />
          ))}
        </div>
      </div>
      <div className="p-2 space-y-2">
        {ratings.map((stars) => (
          <div key={stars} className="flex items-center space-x-2">
            <span className="text-sm">от</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < stars ? "text-blue-500" : "text-gray-300"}
                />
              ))}
            </div>
          </div>
        ))}
        <p className="mt-2 text-sm text-gray-500">любой рейтинг</p>
      </div>
    </div>
  );
}

export function RoomCard() {
  return (
    <div className="flex w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
      {/* Изображение номера */}
      <img
        src="https://standarthotel.com/upload/iblock/1ea/1eaaf3d47deeafcff9b1931a8fad2dc1.jpg"
        alt="Номер 'Пушка'"
        className="w-1/3 rounded-lg"
      />
      {/* Описание номера */}
      <div className="flex-1 ml-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Номер "Пушка"</h3>
          {/* Рейтинг */}
          <div className="flex text-blue-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
        <p className="mt-1 text-gray-600">
          Данный номер имеет окно с видом на гору Эверест, а еще в нем ночевал
          Александр Лукашенко
        </p>
        {/* Удобства */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="flex items-center px-2 py-1 text-sm text-blue-600 bg-blue-100 rounded-lg">
            <FaUtensils className="mr-1" /> Завтрак в постель
          </span>
          <span className="flex items-center px-2 py-1 text-sm text-blue-600 bg-blue-100 rounded-lg">
            <FaWifi className="mr-1" /> Есть интернет
          </span>
          <span className="flex items-center px-2 py-1 text-sm text-gray-500 bg-gray-200 rounded-lg">
            <FaUserShield className="mr-1" /> Личный дворецкий
          </span>
        </div>
        {/* Кнопка бронирования */}
        <button className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded-lg">
          Забронировать • 8 000 ₽
        </button>
      </div>
    </div>
  );
}
