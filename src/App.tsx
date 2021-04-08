import React, { FC, useEffect, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { TeacherApp } from "./apps/TeacherApp/TeacherApp";
import "./App.less";
import { fakeStudent, fakeTeacher } from "./utils/fakeData";
import { Layout } from "antd";

import { Student, Teacher, User } from "./typings";
import { StudentApp } from "./apps/StudentApp/StudentApp";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const { Content } = Layout;

const fakeGetData = new Promise<User | undefined>((resolve, reject) => {
  resolve(fakeTeacher);
});

const App: FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const onLogin = (username: string, password: string) => {
    fakeGetData.then((user) => {
      setUser(user);
    });
  };

  const onRegister = (
    username: string,
    password: string,
    type: string,
    group?: string,
    hours?: number
  ) => {};

  const logout = () => {
    setUser(undefined);
    console.log(user);
  };

  return (
    <>
      {user ? (
        <>
          {user.desiredSchedule ? (
            <TeacherApp user={user as Teacher} logout={logout} />
          ) : (
            <StudentApp user={user as Student} logout={logout} />
          )}
        </>
      ) : (
        <Router>
          <Layout>
            <Content className={"Auth-content"}>
              <Switch>
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
