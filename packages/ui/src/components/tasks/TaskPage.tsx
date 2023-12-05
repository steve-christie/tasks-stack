import {Page} from "../page/Page";
import {Button} from "antd";
import TaskList from "../../components/tasks/TaskList";
import {ITask} from "model";

export interface ITaskPageProps {
    tasks: ITask[]
    onDelete: (taskId: string) => void;
    onUpdate: (taskId: string, title: string, content: string) => void;
    onCancel: (taskId: string) => void;
}

export default (props: ITaskPageProps) => {
    return (
        <Page>
            <TaskList
                tasks={props.tasks}
                onDelete={props.onDelete}
                onUpdate={props.onUpdate}
                onCancel={props.onCancel}
            />
            <Button type={"primary"}>Add Task</Button>
        </Page>
    )
}