import Task from "./Task";
import styles from "./Task.module.less";
import {ITask, ITaskState} from "../../state/tasks/TaskReducer";

export interface ITaskListProps {
    taskStates: ITaskState[]
    onDelete: (taskId?: string) => void;
    onUpdate: (task: Partial<ITask>) => void;
}

export default (props: ITaskListProps) => {

    return (
        <div className={styles.taskList}>
            {props.taskStates.map(taskState => (
                <Task
                    key={taskState.task.taskId}
                    onDelete={props.onDelete}
                    onUpdate={props.onUpdate}
                    {...taskState}
                />
            ))}
        </div>
    )
}