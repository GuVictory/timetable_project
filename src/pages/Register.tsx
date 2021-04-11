import React, { FC, useState } from "react";
import { Form, Input, Button, Radio, Typography } from "antd";
import "./Login.less";
const layout = {
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

const { Title } = Typography;

export interface RegisterProps {
  onRegister: (
    name: string,
    surname: string,
    email: string,
    password: string,
    type: string,
    group?: string,
    hours?: number
  ) => void;
}

export const Register: FC<RegisterProps> = ({ onRegister }) => {
  const [accType, setAccType] = useState<String>("student");

  const onFinish = (values: any) => {
    console.log("Success:", values);
    onRegister(
      values.name,
      values.surname,
      values.email,
      values.password,
      values.switch,
      values.switch === "student" ? values.group : undefined
    );
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
