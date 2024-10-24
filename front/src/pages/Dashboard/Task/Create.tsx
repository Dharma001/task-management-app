import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TaskPriorityEnum, TaskStatusEnum } from '../../../interfaces/api/taskResponse';
import { useTasks } from '../../../hooks/useTask';
import InputErrors from '../../../components/common/Form/InputErrors';
import InputLabel from '../../../components/common/Form/InputLabel';
import InputField from '../../../components/common/Form/InputField';
import SubmitButton from '../../../components/common/Form/SubmitButton';
import { toast } from 'react-toastify';

interface TaskFormInputs {
  title: string;
  description: string;
  due_date: Date | null;
  priority: TaskPriorityEnum;
  attachment?: string;
  archived?: boolean;
  status?: TaskStatusEnum;
}

const CreateTask: React.FC = () => {
  const { taskCreate, loading, error } = useTasks();
  const { control, handleSubmit, reset } = useForm<TaskFormInputs>({
    defaultValues: {
      title: '',
      description: '',
      due_date: null,
      attachment: '',
      priority: TaskPriorityEnum.MEDIUM,
      archived: false,
      status: TaskStatusEnum.PENDING,
    }
  });

  const onSubmit = async (data: TaskFormInputs) => {
    const formattedData = {
      ...data,
      due_date: data.due_date instanceof Date ? data.due_date : null,
    };

    const result = await taskCreate(
      formattedData.title,
      formattedData.description,
      formattedData.due_date,
      formattedData.priority,
      formattedData.attachment,
      formattedData.archived,
      formattedData.status
    );

    if (result) {
      toast.success("Task created successfully!");
      reset();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <InputLabel htmlFor="task-title" text="Title" />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="task-title"
                type="text"
                placeholder="Task Title"
                required
              />
            )}
          />
          {error?.title && <InputErrors errors={error.title} />}
        </div>

        <div>
          <InputLabel htmlFor="task-description" text="Description" />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="task-description"
                placeholder="Task Description"
                rows={4}
                className="input-field w-full rounded-md border-gray-300"
                required
              />
            )}
          />
          {error?.description && <InputErrors errors={error.description} />}
        </div>

        <div>
          <InputLabel htmlFor="task-due-date" text="Due Date" />
          <Controller
            name="due_date"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="task-due-date"
                type="date"
                value={field.value ? field.value.toISOString().split('T')[0] : ''}
                onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : null)}
              />
            )}
          />
          {error?.due_date && <InputErrors errors={error.due_date} />}
        </div>

        <div>
          <InputLabel htmlFor="task-priority" text="Priority" />
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="task-priority"
                className="input-field w-full rounded-md border-gray-300"
              >
                <option value={TaskPriorityEnum.LOW}>Low</option>
                <option value={TaskPriorityEnum.MEDIUM}>Medium</option>
                <option value={TaskPriorityEnum.HIGH}>High</option>
              </select>
            )}
          />
          {error?.priority && <InputErrors errors={error.priority} />}
        </div>

        <div>
          <InputLabel htmlFor="task-status" text="Status" />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="task-status"
                className="input-field w-full rounded-md border-gray-300"
              >
                <option value={TaskStatusEnum.PENDING}>Pending</option>
                <option value={TaskStatusEnum.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatusEnum.COMPLETED}>Completed</option>
              </select>
            )}
          />
          {error?.status && <InputErrors errors={error.status} />}
        </div>

        <SubmitButton
          loading={loading}
          text="Create Task"
          loadingText="Creating..."
        />

        {error?.general && <p className="text-red-500 mt-2">{error.general}</p>}
      </form>
    </div>
  );
};

export default CreateTask;
