import React, { FC } from "react";
import { PageHeader, Avatar, Descriptions, Tag, Button, Row, Col } from "antd";
import { User } from "../../typings";

import "./UserHeader.less";
import { LogoutOutlined } from "@ant-design/icons";

export interface UserHeaderProps {
  user: User;
  onExit: () => void;
}

export const UserHeader: FC<UserHeaderProps> = ({ user, onExit }) => {
  return (
    <PageHeader
      className="site-page-header"
      title="Профиль"
      tags={<Tag color="blue">{user.group ? "Студент" : "Преподаватель"}</Tag>}
      extra={[
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          loading={false}
          onClick={onExit}
          style={{ alignSelf: "flex-end", position: "relative", top: -1 }}
          danger
        >
          Выход
        </Button>,
      ]}
    >
      <Row>
        <Col span={4}>
          <Avatar size={128}>
            {user.name[0]}
            {user.surname[0]}
          </Avatar>
        </Col>
        <Col span={20}>
          <Descriptions size="middle" column={1}>
            <Descriptions.Item label="Имя">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Фамилия">
              {user.surname}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions size="middle" column={1}>
            {user.fullTime && (
              <Descriptions.Item label="Ставка">
                {user.fullTime} часов
              </Descriptions.Item>
            )}
            {user.busyTime && (
              <Descriptions.Item label="Заполнено">
                {user.busyTime} из {user.fullTime} часов
              </Descriptions.Item>
            )}
            {user.group && (
              <Descriptions.Item label="Группа">{user.group}</Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>
    </PageHeader>
  );
};
