import React from "react";
import { Link, Route } from "react-router-dom";
import { MenuTheme } from "antd";
import { ItemType, SubMenuType } from "antd/es/menu/hooks/useItems";

interface IRoute {
  link: string;
  label: string;
  icon?: React.ReactNode;
  component?: React.ReactNode;
}

const generateRoutes = (routes: IRoute[]) => {
  const routeElements: React.ReactElement[] = [];
  routes.map((r) => buildRoute(r, routeElements, []));
  return routeElements;
};

const buildRoute = (
  route: IRoute,
  routes: React.ReactElement[],
  links: string[]
) => {
  links.push(route.link);
  const path = () => {
    return `/${links.join("/")}`;
  };

  routes.push(
    <Route key={route.link} path={path()} element={route.component} />
  );
};

const convertRouteToMenuItem = (
  theme: MenuTheme,
  route: IRoute,
  links: string[],
  childClassName?: string
): ItemType | SubMenuType => {
  links.push(route.link);
  const path = `/${links.join("/")}`;
  const label = <Link to={path}>{route.label}</Link>;

  const item: ItemType | SubMenuType = {
    label,
    key: route.link,
    icon: route.icon,
  };

  if (childClassName) {
    (item as SubMenuType).popupClassName = childClassName;
  }

  return item;
};

export type { IRoute };
export { generateRoutes, convertRouteToMenuItem };
