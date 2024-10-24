import React from 'react';

interface SubmitButtonProps {
    loading: boolean;
    text: string;
    loadingText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, text, loadingText = "Processing..." }) => {
    return (
        <button 
            type="submit" 
            disabled={loading} 
            className={`submit-button p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? loadingText : text}
        </button>
    );
};

export default SubmitButton;
