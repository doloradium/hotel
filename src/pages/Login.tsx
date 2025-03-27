export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Вход в систему</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Введите ваш email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Введите ваш пароль"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
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
    <div className="flex flex-wrap gap-2 p-3 sm:p-4 bg-white rounded-lg shadow-md">
      {features.map((feature, index) => (
        <button
          key={index}
          className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
            selectedFeatures.includes(feature.name)
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
    <div className="w-full sm:w-48 p-3 sm:p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-start px-2 sm:px-3 py-1.5 sm:py-2 text-white bg-blue-500 rounded-t-lg">
        <span className="text-xs sm:text-sm font-semibold mb-1">только</span>
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
        <p className="mt-2 text-xs sm:text-sm text-gray-500">любой рейтинг</p>
      </div>
    </div>
  );
}

export function RoomCard() {
  return (
    <div className="flex flex-col sm:flex-row w-full max-w-4xl p-3 sm:p-4 bg-white rounded-lg shadow-md gap-4">
      {/* Изображение номера */}
      <img
        src="https://standarthotel.com/upload/iblock/1ea/1eaaf3d47deeafcff9b1931a8fad2dc1.jpg"
        alt="Номер 'Пушка'"
        className="w-full sm:w-1/3 h-48 sm:h-auto object-cover rounded-lg"
      />
      {/* Описание номера */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-semibold">Номер "Пушка"</h3>
          {/* Рейтинг */}
          <div className="flex text-blue-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-sm sm:text-base" />
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Данный номер имеет окно с видом на гору Эверест, а еще в нем ночевал
          Александр Лукашенко
        </p>
        {/* Удобства */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="flex items-center px-2 py-1 text-xs sm:text-sm text-blue-600 bg-blue-100 rounded-lg">
            <FaUtensils className="mr-1 text-sm sm:text-base" /> Завтрак в постель
          </span>
          <span className="flex items-center px-2 py-1 text-xs sm:text-sm text-blue-600 bg-blue-100 rounded-lg">
            <FaWifi className="mr-1 text-sm sm:text-base" /> Есть интернет
          </span>
          <span className="flex items-center px-2 py-1 text-xs sm:text-sm text-gray-500 bg-gray-200 rounded-lg">
            <FaUserShield className="mr-1 text-sm sm:text-base" /> Личный дворецкий
          </span>
        </div>
        {/* Кнопка бронирования */}
        <button className="w-full sm:w-auto px-4 py-2 mt-4 text-sm sm:text-base font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
          Забронировать • 8 000 ₽
        </button>
      </div>
    </div>
  );
}
