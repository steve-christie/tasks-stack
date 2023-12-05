import {ITask} from "model";

const fetchTasks = async (): Promise<ITask[]> => {
    //TODO - Replace with API integration

    await setTimeout(() => {
        //Wait for loading
    }, 2000)

    return Promise.resolve([
        {
            title: "Task title 1!",
            content: ""
        }, {
            title: "Task title 2!",
            content: "foo",
        }, {
            title: "Task title 3!",
            content: "bar",
        }
    ])
}

export const taskService = {
    fetchTasks
}