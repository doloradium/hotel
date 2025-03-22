export interface ModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    children: React.ReactNode
}

export interface ModalChildProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}
