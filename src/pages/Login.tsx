import React, { FC } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import axios from "axios";

import "./Login.less";
const layout = {
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

const { Title } = Typography;

export interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    onLogin(values.email, values.password);
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

/*
    useEffect(() => {
        const appLink =
            'https://script.google.com/macros/s/AKfycbxWkfRUud7c_' +
            'w4SauLMSVkuWKb2D138PlvdJ9KNh_bLTG3Xzj1OkVKX-QenXstUrPiX/exec';

        axios
            .get(appLink)
            .then((response) => {
                console.log(response);
                setNewsCards(response.data.result);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
* */
