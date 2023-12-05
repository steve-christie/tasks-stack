import React from "react";
import {IRoute} from "./RoutingUtil";
import {LineChartOutlined, HomeOutlined} from "@ant-design/icons";
import Tasks from "../pages/tasks/Tasks";
import Landing from "../pages/landing/Landing";

const iconFill = "#D0D5DD";

const landingRoute: IRoute = {
	link: "landing",
	label: "Tasks Stack UI",
	icon: <HomeOutlined color={iconFill} style={{ fontSize: 24, color: "white" }} />,
	component: <Landing />
};

const menuRoutes: IRoute[] = [
	{
		link: "tasks",
		label: "Tasks",
		icon: <LineChartOutlined color={iconFill} style={{ fontSize: 24, color: "white" }} />,
		component: <Tasks />,
	},
];

export { landingRoute, menuRoutes };
