import React, { FC } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { Timetable } from "../../pages/Timetable";

import { Layout, Menu } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { Student } from "../../typings";
import { Profile } from "../../pages/Profile";

const { Sider, Content } = Layout;

export interface StudentAppProps {
  user: Student;
  logout: () => void;
}

export const StudentApp: FC<StudentAppProps> = ({ user, logout }) => {
  return (
    <Router>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">Профиль</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<CalendarOutlined />}>
              <Link to="/timetable">Расписание</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div className={"Page-body"}>
                <Switch>
                  <Route exact path="/">
                    <Profile user={user} logout={logout} />
                  </Route>
                  <Route exact path="/timetable">
                    <Timetable timetable={user.schedule} userEmail={user.email} />
                  </Route>
                  <Redirect
                    from={"/register"}
                    to={{
                      pathname: "/",
                    }}
                  />
                  <Redirect
                    from={"/login"}
                    to={{
                      pathname: "/",
                    }}
                  />
                </Switch>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
