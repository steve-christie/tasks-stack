import {Layout, Menu} from "antd";
import {menuRoutes} from "./config/Routes";
import {convertRouteToMenuItem, generateRoutes} from "./config/RoutingUtil";
import {Routes} from "react-router";

const {Header, Footer} = Layout;

const menuTheme = "dark";

export default () => {

    const mainMenuItems = menuRoutes.map((route) => convertRouteToMenuItem(menuTheme, route, []))

    return (
        <Layout className="layout" style={{height: "100%"}}>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={mainMenuItems}
                />
            </Header>
            <Routes>
                {generateRoutes(menuRoutes)}
            </Routes>
        </Layout>
    )
}