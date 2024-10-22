import React from 'react';

interface InputLabelProps {
    value?: string; // Optional string prop for the label text
    children?: React.ReactNode; // To allow for slot-like behavior
}

const InputLabel: React.FC<InputLabelProps> = ({ value, children }) => {
    return (
        <label className="block font-medium text-sm text-gray-700">
            {value ? <span>{value}</span> : <span>{children}</span>}
        </label>
    );
};

export default InputLabel;
