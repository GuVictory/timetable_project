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
    username: string,
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
      values.username,
      values.password,
      values.switch,
      values.switch === "student" ? values.group : undefined,
      values.switch === "teacher" ? values.hours : undefined
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
        name="username"
        rules={[{ required: true, message: "Пожалуйста введите логин!" }]}
      >
        <Input placeholder={"Имя пользователя"} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста введитепароль!" }]}
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
      {accType === "teacher" && (
        <Form.Item
          name="hours"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: 99,
              message: "Пожалуйста введите свою занятость в часах!",
            },
          ]}
        >
          <Input placeholder={"Колчество часов"} />
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
