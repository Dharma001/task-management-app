import React from 'react';
import Form, { TaskFormData } from './Form';

const Create: React.FC = () => {
    const handleCreateTask = async (formData: TaskFormData) => {
        // Logic to create a task using formData
        console.log('Creating task:', formData);
        // Call an API here to save the task
    };

    return (
        <div className="p-4">
            <Form title="Create New Task" onSubmit={handleCreateTask} />
        </div>
    );
};

export default Create;
