import {ITask} from "model";
import {Button, Card, Input, Space, Spin, Tooltip, Typography} from "antd";
import styles from "./Task.module.less";
import {CheckCircleOutlined, CloseCircleOutlined, EditOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {useCallback, useEffect, useState} from "react";
import {ITaskState} from "../../state/tasks/TaskReducer";

export interface ITaskProps extends ITaskState {
    task: ITask,
    onDelete: (taskId?: string) => void;
    onUpdate: (task: Partial<ITask>) => void;
    onCancel: (taskId?: string) => void;
}

export default (props: ITaskProps) => {

    const [title, setTitle] = useState<string>(props.task.title);

    useEffect(() => {
        setTitle(props.task.title);
    }, [props.task]);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle);
    };

    const handleUpdate = useCallback(() => {
        props.onUpdate({
            taskId: props.task.taskId,
            title
        });
    }, [title]);

    return (
        <Card>
            {props.updatingTask ? (
                <Spin/>
            ) : (
                <Space direction="vertical" size={16} style={{width: "100%"}}>
                    <div className={styles.cardTitleRow}>
                        {isEditing ? (
                            <Input
                                className={styles.cardDiv}
                                type="text"
                                defaultValue={title}
                                onChange={(event) => handleTitleChange(event.target.value)}
                                placeholder="Enter task title..."
                            />
                        ) : (
                            <Typography.Title level={3}>{props.task.title}</Typography.Title>
                        )}
                        <div className={styles.cardTitleActors}>
                            <Tooltip title={"Edit"}>
                                <Button icon={<EditOutlined/>} type={"link"} onClick={() => setIsEditing(true)}
                                        disabled={isEditing}/>
                            </Tooltip>
                            <Tooltip title={"Save"}>
                                <Button
                                    icon={<CheckCircleOutlined/>}
                                    type={"link"}
                                    onClick={() => {
                                        handleUpdate();
                                        setIsEditing(false);
                                    }}
                                    disabled={!isEditing}
                                />
                            </Tooltip>
                            <Tooltip title={"Cancel"}>
                                <Button
                                    icon={<CloseCircleOutlined/>}
                                    type={"link"}
                                    danger
                                    onClick={() => {
                                        props.onCancel(props.task.taskId);
                                        setIsEditing(false);
                                    }}
                                    disabled={!isEditing}
                                />
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
        </Card>
    )
}