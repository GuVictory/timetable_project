import React, { FC, useState } from "react";
import { Checkbox, Row, Col, Tag, Button, PageHeader } from "antd";
import { Subject } from "../../../typings";
import "./Subjects.less";
import { Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { CheckableTag } = Tag;

export interface SubjectsProps {
  allSubjects: Subject[];
  teacherSubjects: Subject[];
}

export const Subjects: FC<SubjectsProps> = ({
  allSubjects,
  teacherSubjects,
}) => {
  const [selectedTags, setSelectedTags] = useState<Subject[]>(teacherSubjects);

  const handleChange = (tag: Subject, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t.title !== tag.title);
    setSelectedTags(nextSelectedTags);
  };

  const onSave = () => {
    // Тут запилить отправку на сервер
    console.log("Сохраняем новые предметы для препода");
    console.log(selectedTags);
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
