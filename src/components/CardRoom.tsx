import { useNavigate } from 'react-router';

import Button from '@/components/Button';
import Stars from '@/components/Stars';
import Tag from '@/components/Tag';
import { Room } from '@/interfaces';

export default function CardRoom({ name, description, price, features, rating, image, index }: Room) {
    const navigate = useNavigate();

    return (
        <div key={index} className="flex flex-col md:flex-row overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-(--custom-shadow)">
            <div className="w-full h-auto md:max-w-3xs md:aspect-square max-h-xs">
                <img
                    src={image}
                    alt={name}
                    className="block object-cover w-full h-full"
                />
            </div>
            <div className="flex flex-col justify-between w-full gap-8 p-4 sm:p-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{name}</h3>
                        <Stars rating={rating} />
                    </div>
                    <p className="text-gray-500">{description}</p>
                    <div className="flex flex-wrap gap-1">
                        {features.map((feature, index) => (
                            <Tag name={feature} key={index} />
                        ))}
                    </div>
                </div>
                <Button onClick={() => {
                    navigate(`/room`)
                }}>
                    Забронировать • {price} ₽
                </Button>
            </div>
        </div>
    )
}
