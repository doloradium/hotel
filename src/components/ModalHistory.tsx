import Modal from "@/components/Modal";

interface ModalHistoryProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

export default function ModalHistory({ isOpen, setIsOpen }: ModalHistoryProps) {

    const bookings = [
        { id: 1, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "edit" },
        { id: 2, name: "Номер “Люкс”", rating: 5, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "edit" },
        { id: 3, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "review" }
    ];

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="text-2xl font-semibold text-center mb-4">История бронирования</h2>
            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{booking.name}</h3>

                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill={i < booking.rating ? "#2B7FFF" : "#D1D5DB"} className="size-5">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 
                          5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 
                          1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76
                          -.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-500 text-sm">{booking.guests} чел, {booking.dates}</p>
                        </div>

                        <div className="flex space-x-2">
                            {booking.status === "edit" ? (
                                <>
                                    <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">Отменить</button>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Редактировать</button>
                                </>
                            ) : (
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Оставить отзыв</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
}