import {ITask} from "model";
import Task from "./Task";
import styles from "./Task.module.less";

export interface ITaskListProps {
    tasks: ITask[]
    onDelete: (taskId: string) => void;
    onUpdate: (taskId: string, title: string, content: string) => void;
    onCancel: (taskId: string) => void;
}

export default (props: ITaskListProps) => {
return (
    <div className={styles.taskList}>
        {props.tasks.map(task => (
            <Task task={task}
                  onDelete={props.onDelete}
                  onUpdate={props.onUpdate}
                  onCancel={props.onCancel}
            />
        ))}
    </div>
)
}