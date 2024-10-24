import React from 'react';

interface InputErrorsProps {
    errors?: string[]; // Array of error messages
}

const InputErrors: React.FC<InputErrorsProps> = ({ errors }) => {
    if (!errors || errors.length === 0) {
        return null; // No errors to display
    }

    return (
        <div>
            {errors.map((error, index) => (
                <p key={index} className="text-sm text-red-600">
                    {error}
                </p>
            ))}
        </div>
    );
};

export default InputErrors;
