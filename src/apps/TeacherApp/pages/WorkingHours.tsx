import React, { FC, useState } from "react";
import "./WorkingHours.less";
import { Row, Col, Tag, Button, PageHeader, Table, Select, Tabs, Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined, HeartOutlined } from '@ant-design/icons';
import { Teacher, User } from "../../../typings";
import "./Subjects.less";
import { SaveOutlined } from "@ant-design/icons";
import { data, columns, dayOfWeek } from "../../../utils/workHoursTable";
import { API_Prefix, API_URL } from "../../../utils/api";
import axios from "axios";
import { time } from "node:console";

const { Option } = Select;
const { TabPane } = Tabs;

const customIcons = {
  1: <FrownOutlined />,
  2: <MehOutlined />,
  3: <SmileOutlined />,
};

export interface WorkingHoursProps {
  user: Teacher;
  setUser: (user: User) => void;
}

export const WorkingHours: FC<WorkingHoursProps> = ({ user: baseUser, setUser: baseSetUser }) => {
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

  const onScoreChange = (value: any, day: number, time: number) => {
    const newTableData = { ...user.desiredSchedule };
    console.log(value);
    newTableData.days[day].lessons[time].score = value;
    setUser({ ...user, desiredSchedule: newTableData });
  };

  const getTableData = (day: number): any[] =>
    user.desiredSchedule.days[day].lessons.map((lesson, idx) => ({
      key: data[idx].key,
      time: data[idx].time,
      subject: (
        <div className={'col_data_row'}>
          {lesson.title !== "" ? (
            <Tag closable onClose={() => onClose(day, idx)}>
              {lesson.title}
            </Tag>
          ) : (
            <Select
              showSearch
              onChange={(val) => onChange(val, day, idx)}
              style={{ width: "80%" }}
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
          <Rate
            defaultValue={lesson.score}
            className={'SmileRate'}
            // @ts-ignore
            character={({ index }) => customIcons[index + 1]}
            count={3}
            allowClear
            onChange={(val) => onScoreChange(val, day, idx)}
          />
        </div>
      ),
    }));

  const onSave = () => {
    // Тут происходит отправка сохраненных данных на сервер и редирект на главную страницу

   const data = {
      method: API_Prefix.new_hours,
      email: user.email,
      timetable: user.desiredSchedule.days.map((day, idx) => {
        return day.lessons.map((time, timeIdx) => {

          let result = 0;

          switch (time.score) {
            case 1:
              result = -10;
              break;
            case 2:
              result = -5;
              break;
            case 3:
              result = -1;
              break;
            default:
                result = 0;
          }

          return {
            id: timeIdx,
            name: time.title,
            scoreTime: result
          }
        });
      })
    } 

    axios
    .post(API_URL, data)
    .then((response) => {
      console.log(response);

      if (response.status === 500) {
        console.log('Ошибка на стороне сервера при сохранении предметов');
      } else {
        console.log("Сохраняем новые пожелания");
        console.log(user.desiredSchedule);
        setUser({ ...user, desiredSchedule: user.desiredSchedule })
      }
    })
    .catch((error) => {
      console.log(error);
      console.log('Ошибка на стороне сервера при сохранении предметов');
    });

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
