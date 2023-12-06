import {Badge, Form} from "antd";
import {useMemo, useState} from "react";
import {ITask, ITaskState} from "../../state/tasks/TaskReducer";
import TaskCard from "./TaskCard";

export interface ITaskProps extends ITaskState {
    task: ITask,
    onDelete: (taskId?: string) => void;
    onUpdate: (task: Partial<ITask>) => void;
}

export default (props: ITaskProps) => {

    const [editTaskModalVisible, setEditTaskModalVisible] = useState<boolean>(false)
    const [form] = Form.useForm()

    const handleEditWIthForm = () => {
        const formValues = form.getFieldsValue();

        props.onUpdate({
            ...formValues,
            taskId: props.task.taskId,
            dueDate: formValues.dueDate.toISOString(),
            completedDate: formValues.completedDate ? formValues.completedDate.toISOString() : undefined
        })

        setEditTaskModalVisible(false)
    }

    const taskIsOverdue = useMemo(() => {
        if (props.task.status === "Complete") {
            return false
        } else return props.task.dueDate < new Date().toISOString()
    }, [props.task])

    return taskIsOverdue ? (
        <Badge.Ribbon color={"red"} text={"Overdue"}>
            <TaskCard
                task={props.task}
                changeInProgress={props.updatingTask || props.deletingTask}
                editTaskModalVisible={editTaskModalVisible}
                setEditTaskModalVisible={setEditTaskModalVisible}
                onDelete={props.onDelete}
                onUpdate={props.onUpdate}
                handleEditWIthForm={handleEditWIthForm}
                form={form}
            />
        </Badge.Ribbon>
    ) : (
        <TaskCard
            task={props.task}
            changeInProgress={props.updatingTask || props.deletingTask}
            editTaskModalVisible={editTaskModalVisible}
            setEditTaskModalVisible={setEditTaskModalVisible}
            onDelete={props.onDelete}
            onUpdate={props.onUpdate}
            handleEditWIthForm={handleEditWIthForm}
            form={form}/>
    )

}