import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { ModalProps } from '@/interfaces';

export default function Modal({ isOpen, setIsOpen, children }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {
                isOpen &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-xs z-2 bg-black/25"
                >
                    <div className="flex w-full h-full px-4 py-16 overflow-y-scroll">
                        <motion.div
                            initial={{ y: '10%' }}
                            animate={{ y: '0%' }}
                            exit={{ y: '10%' }}
                            transition={{ ease: 'circOut' }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full p-4 m-auto bg-white shadow-(--custom-shadow) sm:p-8 h-fit rounded-2xl sm:w-3xl"
                        >
                            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="transition-all duration-300 cursor-pointer stroke-blue-500 hover:scale-90 active:stroke-orange-500 size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                            {children}
                        </motion.div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}
