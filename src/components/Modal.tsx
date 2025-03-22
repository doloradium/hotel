import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"

interface ModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    children: React.ReactNode
}

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
                    className="w-full h-screen z-2 flex items-center justify-center fixed top-0 left-0 bg-black/50"
                >
                    <motion.div
                        initial={{ y: '10%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '10%' }}
                        transition={{ ease: 'circOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-xl shadow-lg w-[600px] p-6 relative"
                    >
                        <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2b7fff" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    )
}
