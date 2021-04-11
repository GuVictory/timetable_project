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
import { API_Prefix, API_URL } from "./utils/api";
import axios from "axios";

const { Content } = Layout;

const fakeGetData = new Promise<User | undefined>((resolve, reject) => {
  resolve(fakeTeacher);
});

const App: FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const onLogin = (email: string, password: string) => {
    fakeGetData.then((user) => {
      setUser(user);
    });

    const userLogin = {
      method: API_Prefix.login,
      email: email,
      password: password,
    };

    axios
      .post(API_URL, userLogin)
      .then((response) => {
        console.log(response);

        if (response.status === 404) {
        } else if (response.data.teacher) {
          const teacher = {
            id: response.data.email,
            name: response.data.name,
            surname: response.data.surname,
            email: response.data.email,
            fullTime: response.data.fullTime,
            subjects: response.data.subjects,
            desiredSchedule: response.data.desiredSchedule,
          } as Teacher;

          setUser(teacher);
        } else {
          const student = {
            id: response.data.email,
            name: response.data.name,
            surname: response.data.surname,
            email: response.data.email,
            group: response.data.group,
          } as Student;

          setUser(student);
        }
      })
      .catch((error) => {
        console.log(error);
        setUser(undefined);
      });
  };

  const onRegister = (
    name: string,
    surname: string,
    email: string,
    password: string,
    type: string,
    group?: string
  ) => {
    const userRegister = {
      method: API_Prefix.register,
      name: name,
      surname: surname,
      email: email,
      password: password,
      teacher: type === "teacher",
      group: group,
    };

    axios
      .post(API_URL, userRegister)
      .then((response) => {
        console.log(response);

        if (response.status === 404) {
        } else if (response.data.teacher) {
          const teacher = {
            id: response.data.email,
            name: response.data.name,
            surname: response.data.surname,
            email: response.data.email,
            fullTime: response.data.fullTime,
            subjects: [],
            desiredSchedule: response.data.desiredSchedule,
          } as Teacher;

          setUser(teacher);
        } else {
          const student = {
            id: response.data.email,
            name: response.data.name,
            surname: response.data.surname,
            email: response.data.email,
            group: response.data.group,
          } as Student;

          setUser(student);
        }
      })
      .catch((error) => {
        console.log(error);
        setUser(undefined);
      });
  };

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
