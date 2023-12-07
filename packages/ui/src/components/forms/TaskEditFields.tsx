import { DatePicker, Form, FormInstance, Radio } from "antd";
import TaskCreateFields from "./TaskCreateFields";

export default (props: { form: FormInstance }) => {
  return (
    <>
      <TaskCreateFields />
      <Form.Item
        name={"status"}
        label={"Status"}
        rules={[
          {
            required: true,
            message: "Please provide a task status",
          },
        ]}
      >
        <Radio.Group>
          <Radio.Button value="To Do">To Do</Radio.Button>
          <Radio.Button value="In Progress">In Progress</Radio.Button>
          <Radio.Button value="Complete">Completed</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Form.Item
            name={"completedDate"}
            label={"Completed Date"}
            required={props.form.getFieldValue("status") === "Complete"}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("status") === "Complete" && !value) {
                    return Promise.reject("Please enter a completion date");
                  } else return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker
              disabled={!(props.form.getFieldValue("status") === "Complete")}
              placeholder={"Select completed date"}
            />
          </Form.Item>
        )}
      </Form.Item>
    </>
  );
};
