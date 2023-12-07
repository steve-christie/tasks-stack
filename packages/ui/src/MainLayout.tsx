import { Layout, Menu } from "antd";
import { menuRoutes } from "./config/Routes";
import { convertRouteToMenuItem, generateRoutes } from "./config/RoutingUtil";
import { Navigate, Route, Routes } from "react-router";
import React from "react";

const { Header } = Layout;

const menuTheme = "dark";

export default () => {
  const mainMenuItems = menuRoutes.map((route) =>
    convertRouteToMenuItem(menuTheme, route, [])
  );

  return (
    <Layout className="layout" style={{ height: "100%" }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={mainMenuItems}
        />
      </Header>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        {generateRoutes(menuRoutes)}
      </Routes>
    </Layout>
  );
};
