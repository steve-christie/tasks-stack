import { convertRouteToMenuItem, generateRoutes, IRoute } from "./RoutingUtil";
import { ItemType, SubMenuType } from "antd/es/menu/hooks/useItems";
import { describe, test, expect } from "vitest";

const singleRoute = {
  link: "foo",
  label: "Foo",
  component: "",
  icon: "",
};

const nestedRoutes: IRoute[] = [
  {
    link: "bar",
    label: "Bar",
    component: "",
    icon: "",
  },
  {
    link: "aaa",
    label: "AAA",
    component: "",
    icon: "",
  },
];

const routeWithGroupLabel: IRoute = {
  link: "bar",
  label: "Bar",
  icon: "",
};

describe("Route tests", () => {
  test("IRoute objects are converted into route elements", () => {
    const routeElements = generateRoutes([singleRoute]);
    expect(routeElements).toHaveLength(1);
    expect(routeElements[0].props.path).toBe("/foo");
  });

  test("A single route converts into menu item", () => {
    const menuItem: ItemType = convertRouteToMenuItem("dark", singleRoute, []);
    expect(menuItem?.key).toBe("foo");
    expect((menuItem as never)["icon"]).toBe(singleRoute.icon);
    expect((menuItem as never)["label"]["props"]["to"]).toBe(
      `/${singleRoute.link}`
    );
    expect((menuItem as never)["label"]["props"]["children"]).toBe(
      singleRoute.label
    );
  });

  test("When classname is provided for child elements, it is set for the popupClassName key", () => {
    const menuItem = convertRouteToMenuItem(
      "dark",
      routeWithGroupLabel,
      [],
      "foobar"
    );
    expect((menuItem as SubMenuType).popupClassName).toBe("foobar");
  });
});
