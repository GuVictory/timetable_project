import React, { FC, useEffect, useState } from "react";
import { Row, Col, Tag, PageHeader, Table } from "antd";
import { columns, data } from "../utils/timetableData";
import { Week } from "../typings";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_Prefix, API_URL } from "../utils/api";

export interface TimetableProps {
  timetable?: Week;
  userEmail?: String;
  projectName?: String;
}

interface tableRaw {
  key: string;
  time: string;
  mon: String;
  tue: String;
  wen: String;
  the: String;
  fri: String;
  sat: String;
}

export const Timetable: FC<TimetableProps> = ({ timetable: baseTimetable, userEmail, projectName }) => {

  const [timetable, setTimetable] = useState<Week | undefined>(baseTimetable)

  const createTable = () => {
    const table: tableRaw[] = [];

    if (timetable) {
      for (let i = 0; i < 7; ++i) {
        const newRaw: tableRaw = {
          key: data[i].key,
          time: data[i].time,
          mon: timetable.days[0].lessons[i].title,
          tue: timetable.days[1].lessons[i].title,
          wen: timetable.days[2].lessons[i].title,
          the: timetable.days[3].lessons[i].title,
          fri: timetable.days[4].lessons[i].title,
          sat: timetable.days[5].lessons[i].title,
        };
        table.push(newRaw);
      }
    }

    return table;
  };

  useEffect(() => {

    if (!timetable) {
      if (userEmail && projectName) {

        const data = {
          method: API_Prefix.timetable,
          email: userEmail,
          project_name: projectName,
        }

        axios
        .post(API_URL, data)
        .then((response) => {
          console.log(response);
          if (response.status === 500) {
            console.log('Ошибка при запросе всего расписания');
          } else {
            setTimetable(response.data)
          }
        })
        .catch((error) => {
          console.log(error);
          console.log('Ошибка при запросе всего расписания');
        });
      } else if (projectName) {

        const data = {
          method: API_Prefix.project_timetable,
          project_name: projectName,
        }

        axios
        .post(API_URL, data)
        .then((response) => {
          console.log(response);
          if (response.status === 500) {
            console.log('Ошибка при запросе всего расписания для проекта');
          } else {
            setTimetable(response.data)
          }
        })
        .catch((error) => {
          console.log(error);
          console.log('Ошибка при запросе всего расписания для проекта');
        });
      }
    }

  }, [projectName, timetable, userEmail]);

  return (
    <>
      <PageHeader
        ghost={false}
        title="Ваше расписание"
        extra={[
          <>
            {!timetable && (
              <Tag icon={<SyncOutlined spin />} color="warning">
                Расписание в разработке
              </Tag>
            )}
          </>,
        ]}
      />
      <div className={"Timetable-body"}>
        <Row>
          <Col span={24}>
            <Table
              dataSource={createTable()}
              columns={columns}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};
