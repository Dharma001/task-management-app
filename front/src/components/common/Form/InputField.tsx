import React, { useEffect, useRef, ReactNode, forwardRef } from 'react';

interface InputFieldProps {
    id?: string;
    value: string;
    type?: string;
    icon?: ReactNode;
    placeholder?: string;
    required?: boolean;
    autofocus?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            id,
            value,
            type = 'text',
            icon,
            placeholder,
            required = false,
            autofocus = false,
            onChange,
            error,
        },
        ref
    ) => {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            if (autofocus) {
                (ref as React.RefObject<HTMLInputElement> | null)?.current?.focus();
            }
        }, [autofocus, ref]);

        return (
            <div className="relative mt-3">
                <input
                    id={id}
                    ref={ref || inputRef}
                    className={`input-color w-full p-3 rounded-[5px] focus:outline-none focus:border-blue-500 focus:ring-blue-600 pl-12 ${
                        error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                {icon && (
                    <div className="absolute top-[1rem] left-4 z-10 pointer-events-none text-gray-500">
                        {icon}
                    </div>
                )}
                {error && <span className="text-red-500 text-xs">{error}</span>}
            </div>
        );
    }
);

InputField.displayName = 'InputField';

export default InputField;
