import { Interface } from '@/interfaces';

export default function Button({ isMain = true, children, type = 'button', className, onClick }: Interface.ButtonProps) {
    return (
        <button type={type} className={`hover:scale-90 w-fit transition-all duration-300 cursor-pointer active:scale-90 px-4 py-2 font-semibold ${isMain == true ? 'text-white bg-blue-500 active:bg-orange-500' : 'text-blue-500 bg-blue-200 active:bg-orange-200 active:text-orange-500'} rounded-lg ${className != undefined ? className : ''}`} onClick={onClick}>
            {children}
        </button>
    )
}
