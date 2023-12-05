import {Layout, Menu} from "antd";
import {landingRoute, menuRoutes} from "./config/Routes";
import {convertRouteToMenuItem, generateRoutes} from "./config/RoutingUtil";
import {Routes} from "react-router";
import {Link} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";

const {Header, Footer} = Layout;

const menuTheme = "dark";

export default () => {

    const mainMenuItems = menuRoutes.map((route) => convertRouteToMenuItem(menuTheme, route, []))

    return (
        <Layout>
            <Header>
                <Link to={"/landing"}>
                    <HomeOutlined/>
                </Link>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={mainMenuItems}
                />
            </Header>
            <Routes>
                {generateRoutes([landingRoute, ...menuRoutes])}
            </Routes>
            <Footer style={{textAlign: 'center'}}>SC ©2023 Tasks Stack</Footer>
        </Layout>
    )
}