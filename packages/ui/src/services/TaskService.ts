import {ITask} from "model";

const fetchTasks = async (): Promise<ITask[]> => {
    //TODO - Replace with API integration

    await setTimeout(() => {
        //Wait for loading
    }, 2000)

    return Promise.resolve([
        {
            title: "Task title 1!"
        }, {
            title: "Task title 2!"
        }, {
            title: "Task title 3!"
        }
    ])
}

export const taskService = {
    fetchTasks
}