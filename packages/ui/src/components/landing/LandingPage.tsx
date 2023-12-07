import { Page } from "../page/Page";
import { Button, List, Switch, Tag, Typography } from "antd";
import React from "react";
import { EditOutlined, MinusCircleOutlined } from "@ant-design/icons";
import sampleTask from "../../assets/sampleTask.png";
import overdueTask from "../../assets/overdueTask.png";

export default () => {
  return (
    <Page>
      <Typography.Title level={3}>Tasks Stack App</Typography.Title>
      <Typography.Title level={5}>Task Anatomy</Typography.Title>
      <img src={sampleTask} alt="" />
      <Typography.Text>
        This tasks App offers the ability to create and manage your task list.
        To begin, head over to{" "}
        <Typography.Link href={"/#/tasks"}>Tasks</Typography.Link>.
      </Typography.Text>
      <Typography.Text>
        Each task is made up of a few key pieces of information:
      </Typography.Text>
      <List bordered={true}>
        <List.Item>Title</List.Item>
        <List.Item>
          <Tag color={"purple"}>status</Tag>
        </List.Item>
        <List.Item>
          <Tag color={"cyan"}>Assigned To</Tag>
        </List.Item>
        <List.Item>
          <Tag color={"green"}>Creation Date</Tag>
        </List.Item>
        <List.Item>
          <Tag color={"volcano"}>Due Date</Tag>
        </List.Item>
        <List.Item>
          <Tag color={"geekblue"}>Completion Date</Tag>
        </List.Item>
      </List>
      <Typography.Title level={5}>Sorting/Filtering</Typography.Title>
      <Typography.Text>
        By default, completed tasks are excluded from the list. However, if you
        would like access to these an{" "}
        <Switch
          checkedChildren={"Include Completed"}
          unCheckedChildren={"Include Completed"}
        />{" "}
        toggle is available.
      </Typography.Text>
      <Typography.Text>
        Tasks are sorted based on their assignee's, this can be changed to
        either Creation Date or Due Date, as well as choosing between the sort
        direction.
      </Typography.Text>
      <Typography.Title level={5}>Editing</Typography.Title>
      <Typography.Text>
        Each task can be updated by clicking the
        <Button icon={<EditOutlined />} type={"link"} />
        icon which opens up a form to make changes.
      </Typography.Text>
      <Typography.Title level={5}>Deleting</Typography.Title>
      <Typography.Text>
        Each task can be deleted by clicking the
        <Button icon={<MinusCircleOutlined />} danger type={"link"} />
        icon.
      </Typography.Text>
      <Typography.Title level={5}>Overdue Tasks</Typography.Title>

      <img src={overdueTask} alt="" />
    </Page>
  );
};
