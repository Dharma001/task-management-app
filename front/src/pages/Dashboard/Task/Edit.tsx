import React, { useEffect, useState } from 'react';
import Form, { TaskFormData } from './Form';

interface TaskEditProps {
  taskId: number
}

const Edit: React.FC<TaskEditProps> = ({ taskId }) => {
    const [initialValues, setInitialValues] = useState<TaskFormData | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            // Replace with your API call to fetch the task by taskId
            const task = await fetch(`/api/tasks/${taskId}`).then(res => res.json());
            setInitialValues({
                title: task.title,
                description: task.description,
                dueDate: task.due_date,
                attachment: task.attachment || '',
                priority: task.priority || '',
                status: task.status || '',
            });
        };

        fetchTask();
    }, [taskId]);

    const handleEditTask = async (formData: TaskFormData) => {
        // Logic to edit the task using formData
        console.log('Editing task:', formData);
        // Call an API here to update the task
    };

    if (!initialValues) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <Form title="Edit Task" onSubmit={handleEditTask} initialValues={initialValues} />
        </div>
    );
};

export default Edit;
