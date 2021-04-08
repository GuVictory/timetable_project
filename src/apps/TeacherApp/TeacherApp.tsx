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
import {
  UserOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Teacher } from "../../typings";
import { Profile } from "../../pages/Profile";
import { Subjects } from "./pages/Subjects";
import { fakeAllSubjects } from "../../utils/fakeData";
import { WorkingHours } from "./pages/WorkingHours";

const { Sider, Content, Footer } = Layout;

export interface TeacherAppProps {
  user: Teacher;
  logout: () => void;
}

export const TeacherApp: FC<TeacherAppProps> = ({ user, logout }) => {
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
            <Menu.Item key="3" icon={<ExperimentOutlined />}>
              <Link to="/subjects">Предметы</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ClockCircleOutlined />}>
              <Link to="/working_hours">Часы работы</Link>
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
                  <Route exact path="/subjects">
                    <Subjects
                      teacherSubjects={user.subjects}
                      allSubjects={fakeAllSubjects}
                    />
                  </Route>
                  <Route exact path="/working_hours">
                    <WorkingHours user={user} />
                  </Route>
                  <Route exact path="/timetable">
                    <Timetable timetable={user.schedule} />
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
