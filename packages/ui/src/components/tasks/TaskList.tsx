import Task from "./Task";
import styles from "./Task.module.less";
import { ITask, ITaskState } from "../../state/tasks/TaskReducer";
import { Typography } from "antd";

export interface ITaskListProps {
  taskStates: ITaskState[];
  onDelete: (taskId?: string) => void;
  onUpdate: (task: Partial<ITask>) => void;
}

export default (props: ITaskListProps) => {
  return (
    <div className={styles.taskList}>
      {props.taskStates.length === 0 && (
        <Typography.Text>
          No tasks found, click 'Add Task' to get started
        </Typography.Text>
      )}
      {props.taskStates.map((taskState) => (
        <Task
          key={taskState.task.taskId}
          onDelete={props.onDelete}
          onUpdate={props.onUpdate}
          {...taskState}
        />
      ))}
    </div>
  );
};
