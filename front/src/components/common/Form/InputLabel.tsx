import React from 'react';

interface InputLabelProps {
    htmlFor?: string;
    text?: string;
    children?: React.ReactNode; 
}

const InputLabel: React.FC<InputLabelProps> = ({ htmlFor, text, children }) => {
    return (
        <label htmlFor={htmlFor} className="block font-medium text-sm text-gray-700">
            {text ? <span>{text}</span> : <span>{children}</span>}
        </label>
    );
};

export default InputLabel;
