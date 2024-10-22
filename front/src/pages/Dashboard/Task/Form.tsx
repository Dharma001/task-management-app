import React from 'react';
import InputErrors from '../../../components/common/Form/InputErrors';
import InputField from '../../../components/common/Form/InputField';
import InputLabel from '../../../components/common/Form/InputLabel';

interface FormProps {
    title: string;
    onSubmit: (formData: TaskFormData) => void;
    initialValues?: TaskFormData; // Optional for editing
}

export interface TaskFormData {
    title: string;
    description: string;
    dueDate: string;
    attachment: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | '';
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'INCOMPLETE' | '';
}

const Form: React.FC<FormProps> = ({ title, onSubmit, initialValues }) => {
    const [formData, setFormData] = React.useState<TaskFormData>({
        title: initialValues?.title || '',
        description: initialValues?.description || '',
        dueDate: initialValues?.dueDate || '',
        attachment: initialValues?.attachment || '',
        priority: initialValues?.priority || '',
        status: initialValues?.status || '',
    });

    const [errors, setErrors] = React.useState<{ [key in keyof TaskFormData]?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors: { [key in keyof TaskFormData]?: string } = {};
        if (!formData.title) newErrors.title = 'Title is required.';
        if (!formData.description) newErrors.description = 'Description is required.';
        if (!formData.dueDate) newErrors.dueDate = 'Due Date is required.';
        // Additional validations can be added here
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // return true if no errors
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <div>
                <InputLabel value="Title" />
                <InputField
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <InputErrors message={errors.title} />
            </div>
            <div>
                <InputLabel value="Description" />
                <InputField
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <InputErrors message={errors.description} />
            </div>
            <div>
                <InputLabel value="Due Date" />
                <InputField
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                />
                <InputErrors message={errors.dueDate} />
            </div>
            <div>
                <InputLabel value="Attachment" />
                <InputField
                    name="attachment"
                    value={formData.attachment}
                    onChange={handleChange}
                />
            </div>
            <div>
                <InputLabel value="Priority" />
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500"
                >
                    <option value="">Select Priority</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>
            </div>
            <div>
                <InputLabel value="Status" />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500"
                >
                    <option value="">Select Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="INCOMPLETE">Incomplete</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                Submit
            </button>
        </form>
    );
};

export default Form;
