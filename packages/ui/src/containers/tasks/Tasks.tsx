import TaskPage from "../../components/tasks/TaskPage";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../state/Store";
import hooks from "../../state/hooks";
import { useEffect, useState } from "react";
import { taskActions } from "../../state/tasks/TaskActions";
import { ITask } from "../../state/tasks/TaskReducer";

export default () => {
  const dispatch = hooks.useAppDispatch();

  const [sortByField, setSortByField] = useState<string>("assignedTo");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [includeCompleted, setIncludeCompleted] = useState<boolean>(false);

  const { taskStates, fetchingTasks, fetchingTasksError } = useSelector(
    (state: ApplicationState) => state.tasks
  );

  useEffect(() => {
    let sortBy;
    if (sortByField && sortDirection) {
      sortBy = `${sortByField}::${sortDirection}`;
    }
    dispatch(
      taskActions.getTasks.request({
        includeCompleted,
        sortBy,
      })
    );
  }, [sortByField, sortDirection, includeCompleted]);

  const handleUpdate = (task: Partial<ITask>) => {
    dispatch(taskActions.updateTask.request(task));
  };

  const handleDelete = (taskId?: string) => {
    if (taskId) {
      dispatch(taskActions.deleteTask.request(taskId));
    }
  };

  const handleCreate = (newTask: Partial<ITask>) => {
    dispatch(taskActions.createTask.request(newTask));
  };

  return (
    <TaskPage
      fetchingTasks={fetchingTasks}
      fetchingTasksError={fetchingTasksError}
      taskStates={taskStates}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      handleCreate={handleCreate}
      sortDirection={sortDirection}
      sortByField={sortByField}
      includeCompleted={includeCompleted}
      setIncludeCompleted={setIncludeCompleted}
      setSortByField={setSortByField}
      setSortDirection={setSortDirection}
    />
  );
};
