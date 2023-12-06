import {Page} from "../page/Page";
import {Button, Form, Input, Modal} from "antd";
import TaskList from "../../components/tasks/TaskList";
import {ITask} from "model";
import {useState} from "react";
import {ITaskState} from "../../state/tasks/TaskReducer";

export interface ITaskPageProps {
    taskStates: ITaskState[]
    handleCreate: (newTask: Partial<ITask>) => void;
    onDelete: (taskId?: string) => void;
    onUpdate: (task: Partial<ITask>) => void;
    onCancel: (taskId?: string) => void;
}

export default (props: ITaskPageProps) => {

    const [createTaskModalVisible, setCreateTaskModalVisible] = useState<boolean>(false)
    const [form] = Form.useForm()

    const handleCreateWIthForm = () => {
        const title = form.getFieldValue("title")

        props.handleCreate({
          title,
        })

        setCreateTaskModalVisible(false)
    }

    return (
        <Page>
            <TaskList
                taskStates={props.taskStates}
                onDelete={props.onDelete}
                onUpdate={props.onUpdate}
                onCancel={props.onCancel}
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
                    <Form form={form}>
                        <Form.Item name={"title"}>
                            <Input placeholder={"Enter task title"}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Page>
    )
}