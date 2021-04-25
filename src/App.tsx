import React, { FC, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { TeacherApp } from "./apps/TeacherApp/TeacherApp";
import "./App.less";
import { fakeTeacher, emptyProject } from "./utils/fakeData";
import { Layout } from "antd";

import {Project, Student, Teacher, User} from "./typings";
import { StudentApp } from "./apps/StudentApp/StudentApp";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import {CreateProjectStep1} from "./pages/CreateProjectStep1";
import {CreateProjectStep2} from "./pages/CreateProjectStep2";
import {CreateProjectStep3} from "./pages/CreateProjectStep3";
import {ProjectCreated} from "./pages/ProjectCreated";

const { Content } = Layout;

const fakeGetData = new Promise<User | undefined>((resolve, reject) => {
  resolve(fakeTeacher);
});

const App: FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [project, setProject] = useState<Project | undefined>({ ...emptyProject });

  /* fakeGetData.then((user) => {
    setUser(user);
  }); */

  const onLogin = (user?: User) => {
    /*fakeGetData.then((user) => {
      setUser(user);
    }); */
    setUser(user);
  };

  const onRegister = (user?: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(undefined);
    console.log(user);
  };

  return (
    <>
      {user ? (
        <>
          {(user.desiredSchedule && project) ? (
            <TeacherApp user={user as Teacher} logout={logout} setUser={setUser} projectName={project.name} />
          ) : (
            <StudentApp user={user as Student} logout={logout} />
          )}
        </>
      ) : (
        <Router>
          <Layout>
            <Content className={"Auth-content"}>
              <Switch>
                <Route exact path="/init_project">
                  <CreateProjectStep1 project={project || {...emptyProject}} onSetProject={setProject} />
                </Route>
                <Route exact path="/setup_project_teachers">
                  <CreateProjectStep2 project={project!} onSetProject={setProject} />
                </Route>
                <Route exact path="/setup_project_subjects">
                  <CreateProjectStep3 project={project!} onSetProject={setProject} />
                </Route>
                <Route exact path="/project_created">
                  <ProjectCreated />
                </Route>

                <Route exact path="/login">
                  <Login onLogin={onLogin} />
                </Route>
                <Route exact path="/register">
                  <Register onRegister={onRegister} />
                </Route>
                <Redirect
                  from={"/"}
                  to={{
                    pathname: "/login",
                  }}
                />
                <Redirect
                  from={"/subjects"}
                  to={{
                    pathname: "/login",
                  }}
                />
                <Redirect
                  from={"/working_hours"}
                  to={{
                    pathname: "/login",
                  }}
                />
                <Redirect
                  from={"/timetable"}
                  to={{
                    pathname: "/login",
                  }}
                />
              </Switch>
            </Content>
          </Layout>
        </Router>
      )}
    </>
  );
};

export default App;
