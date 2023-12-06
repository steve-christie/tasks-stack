import {Page} from "../page/Page";
import {Button, Form, Modal } from "antd";
import TaskList from "../../components/tasks/TaskList";
import {useState} from "react";
import {ITask, ITaskState} from "../../state/tasks/TaskReducer";
import TaskCreateFields from "../modals/TaskCreateFields";

export interface ITaskPageProps {
    taskStates: ITaskState[]
    handleCreate: (newTask: Partial<ITask>) => void;
    onDelete: (taskId?: string) => void;
    onUpdate: (task: Partial<ITask>) => void;
}

export default (props: ITaskPageProps) => {

    const [createTaskModalVisible, setCreateTaskModalVisible] = useState<boolean>(false)
    const [form] = Form.useForm()

    const handleCreateWIthForm = () => {
        const formValues = form.getFieldsValue();

        props.handleCreate({
            ...formValues,
            dueDate: formValues.dueDate.toISOString()
        })

        setCreateTaskModalVisible(false)
    }

    return (
        <Page>
            <TaskList
                taskStates={props.taskStates}
                onDelete={props.onDelete}
                onUpdate={props.onUpdate}
            />
            <div>
                <Button type={"primary"} onClick={() => setCreateTaskModalVisible(true)}>
                    Add Task
                </Button>
                <Modal
                    title={"Create task"}
                    open={createTaskModalVisible}
                    onOk={() => handleCreateWIthForm()}
                    onCancel={() => setCreateTaskModalVisible(false)}
                >
                    <Form form={form} layout="vertical" >
                       <TaskCreateFields/>
                    </Form>
                </Modal>
            </div>
        </Page>
    )
}