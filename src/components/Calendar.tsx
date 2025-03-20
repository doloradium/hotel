export default function CustomCalendar({ className = "" }) {
    return (
      <div className={`w-md bg-white p-8 rounded-lg shadow-md text-center ${className}`}>
        <div className="flex justify-between items-center mb-2">
          <button className="p-2">◀</button>
          <h2 className="font-bold">Март 2025</h2>
          <button className="p-2">▶</button>
        </div>
        <div className="grid grid-cols-7 text-gray-600 text-sm">
          {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((day) => (
            <div key={day} className="p-1 font-semibold">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {[...Array(31).keys()].map((day) => (
            <button
              key={day}
              className={`p-2 rounded-md aspect-square  
                ${day + 1 === 5 || day + 1 === 16 ? "bg-blue-500 text-white" : ""} 
                ${day + 1 > 5 && day + 1 < 16 ? "bg-blue-200" : ""}`}
            >
              {day + 1}
            </button>
          ))}
        </div>
      </div>
    );
}
