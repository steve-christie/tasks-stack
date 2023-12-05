import TaskPage from "../../components/tasks/TaskPage";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../state/Store";
import hooks from "../../state/hooks";
import {useEffect} from "react";
import {taskActions} from "../../state/tasks/TaskActions";

export default () => {

    const dispatch = hooks.useAppDispatch();

    useEffect(() => {
        dispatch(taskActions.getTasks.request())
    }, [])

    const {tasks} = useSelector((state: ApplicationState) => state.tasks);

    const handleCancel = (taskId: string) => {
        //TODO Dispatch cancel action
    };

    const handleUpdate = (taskId: string, title: string, content: string) => {
        //TODO Dispatch update action
    };

    const handleDeleteSection = (taskId: string) => {
        //TODO Dispatch delete action
    }

    return (
        <TaskPage
            tasks={tasks}
            onCancel={handleCancel}
            onUpdate={handleUpdate}
            onDelete={handleDeleteSection}
        />
    )
}