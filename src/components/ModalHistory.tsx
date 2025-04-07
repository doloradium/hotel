import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Stars from '@/components/Stars';
import { Interface } from '@/interfaces';
import { UserService } from '@/services';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    
    return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${date.getFullYear()}`;
};

const isBookingEditable = (startDateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDate = new Date(startDateString);
    startDate.setHours(0, 0, 0, 0); 
    
    return startDate > today;
};

export default function ModalHistory({ isOpen, setIsOpen }: Interface.ModalChildProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['getRooms'] });
    }, [isOpen, queryClient]);

    const { data: data, isLoading } = useQuery({
        queryKey: ['getRooms'],
        queryFn: () => UserService.getReservations(),
        enabled: isOpen,
    });

    const handleCancelBooking = async (bookingId: number) => {
        try {
            const response = await UserService.deleteReservation(bookingId);
            
            if (response?.success == true) {
                queryClient.invalidateQueries({ queryKey: ['getRooms'] });
                queryClient.invalidateQueries({ queryKey: ['getBookedDates'] });
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
            alert('Произошла ошибка при отмене бронирования');
            queryClient.invalidateQueries({ queryKey: ['getRooms'] });
            queryClient.invalidateQueries({ queryKey: ['getBookedDates'] });
        }
    };

    const handleEditBooking = (booking: any) => {
        const queryParams = new URLSearchParams({
            id: booking.room.id.toString(),
            edit_mode: 'true',
            reservation_id: booking.id.toString(),
            start_date: booking.start_date,
            end_date: booking.end_date,
            count_of_people: booking.room.count_of_people.toString()
        }).toString();
        
        navigate(`/room?${queryParams}`);
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="mb-8 text-2xl font-semibold text-center">История</h2>
            <div className="space-y-4">
                {data?.data?.map((booking) => {
                    const canEdit = isBookingEditable(booking.start_date);
                    
                    return (
                        <div key={booking.id} className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center justify-between p-4 bg-white border border-gray-200 shadow-(--custom-shadow) rounded-2xl unded-lg">
                            <div className='flex flex-col gap-2'>
                                <div className="flex items-center justify-between gap-4 sm:justify-baseline">
                                    <h3 className="text-xl font-semibold">{booking.room.name}</h3>
                                    <Stars rating={booking.room.rating} />
                                </div>
                                <p className="text-sm text-gray-500">
                                    {booking.room.count_of_people} чел, {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                                </p>
                            </div>

                            <div className="flex space-x-2">
                                {canEdit ? (
                                    <>
                                        <Button isMain={false} onClick={() => handleCancelBooking(booking.id)}>Отменить</Button>
                                        <Button onClick={() => handleEditBooking(booking)}>Редактировать</Button>
                                    </>
                                ) : (
                                    <Button onClick={() => {
                                        navigate(`/room?id=${booking.room.id}`);
                                        setIsOpen(false);
                                    }}>
                                    Оставить отзыв</Button>
                                )}
                            </div>
                        </div>
                    );
                })}
                {isLoading && <div className="py-4 text-center">Загрузка...</div>}
                {data?.data?.length === 0 && <div className="py-4 text-center">У вас пока нет бронирований</div>}
            </div>
        </Modal>
    );
}