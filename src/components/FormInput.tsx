import { motion } from 'framer-motion';

import { Interface } from '@/interfaces';

export default function FormInput({
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    textarea = false,
    rows = 3,
}: Interface.FormInputProps) {
    return (
        <div className="relative w-full">
            {textarea ? (
                <textarea
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder={placeholder}
                    rows={rows}
                    className="w-full p-4 mb-2 placeholder-gray-500 border border-gray-200 rounded-lg resize-none bg-gray-50"
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    className="w-full h-10 px-4 py-2 mb-2 placeholder-gray-500 border border-gray-200 rounded-lg bg-gray-50"
                    placeholder={placeholder}
                />
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute text-sm text-red-500 ${textarea == false ? '-bottom-3' : '-bottom-2'}`}
                >
                    {error}
                </motion.div>
            )}
        </div>
    );
}
