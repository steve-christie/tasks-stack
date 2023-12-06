import TaskPage from "../../components/tasks/TaskPage";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../state/Store";
import hooks from "../../state/hooks";
import {useEffect, useState} from "react";
import {taskActions} from "../../state/tasks/TaskActions";
import {ITask} from "../../state/tasks/TaskReducer";

export default () => {

    const dispatch = hooks.useAppDispatch();

    useEffect(() => {
        dispatch(taskActions.getTasks.request({includeCompleted: false}))
    }, [])

    const [sortByField, setSortByField] = useState<{value: string, label: string}>({value: "assignedTo", label: "Assignee"})
    const [sortDirection, setSortDirection] = useState<{value: string, label: string}>(  {value: "asc", label: "Ascending"})
    const [includeCompleted, setIncludeCompleted] = useState<boolean>(false)

    const {taskStates} = useSelector((state: ApplicationState) => state.tasks);

    useEffect(() => {
        let sortBy;
// eslint-disable-next-line no-console
        console.log(sortByField?.value, sortDirection?.value)
        if (sortByField?.value && sortDirection?.value) {
            sortBy = `${sortByField.value}::${sortDirection.value}`
        }
// eslint-disable-next-line no-console
        console.log(sortBy)
        dispatch(taskActions.getTasks.request({
            includeCompleted,
            sortBy
        }))
    }, [sortByField, sortDirection, includeCompleted])

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
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            handleCreate={handleCreate}
            sortDirection={sortDirection}
            sortByField={sortByField}
            includeCompleted={includeCompleted}
            setIncludeCompleted={setIncludeCompleted}
            setSortByField={setSortByField}
            setSortDirection={setSortDirection}
        />
    )
}