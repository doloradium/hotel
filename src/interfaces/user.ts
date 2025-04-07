import { ChangeEvent } from 'react';

export interface ModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    children: React.ReactNode
    className?: string
}

export interface ModalChildProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    id?: number;
}

export interface ModalFiltersProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    selectedFilters: string[];
    setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface Room {
    name: string;
    description: string;
    price: number;
    features: string[];
    rating: number;
    id: number;
    image: string;
}

export interface TagProps {
    name: string;
    isActive?: boolean;
    isClickable?: boolean;
    onClick?: () => void;
}

export interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    isMain?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    surname: string;
    birth_date: string;
    email: string;
    password: string;
}

export interface StarsProps {
    rating: number;
    isClickable?: boolean;
    onRatingChange?: (rating: number) => void;
}

export interface FormInputProps {
    textarea?: boolean;
    rows?: number;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
}

export interface ReviewProps {
    room_id: number,
    text: string,
    rating: number
}

export interface RoomParams {
    limit?: number;
    offset?: number;
    start_date?: string;
    end_date?: string;
    count_of_people?: number;
    price_from?: number;
    price_to?: number;
    rating?: number;
    id_pc?: boolean;
    is_noisecancelling?: boolean;
    is_wifi?: boolean;
    is_breakfast?: boolean;
    is_biometry_key?: boolean;
    is_tv?: boolean;
}