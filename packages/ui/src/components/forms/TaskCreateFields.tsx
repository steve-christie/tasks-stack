import {DatePicker, Form, Input, Select} from "antd";

const userOptions = [
    {value: "Amos Burton"},
    {value: "Alex Kamal"},
    {value: "Bobbie Draper"},
    {value: "Camina Drummer"},
    {value: "Chrisjen Avasarala"},
    {value: "Fred Johnson"},
    {value: "Naomi Nagata"}]

export default () => {

    return  (
        <>
            <Form.Item name={"title"} label={"Title"} required rules={[{
                required: true,
                message: "Please enter a task title"
            }]}>
                <Input placeholder={"Enter task title"}/>
            </Form.Item>
            <Form.Item name={"assignedTo"} label={"Assigned To"} required rules={[{
                    required: true,
                    message: "Please enter a task assignee"
                }]}>
                <Select placeholder={"Select task assignee"}
                        options={userOptions}
                />
            </Form.Item>
            <Form.Item name={"dueDate"} label={"Due Date"} required rules={[{
                required: true,
                message: "Please enter a due date"
            }]}>
                <DatePicker placeholder={"Select due date"}/>
            </Form.Item>

        </>
    )
}