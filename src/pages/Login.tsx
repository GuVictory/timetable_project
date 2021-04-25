import React, {FC, useState} from "react";
import { Form, Input, Button, Typography } from "antd";
import axios from "axios";

import "./Login.less";
import {API_Prefix, API_URL} from "../utils/api";
import {Student, Teacher, User} from "../typings";
const layout = {
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

const { Title } = Typography;

export interface LoginProps {
  onLogin: (user?: User) => void;
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
  const [error, setError] = useState<string>('');

  const onFinish = (values: any) => {
    console.log("Success:", values);

    const userLogin = {
      method: API_Prefix.login,
      email: values.email,
      password: values.password,
    };

    axios
        .post(API_URL, userLogin)
        .then((response) => {
          console.log(response);

          if (response.status === 404) {
            setError('Пользователь с такими данными не найден!');
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

            onLogin(teacher);
          } else {
            const student = {
              id: response.data.email,
              name: response.data.name,
              surname: response.data.surname,
              email: response.data.email,
              group: response.data.group,
            } as Student;

            onLogin(student);
          }
        })
        .catch((error) => {
          console.log(error);
          onLogin(undefined);
          setError('Произошла ошибка на стороне сервера!')
        });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onRegisterClick = () => {
    window.location.href = "/#/register";
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={"LoginForm"}
    >
      <Title level={3} className={"Login-title"}>
        Авторизация
      </Title>

      <Title level={5} className={"Login-error"}>
        {error}
      </Title>

      <Form.Item
        name="email"
        rules={[{ required: true, message: "Пожалуйста введите ваш email!" }]}
      >
        <Input placeholder={"Email пользователя"} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста введите ваш пароль!" }]}
      >
        <Input.Password placeholder={"Пароль"} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
        <Button
          type="default"
          htmlType="button"
          style={{ marginLeft: "16px" }}
          onClick={onRegisterClick}
        >
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};