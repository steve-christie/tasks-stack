import {ITask} from "model";
import Task from "./Task";
import styles from "./Task.module.less";
import {ITaskState} from "../../state/tasks/TaskReducer";

export interface ITaskListProps {
    taskStates: ITaskState[]
    onDelete: (taskId?: string) => void;
    onUpdate: (task: Partial<ITask>) => void;
    onCancel: (taskId?: string) => void;
}

export default (props: ITaskListProps) => {
return (
    <div className={styles.taskList}>
        {props.taskStates.map(taskState => (
            <Task
                  onDelete={props.onDelete}
                  onUpdate={props.onUpdate}
                  onCancel={props.onCancel}
                  {...taskState}
            />
        ))}
    </div>
)
}