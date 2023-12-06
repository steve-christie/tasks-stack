import {Page} from "../page/Page";
import {Button, Divider, Form, Modal, Select, Switch} from "antd";
import TaskList from "../../components/tasks/TaskList";
import React, {useState} from "react";
import {ITask, ITaskState} from "../../state/tasks/TaskReducer";
import TaskCreateFields from "../forms/TaskCreateFields";
import styles from "./Task.module.less"

export interface ITaskPageProps {
    taskStates: ITaskState[]
    handleCreate: (newTask: Partial<ITask>) => void;
    onDelete: (taskId?: string) => void;
    onUpdate: (task: Partial<ITask>) => void;

    sortByField?: {value: string, label: string};
    setSortByField: (value: React.SetStateAction<{value: string, label: string}>) => void;
    sortDirection?: {value: string, label: string};
    setSortDirection: (value: React.SetStateAction<{value: string, label: string}>) => void;
    includeCompleted: boolean;
    setIncludeCompleted: (value: React.SetStateAction<boolean>) => void;
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
            <div className={styles.taskListFilters}>
                <div>
                    <Select
                        defaultValue={props.sortByField}
                        onSelect={(event) => {
                            // eslint-disable-next-line no-console
                            console.log(event)
                            props.setSortByField(event)
                        }}
                        options={[
                            {value: "assignedTo", label: "Assignee"},
                            {value: "createdDate", label: "Created Date"},
                            {value: "dueDate", label: "Due Date"}
                        ]}
                    />
                    <Divider type={"vertical"}/>
                    <Select
                        defaultValue={{value: "asc", label: "Ascending"}}
                        onChange={(event) => props.setSortDirection(event)}
                        options={[
                            {value: "asc", label: "Ascending"},
                            {value: "desc", label: "Descending"}
                        ]}
                    />
                </div>
                <Switch
                    checkedChildren={"Include Completed"}
                    unCheckedChildren={"Include Completed"}
                    onChange={(event) => props.setIncludeCompleted(event.valueOf())}
                />
            </div>
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