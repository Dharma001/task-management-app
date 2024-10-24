import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { TaskPriorityEnum, TaskStatusEnum } from '../../../interfaces/api/taskResponse';
import { useTasks } from '../../../hooks/useTask';
import InputErrors from '../../../components/common/Form/InputErrors';
import InputLabel from '../../../components/common/Form/InputLabel';
import InputField from '../../../components/common/Form/InputField';
import SubmitButton from '../../../components/common/Form/SubmitButton';
import { fetchTaskById } from '../../../api/taskApi';
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

const Edit: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { taskUpdate, loading, error } = useTasks();
  const { control, handleSubmit, reset } = useForm<TaskFormInputs>();
  const [loadingTask, setLoadingTask] = useState(true);

  useEffect(() => {
    const loadTaskData = async () => {
      try {
        const response = await fetchTaskById(Number(taskId));
        const taskData = response.data;
        console.log(taskData); 
        reset({
          title: taskData.title,
          description: taskData.description,
          due_date: taskData.due_date ? new Date(taskData.due_date) : null,
          priority: taskData.priority,
          attachment: taskData.attachment || '',
          archived: taskData.archived || false, 
          status: taskData.status || TaskStatusEnum.PENDING 
        });
      } catch (err) {
        toast.error("Failed to fetch task data.");
      } finally {
        setLoadingTask(false);
      }
    };

    loadTaskData();
  }, [taskId, reset]);

  const onSubmit = async (data: TaskFormInputs) => {
    const formattedData = {
      ...data,
      due_date: data.due_date instanceof Date ? data.due_date : null,
    };

    try {
      const result = await taskUpdate(
        Number(taskId),
        formattedData.title,
        formattedData.description,
        formattedData.due_date,
        formattedData.priority,
        formattedData.status || TaskStatusEnum.PENDING, 
        formattedData.attachment || '', 
        formattedData.archived,
      );

      if (result) {
        toast.success("Task updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update task: " + error.message);
    }
  };

  if (loadingTask) {
    return <div>Loading task data...</div>;
  }

  return (
    <div className="edit-task-container p-4">
      <h2 className="text-2xl font-bold mb-6">Edit Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
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

        <div className="form-group">
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
                className="border rounded-lg p-2 w-full"
                required
              />
            )}
          />
          {error?.description && <InputErrors errors={error.description} />}
        </div>

        <div className="form-group">
          <InputLabel htmlFor="task-due-date" text="Due Date" />
          <Controller
            name="due_date"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="task-due-date"
                type="date"
                value={field.value ? (field.value instanceof Date ? field.value.toISOString().split('T')[0] : '') : ''}
                onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                className="border rounded-lg p-2 w-full"
              />
            )}
          />
          {error?.due_date && <InputErrors errors={error.due_date} />}
        </div>

        <div className="form-group">
          <InputLabel htmlFor="task-priority" text="Priority" />
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <select {...field} id="task-priority" className="border rounded-lg p-2 w-full">
                <option value={TaskPriorityEnum.LOW}>Low</option>
                <option value={TaskPriorityEnum.MEDIUM}>Medium</option>
                <option value={TaskPriorityEnum.HIGH}>High</option>
              </select>
            )}
          />
          {error?.priority && <InputErrors errors={error.priority} />}
        </div>

        <div className="form-group">
          <InputLabel htmlFor="task-status" text="Status" />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select {...field} id="task-status" className="border rounded-lg p-2 w-full" required>
                <option value={TaskStatusEnum.PENDING}>Pending</option>
                <option value={TaskStatusEnum.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatusEnum.COMPLETED}>Completed</option>
                <option value={TaskStatusEnum.INCOMPLETE}>Incomplete</option> {/* Added Incomplete option */}
              </select>
            )}
          />
          {error?.status && <InputErrors errors={error.status} />}
        </div>

        <div className="form-group">
          <InputLabel htmlFor="task-attachment" text="Attachment (URL)" />
          <Controller
            name="attachment"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="task-attachment"
                type="text"
                placeholder="Attachment URL (if any)"
              />
            )}
          />
          {error?.attachment && <InputErrors errors={error.attachment} />}
        </div>

        <div className="form-group">
          <InputLabel htmlFor="task-archived" text="Archived" />
          <Controller
            name="archived"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="task-archived"
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)} 
              />
            )}
          />
          {error?.archived && <InputErrors errors={error.archived} />}
        </div>

        <SubmitButton
          loading={loading}
          text="Update Task"
          loadingText="Updating..."
        />

        {error?.general && <p className="error-message text-red-500">{error.general}</p>}
      </form>
    </div>
  );
};

export default Edit;
