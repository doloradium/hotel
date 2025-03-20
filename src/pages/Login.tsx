export default function Login() {
  return (
    <div>aaa</div>
  )
}



// Фильтры номеров

// import { useState } from "react";
// import { FaUtensils, FaWifi, FaDesktop, FaKey, FaBed, FaVolumeMute, FaHandSparkles } from "react-icons/fa";

// export default function FeaturesSelection() {
//   const features = [
//     { name: "Завтрак в постель", icon: <FaUtensils /> },
//     { name: "Шумоизоляция", icon: <FaVolumeMute /> },
//     { name: "Личный дворецкий", icon: <FaHandSparkles /> },
//     { name: "Есть интернет", icon: <FaWifi /> },
//     { name: "Есть компьютер", icon: <FaDesktop /> },
//     { name: "Биометрический ключ", icon: <FaKey /> }
//   ];

//   const [selectedFeatures, setSelectedFeatures] = useState(["Завтрак в постель", "Биометрический ключ"]);

//   const toggleFeature = (feature : any) => {
//     setSelectedFeatures((prev) =>
//       prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
//     );
//   };

//   return (
//     <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-md">
//       {features.map((feature, index) => (
//         <button
//           key={index}
//           className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
//             selectedFeatures.includes(feature.name)
//               ? "bg-blue-500 text-white"
//               : "bg-blue-100 text-blue-500"
//           }`}
//           onClick={() => toggleFeature(feature.name)}
//         >
//           {feature.icon}
//           {feature.name}
//         </button>
//       ))}
//     </div>
//   );
// }

// Рейтинг в звёздах

// import { FaStar } from "react-icons/fa";

// export default function RatingFilter() {
//   const ratings = [5, 4, 3, 2]; // Уровни рейтинга от 5 до 2 звезд

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md w-48">
//       <div className="flex flex-col items-start bg-blue-500 text-white px-3 py-2 rounded-t-lg">
//         <span className="text-sm font-semibold mb-1">только</span>
//         <div className="flex">
//           {[...Array(5)].map((_, i) => (
//             <FaStar key={i} className="text-white" />
//           ))}
//         </div>
//       </div>
//       <div className="p-2 space-y-2">
//         {ratings.map((stars) => (
//           <div key={stars} className="flex items-center space-x-2">
//             <span className="text-sm">от</span>
//             <div className="flex">
//               {[...Array(5)].map((_, i) => (
//                 <FaStar
//                   key={i}
//                   className={i < stars ? "text-blue-500" : "text-gray-300"}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//         <p className="text-sm text-gray-500 mt-2">любой рейтинг</p>
//       </div>
//     </div>
//   );
// }

// Номера вид на главной странице в блоке

// import { FaStar, FaUtensils, FaWifi, FaUserShield } from "react-icons/fa";

// export default function RoomCard() {
//   return (
//     <div className="bg-white shadow-md rounded-lg flex p-4 w-full max-w-4xl">
//       {/* Изображение номера */}
//       <img
//         src="https://standarthotel.com/upload/iblock/1ea/1eaaf3d47deeafcff9b1931a8fad2dc1.jpg"
//         alt="Номер 'Пушка'"
//         className="w-1/3 rounded-lg"
//       />
//       {/* Описание номера */}
//       <div className="ml-4 flex-1">
//         <div className="flex justify-between">
//           <h3 className="text-lg font-semibold">Номер "Пушка"</h3>
//           {/* Рейтинг */}
//           <div className="flex text-blue-500">
//             {[...Array(5)].map((_, i) => (
//               <FaStar key={i} />
//             ))}
//           </div>
//         </div>
//         <p className="text-gray-600 mt-1">
//           Данный номер имеет окно с видом на гору Эверест, а еще в нем ночевал
//           Александр Лукашенко
//         </p>
//         {/* Удобства */}
//         <div className="flex flex-wrap gap-2 mt-3">
//           <span className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-sm">
//             <FaUtensils className="mr-1" /> Завтрак в постель
//           </span>
//           <span className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-sm">
//             <FaWifi className="mr-1" /> Есть интернет
//           </span>
//           <span className="flex items-center bg-gray-200 text-gray-500 px-2 py-1 rounded-lg text-sm">
//             <FaUserShield className="mr-1" /> Личный дворецкий
//           </span>
//         </div>
//         {/* Кнопка бронирования */}
//         <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
//           Забронировать • 8 000 ₽
//         </button>
//       </div>
//     </div>
//   );
// }


// История бронирования

// import { useState } from "react";
// import { X } from "lucide-react";

// export default function BookingPage() {
//   const [isOpen, setIsOpen] = useState(true); // Окно сразу открыто

//   const bookings = [
//     { id: 1, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "edit" },
//     { id: 2, name: "Номер “Люкс”", rating: 5, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "edit" },
//     { id: 3, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "review" }
//   ];

//   return (
//     <>
//       {/* Модальное окно */}
//       {isOpen && (
//         <div className="fixed inset-0  items-center   bg-opacity-50">
//           <div className="bg-white rounded-xl shadow-lg w-[600px] p-6 relative">
//             {/* Кнопка закрытия */}
//             <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black">
//               <X size={24} />
//             </button>

//             <h2 className="text-2xl font-semibold text-center mb-4">История бронирования</h2>
//             <div className="space-y-4">
//               {bookings.map((booking) => (
//                 <div key={booking.id} className="bg-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center">
//                   <div>
//                     <h3 className="font-semibold">{booking.name}</h3>
                    
//                     {/* Рейтинг */}
//                     <div className="flex items-center">
//                       {Array.from({ length: 5 }, (_, i) => (
//                         <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
//                           fill={i < booking.rating ? "#2B7FFF" : "#D1D5DB"} className="size-5">
//                           <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 
//                           5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 
//                           1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76
//                           -.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
//                         </svg>
//                       ))}
//                     </div>

//                     <p className="text-gray-500 text-sm">{booking.guests} чел, {booking.dates}</p>
//                   </div>

//                   {/* Кнопки */}
//                   <div className="flex space-x-2">
//                     {booking.status === "edit" ? (
//                       <>
//                         <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">Отменить</button>
//                         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Редактировать</button>
//                       </>
//                     ) : (
//                       <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Оставить отзыв</button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



