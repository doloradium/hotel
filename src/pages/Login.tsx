export default function Login() {
  return (
    <div>aaa</div>
  )
}



// Фильтры номеров

import { useState } from "react";
import { FaUtensils, FaWifi, FaDesktop, FaKey, FaBed, FaVolumeMute, FaHandSparkles } from "react-icons/fa";

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

  const toggleFeature = (feature : any) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  return (
    <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-md">
      {features.map((feature, index) => (
        <button
          key={index}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
            selectedFeatures.includes(feature.name)
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

// Рейтинг в звёздах

import { FaStar } from "react-icons/fa";

export function RatingFilter() {
  const ratings = [5, 4, 3, 2]; // Уровни рейтинга от 5 до 2 звезд

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-48">
      <div className="flex flex-col items-start bg-blue-500 text-white px-3 py-2 rounded-t-lg">
        <span className="text-sm font-semibold mb-1">только</span>
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
        <p className="text-sm text-gray-500 mt-2">любой рейтинг</p>
      </div>
    </div>
  );
}

// Номера вид на главной странице в блоке

import {FaUserShield } from "react-icons/fa";

export function RoomCard() {
  return (
    <div className="bg-white shadow-md rounded-lg flex p-4 w-full max-w-4xl">
      {/* Изображение номера */}
      <img
        src="https://standarthotel.com/upload/iblock/1ea/1eaaf3d47deeafcff9b1931a8fad2dc1.jpg"
        alt="Номер 'Пушка'"
        className="w-1/3 rounded-lg"
      />
      {/* Описание номера */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Номер "Пушка"</h3>
          {/* Рейтинг */}
          <div className="flex text-blue-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
        <p className="text-gray-600 mt-1">
          Данный номер имеет окно с видом на гору Эверест, а еще в нем ночевал
          Александр Лукашенко
        </p>
        {/* Удобства */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-sm">
            <FaUtensils className="mr-1" /> Завтрак в постель
          </span>
          <span className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-sm">
            <FaWifi className="mr-1" /> Есть интернет
          </span>
          <span className="flex items-center bg-gray-200 text-gray-500 px-2 py-1 rounded-lg text-sm">
            <FaUserShield className="mr-1" /> Личный дворецкий
          </span>
        </div>
        {/* Кнопка бронирования */}
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
          Забронировать • 8 000 ₽
        </button>
      </div>
    </div>
  );
}
