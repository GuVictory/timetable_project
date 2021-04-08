import React, { FC, useState } from "react";
import "./WorkingHours.less";
import { Row, Col, Tag, Button, PageHeader, Table, Select, Tabs } from "antd";
import { Teacher } from "../../../typings";
import "./Subjects.less";
import { SaveOutlined } from "@ant-design/icons";
import { data, columns, dayOfWeek } from "../../../utils/workHoursTable";

const { Option } = Select;
const { TabPane } = Tabs;

export interface WorkingHoursProps {
  user: Teacher;
}

export const WorkingHours: FC<WorkingHoursProps> = ({ user: baseUser }) => {
  const [user, setUser] = useState<Teacher>(baseUser);

  const onClose = (day: number, time: number) => {
    const newTableData = { ...user.desiredSchedule };
    newTableData.days[day].lessons[time].title = "";
    setUser({ ...user, desiredSchedule: newTableData });
  };

  const onChange = (value: any, day: number, time: number) => {
    const newTableData = { ...user.desiredSchedule };
    newTableData.days[day].lessons[time].title = value;
    setUser({ ...user, desiredSchedule: newTableData });
  };

  const getTableData = (day: number): any[] =>
    user.desiredSchedule.days[day].lessons.map((lesson, idx) => ({
      key: data[idx].key,
      time: data[idx].time,
      subject: (
        <>
          {lesson.title !== "" ? (
            <Tag closable onClose={() => onClose(day, idx)}>
              {lesson.title}
            </Tag>
          ) : (
            <Select
              showSearch
              onChange={(val) => onChange(val, day, idx)}
              style={{ width: "100%" }}
              placeholder="Время свободно, добавьте предмет"
            >
              {user.subjects.map((val, idx) => (
                <Option
                  key={idx}
                  children={val.title}
                  value={val.title as string}
                />
              ))}
            </Select>
          )}
        </>
      ),
    }));

  const onSave = () => {
    // Тут происходит отправка сохраненных данных на сервер и редирект на главную страницу
    console.log("Новое расписание:");
    console.log(user.desiredSchedule);
  };

  return (
    <>
      <PageHeader
        ghost={false}
        title="График работы"
        subTitle="Тут вы можете показать максимально удобный для вас вариант расписания"
        extra={[
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={false}
            onClick={() => {}}
            style={{ alignSelf: "flex-end", position: "relative", top: -1 }}
          >
            Сохранить
          </Button>,
        ]}
      />
      <div className={"WorkingHours-body"}>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" type="card" size={"middle"}>
              {dayOfWeek.map((val, idx) => (
                <TabPane tab={val} key={idx + 1}>
                  <Table
                    dataSource={getTableData(idx)}
                    columns={columns}
                    pagination={false}
                  />
                </TabPane>
              ))}
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};
