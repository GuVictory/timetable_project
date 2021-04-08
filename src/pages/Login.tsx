import React, { FC } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import "./Login.less";
const layout = {
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

const { Title } = Typography;

export interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    onLogin(values.username, values.password);
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
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Пожалуйста введите ваш логин!" }]}
      >
        <Input placeholder={"Имя пользователя"} />
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
