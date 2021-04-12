import React, { FC, useState } from "react";
import { Form, Input, Button, Radio, Typography } from "antd";
import "./Login.less";
import {Student, Teacher, User} from "../typings";
import {API_Prefix, API_URL} from "../utils/api";
import axios from "axios";
const layout = {
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

const { Title } = Typography;

export interface RegisterProps {
  onRegister: (user?: User) => void;
}

export const Register: FC<RegisterProps> = ({ onRegister }) => {
  const [accType, setAccType] = useState<String>("student");
  const [error, setError] = useState<string>('');

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const userRegister = {
      method: API_Prefix.register,
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
      teacher: values.type === "teacher",
      group: values.group,
    };

    axios
        .post(API_URL, userRegister)
        .then((response) => {
          console.log(response);

          if (response.data.teacher) {
            const teacher = {
              id: response.data.email,
              name: response.data.name,
              surname: response.data.surname,
              email: response.data.email,
              fullTime: response.data.fullTime,
              subjects: [],
              desiredSchedule: response.data.desiredSchedule,
            } as Teacher;

            onRegister(teacher);
          } else {
            const student = {
              id: response.data.email,
              name: response.data.name,
              surname: response.data.surname,
              email: response.data.email,
              group: response.data.group,
            } as Student;

            onRegister(student);
          }
        })
        .catch((error) => {
          console.log(error);
          onRegister(undefined);
          setError('Произошла ошибка на стороне сервера!')
        });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onLoginClick = () => {
    window.location.href = "/#/login";
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ switch: "student" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={"LoginForm"}
    >
      <Title level={3} className={"Login-title"}>
        Регистрация
      </Title>
      <Title level={5} className={"Login-error"}>
        {error}
      </Title>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Пожалуйста введите имя!" }]}
      >
        <Input placeholder={"Имя"} />
      </Form.Item>
      <Form.Item
        name="surname"
        rules={[{ required: true, message: "Пожалуйста введите фамилию!" }]}
      >
        <Input placeholder={"Фамилия"} />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите email!",
            type: "email",
          },
        ]}
      >
        <Input placeholder={"Email"} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
      >
        <Input.Password placeholder={"Пароль"} />
      </Form.Item>

      <Form.Item name="switch">
        <Radio.Group
          onChange={(val) => setAccType(val.target.value)}
          defaultValue={"student"}
        >
          <Radio value="student">Студент</Radio>
          <Radio value="teacher">Преподаватель</Radio>
        </Radio.Group>
      </Form.Item>

      {accType === "student" && (
        <Form.Item
          name="group"
          rules={[
            { required: true, message: "Пожалуйста введите свою группу!" },
          ]}
        >
          <Input placeholder={"Учебная группа"} />
        </Form.Item>
      )}

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
        <Button
          type="default"
          htmlType="button"
          style={{ marginLeft: "16px" }}
          onClick={onLoginClick}
        >
          Авторизация
        </Button>
      </Form.Item>
    </Form>
  );
};
