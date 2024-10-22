import React from 'react';

interface InputErrorsProps {
    message?: string;
}

const InputErrors: React.FC<InputErrorsProps> = ({ message }) => {
    return (
        <div style={{ display: message ? 'block' : 'none' }}>
            <p className="text-sm text-red-600">
                {message}
            </p>
        </div>
    );
};

export default InputErrors;
