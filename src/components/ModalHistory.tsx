import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Stars from '@/components/Stars';
import { ModalChildProps } from '@/interfaces';

export default function ModalHistory({ isOpen, setIsOpen }: ModalChildProps) {

    const bookings = [
        { id: 1, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "edit" },
        { id: 2, name: "Номер “Люкс”", rating: 5, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "edit" },
        { id: 3, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "review" },
        { id: 3, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "review" },
        { id: 3, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "review" },
        { id: 3, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "review" },
        { id: 3, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "review" },
        { id: 3, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "review" },
        { id: 3, name: "Номер “Люкс”", rating: 4, guests: 3, dates: "12.02.2002 — 16.02.2002", status: "review" },
    ];

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="mb-8 text-2xl font-semibold text-center">История</h2>
            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center justify-between p-4 bg-white border border-gray-200 shadow-(--custom-shadow) rounded-2xl unded-lg">
                        <div className='flex flex-col gap-2'>
                            <div className="flex items-center justify-between gap-4 sm:justify-baseline">
                                <h3 className="text-xl font-semibold">{booking.name}</h3>
                                <Stars rating={3} />
                            </div>
                            <p className="text-sm text-gray-500">{booking.guests} чел, {booking.dates}</p>
                        </div>

                        <div className="flex space-x-2">
                            {booking.status === "edit" ? (
                                <>
                                    <Button isMain={false}>Отменить</Button>
                                    <Button>Редактировать</Button>
                                </>
                            ) : (
                                <Button>Оставить отзыв</Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
}