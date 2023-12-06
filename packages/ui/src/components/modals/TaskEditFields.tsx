import {DatePicker, Form, Input, Radio} from "antd";
import TaskCreateFields from "./TaskCreateFields";

export default () => {
    return  (
        <>
            <TaskCreateFields/>
            <Form.Item name={"status"} label={"Status"}>
                <Radio.Group>
                    <Radio.Button value="To Do">To Do</Radio.Button>
                    <Radio.Button value="In Progress">In Progress</Radio.Button>
                    <Radio.Button value="Completed">Completed</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item name={"completedDate"} label={"Completed Date"} required>
                <DatePicker placeholder={"Select completed date"}/>
            </Form.Item>
        </>
    )
}