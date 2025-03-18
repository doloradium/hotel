// Календарь

// export default function CustomCalendar() {
//     return (
//       <div className="w-80 bg-white p-4 rounded-lg shadow-md text-center">
//         <div className="flex justify-between items-center mb-2">
//           <button className="p-2">◀</button>
//           <h2 className="font-bold">Март 2025</h2>
//           <button className="p-2">▶</button>
//         </div>
//         <div className="grid grid-cols-7 text-gray-600 text-sm">
//           {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((day) => (
//             <div key={day} className="p-1 font-semibold">{day}</div>
//           ))}
//         </div>
//         <div className="grid grid-cols-7 gap-1">
//           {[...Array(31).keys()].map((day) => (
//             <button
//               key={day}
//               className={`p-2 rounded-md 
//                 ${day + 1 === 5 || day + 1 === 16 ? "bg-blue-500 text-white" : ""} 
//                 ${day + 1 > 5 && day + 1 < 16 ? "bg-blue-200" : ""}`}
//             >
//               {day + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   }

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

import { FaStar } from "react-icons/fa";

export default function RatingFilter() {
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
