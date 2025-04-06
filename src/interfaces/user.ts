export interface ModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    children: React.ReactNode
    className?: string
}

export interface ModalChildProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

export interface Room {
    name: string;
    description: string;
    price: number;
    features: string[];
    rating: number;
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