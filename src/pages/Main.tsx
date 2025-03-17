import Footer from "@/components/Footer";
import Header from "@/components/Header";


import { useState } from "react";

export default function Main() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(55000);
  const [rating, setRating] = useState(0);

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
      <Header />
      <div className="w-full h-60 bg-cover bg-center" style={{ backgroundImage: "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/85863822.jpg?k=d37dac2d88e6decc92c92411a0c06ee8180af0e4b41dfe79962559d7f4e7f02b&o=')" }}></div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-4/5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="number" placeholder="от 0" className="border p-2 rounded-lg" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
          <input type="number" placeholder="до 55 000" className="border p-2 rounded-lg" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          <input type="date" className="border p-2 rounded-lg" />
          <input type="date" className="border p-2 rounded-lg" />
          <input type="number" placeholder="Кол-во чел." className="border p-2 rounded-lg" />
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border p-2 rounded-lg">
            <option value={0}>Любой рейтинг</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star} звёзд</option>
            ))}
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Найти</button>
        </div>
      </div>
      <div className="w-4/5 mx-auto mt-6">
        {rooms.map((room, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 flex">
            <img src={room.image} alt={room.name} className="w-1/4 rounded-lg" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <p>{room.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {room.features.map((feature, i) => (
                  <span key={i} className="bg-gray-200 px-2 py-1 rounded-lg text-sm">{feature}</span>
                ))}
              </div>
              <p className="text-xl font-bold mt-2">{room.price} ₽</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}



