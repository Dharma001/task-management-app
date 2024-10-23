import React, { useEffect, useState } from "react";
import Table from "../../../components/common/Form/Table";
import ButtonComponent from "../../../components/common/Form/Button";
import { fetchTasks, deleteTask } from '../../../api/taskApi';
import { TaskPriorityEnum, TaskStatusEnum } from "../../../interfaces/api/taskResponse";

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
}

const Index: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<TaskStatusEnum | undefined>(undefined);
  const [priorityFilter, setPriorityFilter] = useState<TaskPriorityEnum | undefined>(undefined);

  const headers = [
    "SN",
    "Title",
    "Description",
    "Status",
    "Priority",
    "Actions",
  ];

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      console.log('From Date:', fromDate);
      console.log('To Date:', toDate);

      try {
        const fetchedTasks = await fetchTasks(fromDate, toDate, statusFilter, priorityFilter);
        setTasks(fetchedTasks.data);
        setFilteredTasks(fetchedTasks.data);
      } catch {
        setError("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, [fromDate, toDate, statusFilter, priorityFilter]);


  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
        setFilteredTasks(filteredTasks.filter(task => task.id !== id));
      } catch {
        setError("Error deleting task");
      }
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'from' | 'to') => {
    const dateValue = event.target.value;
    if (dateValue) {
      const date = new Date(dateValue);
      date.setHours(0, 0, 0, 0);

      if (type === 'from') {
        setFromDate(date);
      } else {
        setToDate(date);
      }
    } else {
      if (type === 'from') {
        setFromDate(undefined);
      } else {
        setToDate(undefined);
      }
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value as TaskStatusEnum | "";
    setStatusFilter(selectedStatus === "" ? undefined : selectedStatus);
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPriority = event.target.value as TaskPriorityEnum | "";
    setPriorityFilter(selectedPriority === "" ? undefined : selectedPriority);
  };


  const renderTaskRow = (item: Task, index: number) => (
    <tr key={item.id}>
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{item.title}</td>
      <td className="p-2">{item.description}</td>
      <td className="p-2">{item.status}</td>
      <td className="p-2">{item.priority}</td>
      <td className="p-2 flex items-center justify-start gap-3">
        <ButtonComponent
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
          label="Edit"
          routeName={`/tasks/${item.id}`}
          type="edit"
        />
        <ButtonComponent
          icon={ 
            <svg xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5"
            viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9s9-4.038 9-9s-4.037-9-9-9m0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7s7 3.14 7 7s-3.141 7-7 7m.707-7l2.646-2.646a.5.5 0 0 0 0-.707a.5.5 0 0 0-.707 0L12 11.293L9.354 8.646a.5.5 0 0 0-.707.707L11.293 12l-2.646 2.646a.5.5 0 0 0 .707.708L12 12.707l2.646 2.646a.5.5 0 1 0 .708-.706z" />
            </svg>
          }
          label="Delete"
          onClick={() => handleDelete(item.id)}
          type="delete"
        />
      </td>
    </tr>
  );

  return (
    <div className="p-4 space-y-5">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">From Date:</label>
          <input
            type="date"
            onChange={(e) => handleDateChange(e, 'from')}
            className="border w-full border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">To Date:</label>
          <input
            type="date"
            onChange={(e) => handleDateChange(e, 'to')}
            className="border w-full border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
        </div>
      </div>
      <div className="mb-4 flex justify-end space-x-4">
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            onChange={handleStatusChange}
            className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="">All</option>
            {Object.values(TaskStatusEnum).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Priority:</label>
          <select
            onChange={handlePriorityChange}
            className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="">All</option>
            {Object.values(TaskPriorityEnum).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ButtonComponent
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        }
        label="Create"
        routeName={`/tasks/create`}
        type="create"
      />

      {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <Table
          headers={headers}
          items={filteredTasks}
          renderRow={renderTaskRow}
        />
      )}
    </div>
  );
};

export default Index;
