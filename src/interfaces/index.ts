export interface ModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    children: React.ReactNode
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
    index: number;
}