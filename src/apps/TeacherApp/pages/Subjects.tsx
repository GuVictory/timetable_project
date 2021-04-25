import React, { FC, useState } from "react";
import { Checkbox, Row, Col, Tag, Button, PageHeader } from "antd";
import { Subject, Teacher, User } from "../../../typings";
import "./Subjects.less";
import { SaveOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_Prefix, API_URL } from "../../../utils/api";

const { CheckableTag } = Tag;

export interface SubjectsProps {
  allSubjects: Subject[];
  teacher: Teacher;
  setUser: (user: User) => void;
}

export const Subjects: FC<SubjectsProps> = ({
  allSubjects,
  teacher,
  setUser
}) => {
  const [selectedTags, setSelectedTags] = useState<Subject[]>(teacher.subjects);

  const handleChange = (tag: Subject, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t.title !== tag.title);
    setSelectedTags(nextSelectedTags);
  };

  const onSave = () => {
    // Тут запилить отправку на сервер

    const data = {
      method: API_Prefix.new_subjects,
      email: teacher.email,
      subjects: selectedTags
    };

    axios
    .post(API_URL, data)
    .then((response) => {
      console.log(response);

      if (response.status === 500) {
        console.log('Ошибка на стороне сервера при сохранении предметов');
      } else {
        console.log("Сохраняем новые предметы для препода");
        console.log(selectedTags);
        setUser({ ...teacher, subjects: selectedTags });
      }
    })
    .catch((error) => {
      console.log(error);
      console.log('Ошибка на стороне сервера при сохранении предметов');
    });
  };

  return (
    <>
      <PageHeader
        ghost={false}
        title="Выбор предметов"
        subTitle="Выберите предметы, которые вы будете проводить"
        extra={[
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={false}
            onClick={onSave}
            style={{ alignSelf: "flex-end", position: "relative", top: -1 }}
          >
            Сохранить
          </Button>,
        ]}
      />
      <div className={"Subjects-tags"}>
        <Checkbox.Group style={{ width: "100%" }}>
          <Row>
            {allSubjects.map((tag, idx) => (
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={8}
                key={idx}
                className={"Subject-col"}
              >
                <CheckableTag
                  checked={selectedTags.some((v) => v.title === tag.title)}
                  onChange={(checked) => handleChange(tag, checked)}
                  className={"Subject-tag"}
                >
                  {tag.title}
                </CheckableTag>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
    </>
  );
};
