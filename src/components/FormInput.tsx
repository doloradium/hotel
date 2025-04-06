import { motion } from 'framer-motion';
import React from 'react';

interface FormInputProps {
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, type, placeholder, value, onChange, onBlur, error }) => {
    return (
        <div className="relative w-full">
            <input
                type={type}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                className="w-full h-10 px-4 py-2 mb-2 placeholder-gray-400 border border-gray-200 rounded-lg bg-gray-50"
                placeholder={placeholder}
            />
            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}} 
                    transition={{ duration: 0.2 }} 
                    className="absolute text-sm text-red-500 -bottom-3"
                >
                    {error}
                </motion.div>
            )}
        </div>
    );
};

export default FormInput;
