import React from "react";
import {IRoute} from "./RoutingUtil";
import Tasks from "../pages/tasks/Tasks";
import Landing from "../pages/landing/Landing";

const menuRoutes: IRoute[] = [{
    link: "landing",
    label: "Landing",
    component: <Landing/>
}, {
    link: "tasks",
    label: "Tasks",
    component: <Tasks/>,
},
];

export {menuRoutes};
