import React, { useEffect, useRef, ReactNode } from 'react';

interface InputFieldProps {
    modelValue: string;
    type?: string;
    icon?: ReactNode;
    placeholder?: string;
    required?: boolean;
    onChange: (value: string) => void; 
}

const InputField: React.FC<InputFieldProps> = ({
    modelValue,
    type = 'text',
    icon,
    placeholder,
    required = false,
    onChange,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current && inputRef.current.hasAttribute('autofocus')) {
            inputRef.current.focus();
        }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="relative mt-3">
            <input
                ref={inputRef}
                className="input-color w-full p-3 rounded-[5px] focus:outline-none focus:border-blue-500 focus:rounded-md focus:ring-blue-600 focus:ring pl-12"
                type={type}
                step="any"
                placeholder={placeholder}
                value={modelValue}
                onChange={handleInputChange}
                required={required}
            />
            {icon && (
                <div className="absolute top-[1rem] left-4 z-10 pointer-events-none text-gray-500">
                    {icon}
                </div>
            )}
        </div>
    );
};

export default InputField;
