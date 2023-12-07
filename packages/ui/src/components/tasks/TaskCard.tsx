import {Button, Card, Form, FormInstance, Modal, Space, Spin, Tag, Tooltip, Typography} from "antd";
import styles from "./Task.module.less";
import {EditOutlined, MinusCircleOutlined} from "@ant-design/icons";
import React from "react";
import {ITask} from "../../state/tasks/TaskReducer";
import TaskEditFields from "../forms/TaskEditFields";
import dayjs from "dayjs";
import UserBadge from "../badges/user-badge/UserBadge";

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
                    <div className={styles.cardWrapper}>
                        <div>
                            <UserBadge name={props.task.assignedTo}/>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardTitleRow}>
                                <Typography.Title
                                    level={5}
                                    className={styles.cardHeader}
                                >
                                    {props.task.title}
                                </Typography.Title>
                            </div>
                            <div>
                                <Tag color={"purple"}>{props.task.status}</Tag>
                                <Tag color={"cyan"}>{props.task.assignedTo}</Tag>
                                <Tag color={"green"}>
                                    Created: {dayjs(props.task.createdDate).format("D MMM YYYY")}
                                </Tag>
                                <Tag color={"volcano"}>
                                    Due: {dayjs(props.task.dueDate).format("D MMM YYYY")}
                                </Tag>
                                {props.task.completedDate && (
                                    <Tag color={"geekblue"}>
                                        Completed: {dayjs(props.task.completedDate).format("D MMM YYYY")}
                                    </Tag>)}
                            </div>
                        </div>
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
                </Space>
            )}
            <Modal
                title={"Edit task"}
                open={props.editTaskModalVisible}
                onOk={() => props.form.submit()}
                onCancel={() => props.setEditTaskModalVisible(false)}
                destroyOnClose
            >
                <Form onFinish={() => props.handleEditWIthForm()} form={props.form} layout="vertical" initialValues={{
                    ...props.task,
                    dueDate: dayjs(props.task.dueDate),
                    completedDate: props.task.completedDate ? dayjs(props.task.completedDate) : undefined
                }}>
                    <TaskEditFields form={props.form}/>
                </Form>
            </Modal>
        </Card>
    )
}