import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval
} from "date-fns";
import { ru } from "date-fns/locale";

export default function HotelBooking() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(55000);
  const [rating, setRating] = useState(0);
  const userName = "Иван";

  const features = [
    "Шумоизоляция",
    "Биометрический ключ",
    "Завтрак в постель",
    "Есть интернет",
    "Есть компьютер",
    "Личный дворецкий"
  ];

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const handleDateClick = (date : any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date < startDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const isSelected = (date : any) => {
    if (!startDate) return false;
    if (startDate && !endDate) return format(date, "yyyy-MM-dd") === format(startDate, "yyyy-MM-dd");
    if (endDate) {
      return date >= startDate && date <= endDate;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-white shadow-md flex justify-between items-center px-6 py-4 w-full max-w-6xl">
        <h1 className="text-lg font-bold">Высота 1337</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">История бронирования</button>
          <a href="/profile" className="text-gray-700 hover:underline">{userName}</a>
        </div>
      </header>
      <div className="w-full h-60 bg-cover bg-center" style={{ backgroundImage: "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/85863822.jpg')" }}></div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="number" placeholder="Мин. цена" className="border p-2 rounded-lg" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
          <input type="number" placeholder="Макс. цена" className="border p-2 rounded-lg" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border p-2 rounded-lg">
            <option value={0}>Любой рейтинг</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star} звёзд</option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {features.map((feature, index) => (
            <label key={index} className="inline-flex items-center">
              <input type="checkbox" value={feature} onChange={() => setSelectedFeatures((prev : any) => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature])} />
              <span className="ml-2">{feature}</span>
            </label>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center mt-6">
          <h2 className="font-bold mb-2">Выберите даты</h2>
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2">◀</button>
            <h2 className="font-bold">{format(currentMonth, "LLLL yyyy", { locale: ru })}</h2>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2">▶</button>
          </div>
          <div className="grid grid-cols-7 text-gray-600 text-sm">
            {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((day) => (
              <div key={day} className="p-1 font-semibold">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((day, index) => (
              <button
                key={index}
                className={`p-2 rounded-md ${isSelected(day) ? "bg-blue-500 text-white" : "hover:bg-gray-200"} ${startDate && format(day, "yyyy-MM-dd") === format(startDate, "yyyy-MM-dd") ? "bg-blue-400" : ""} ${endDate && format(day, "yyyy-MM-dd") === format(endDate, "yyyy-MM-dd") ? "bg-blue-400" : ""} ${startDate && endDate && day > startDate && day < endDate ? "bg-blue-200" : ""}`}
                onClick={() => handleDateClick(day)}
              >
                {format(day, "d", { locale: ru })}
              </button>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-white shadow-md mt-10 p-6 text-center w-full">
        DSTU Hotel © 2025, Все права защищеные
      </footer>
    </div>
  );
}
