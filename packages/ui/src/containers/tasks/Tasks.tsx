import TaskPage from "../../components/tasks/TaskPage";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../state/Store";
import hooks from "../../state/hooks";
import {useEffect} from "react";
import {taskActions} from "../../state/tasks/TaskActions";
import {ITask} from "model";

export default () => {

    const dispatch = hooks.useAppDispatch();

    useEffect(() => {
        dispatch(taskActions.getTasks.request())
    }, [])

    const {taskStates} = useSelector((state: ApplicationState) => state.tasks);

    const handleCancel = (taskId?: string) => {
        //TODO Dispatch cancel action
    };

    const handleUpdate = (task: Partial<ITask>) => {
        dispatch(taskActions.updateTask.request(task))
    };

    const handleDelete = (taskId?: string) => {
        if (taskId) {
            dispatch(taskActions.deleteTask.request(taskId))
        }
    }

    const handleCreate = (newTask: Partial<ITask>) => {
        dispatch(taskActions.createTask.request(newTask))
    }

    return (
        <TaskPage
            taskStates={taskStates}
            onCancel={handleCancel}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            handleCreate={handleCreate}
        />
    )
}