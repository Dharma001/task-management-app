import React from "react";
import TableComponent from "../../../components/common/Form/Table";
import ButtonComponent from "../../../components/common/Form/Button";

interface Task {
  id: number;
  title: string;
  description: string;
}

const tasks: Task[] = [
  { id: 1, title: "Task 1", description: "Description 1" },
  { id: 2, title: "Task 2", description: "Description 2" },
];

const Index: React.FC = () => {
  const headers = ["SN", "Title", "Description", "Actions"];

  return (
    <>
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
    <TableComponent headers={headers} items={{ data: tasks }}>
      {(item: Task) => (
        <>
          <td className="p-2 1.5rem">{item.title}</td>
          <td className="p-2 1.5rem">{item.description}</td>
          <td className="p-2 1.5rem flex items-center justify-start">
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
          </td>
        </>
      )}
    </TableComponent>
    </>
  );
};

export default Index;
