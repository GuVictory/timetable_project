import React, { FC, useEffect, useState } from "react";
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
import { Subject, Teacher, User } from "../../typings";
import axios from "axios";
import { Profile } from "../../pages/Profile";
import { Subjects } from "./pages/Subjects";
import { fakeAllSubjects } from "../../utils/fakeData";
import { WorkingHours } from "./pages/WorkingHours";
import { API_Prefix, API_URL } from "../../utils/api";

const { Sider, Content } = Layout;

export interface TeacherAppProps {
  user: Teacher;
  setUser: (user: User) => void;
  logout: () => void;
}

export const TeacherApp: FC<TeacherAppProps> = ({ user, logout, setUser }) => {
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    axios
    .post(API_URL, { method: API_Prefix.all_subjects })
    .then((response) => {
      console.log(response);

      if (response.status === 500) {
        console.log('Ошибка при запросе всего расписания');
      } else {
        setAllSubjects(response.data.subjects)
      }
    })
    .catch((error) => {
      console.log(error);
      console.log('Ошибка при запросе всего расписания');
    });
  }, []);

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
                      allSubjects={allSubjects}
                      teacher={user}
                      setUser={setUser}
                    />
                  </Route>
                  <Route exact path="/working_hours">
                    <WorkingHours user={user} setUser={setUser} />
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
