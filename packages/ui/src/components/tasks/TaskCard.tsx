import {Button, Card, Form, FormInstance, Modal, Space, Spin, Tag, Tooltip, Typography} from "antd";
import styles from "./Task.module.less";
import {EditOutlined, MinusCircleOutlined} from "@ant-design/icons";
import React from "react";
import {ITask} from "../../state/tasks/TaskReducer";
import TaskEditFields from "../modals/TaskEditFields";
import dayjs from "dayjs";

export interface ITaskCardProps {
    task: ITask;
    changeInProgress: boolean;
    editTaskModalVisible: boolean;
    setEditTaskModalVisible: (value: React.SetStateAction<boolean>) => void;
    handleEditWIthForm: () => void;
    onDelete: (taskId?: string) => void;
    onUpdate: (task: Partial<ITask>) => void;
    form: FormInstance
}

export default (props: ITaskCardProps) => {

    return (
        <Card>
            {props.changeInProgress ? (
                <Spin/>
            ) : (
                <Space direction="vertical" size={16} style={{width: "100%"}}>
                    <div className={styles.cardTitleRow}>
                        <Typography.Title level={3}>{props.task.title}</Typography.Title>
                        <div className={styles.cardTitleActors}>
                            <Tooltip title={"Edit"}>
                                <Button icon={<EditOutlined/>} type={"link"}
                                        onClick={() => props.setEditTaskModalVisible(true)}/>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <Button
                                    icon={<MinusCircleOutlined/>}
                                    danger
                                    type={"link"}
                                    onClick={() => props.onDelete(props.task.taskId)}
                                />
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <Tag>{props.task.status}</Tag>
                        <Tag>Created: {dayjs(props.task.createdDate).format("DD MM YYYY")}</Tag>
                        <Tag>Due: {dayjs(props.task.dueDate).format("DD MM YYYY")}</Tag>
                    </div>
                </Space>
            )}
            <Modal
                title={"Edit task"}
                open={props.editTaskModalVisible}
                onOk={() => props.handleEditWIthForm()}
                onCancel={() => props.setEditTaskModalVisible(false)}
            >
                <Form form={props.form} layout="vertical" initialValues={{
                    ...props.task,
                    dueDate: dayjs(props.task.dueDate),
                    completedDate: props.task.completedDate ? dayjs(props.task.completedDate) : undefined
                }}>
                    <TaskEditFields/>
                </Form>
            </Modal>
        </Card>
    )
}