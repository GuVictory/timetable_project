import React, {FC, useState} from "react";
import {Form, Input, Button, Typography} from "antd";
import "./Login.less";
import {Project} from "../typings";
import axios from "axios";
import { API_Prefix, API_URL } from "../utils/api";

const layout = {
    wrapperCol: { span: 24 },
};

const tailLayout = {
    wrapperCol: { span: 24 },
};

const { Title } = Typography;

export interface CreateProject3Props {
    project: Project;
    onSetProject: (project?: Project) => void;
}


export const CreateProjectStep3: FC<CreateProject3Props> = ({ project: baseProject, onSetProject }) => {
    const [project, setProject] = useState<Project>(baseProject);

    if (baseProject.name.length === 0) {
        window.location.href = "/#/init_project";
    }

    const onFinish = (values: any) => {
        let subjects = [ ...project.subjects ];

        subjects.forEach(subject => {
            subject.hours = values[subject.name];
        });

        setProject({
            ...project,
            subjects: subjects,
        });

        window.location.href = `/#/project_created`;
        console.log("Success:", baseProject);

        const data = {
            method: API_Prefix.new_project,
            name: project.name,
            subjects: project.subjects,
            groups: project.groups,
            teachers: project.teachers,
        }

        axios
        .post(API_URL, data)
        .then((response) => {
            console.log(response);
            if (response.status === 409) {
                console.log('Проект с таким названием уже существует')
            } else {
                onSetProject(project);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const onBackClick = () => {
        window.location.href = "/#/setup_project_teachers";
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
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
                Количество учебных часов по предметам
            </Title>

            {
                project.subjects.map(subject => {
                    return (
                        <div  key={subject.name}>
                            <Title level={5}>{subject.name}</Title>
                            <Form.Item
                                name={subject.name}
                                rules={[{ required: true, message: "Пожалуйста заполните количество часов!" }]}
                            >
                                <Input placeholder={"Количество часов"} />
                            </Form.Item>
                        </div>
                    );
                })
            }

            <Form.Item {...tailLayout}>
                <Button
                    type="default"
                    htmlType="button"
                    onClick={onBackClick}
                >
                    Назад
                </Button>
                <Button type="primary" htmlType="submit"  style={{ marginLeft: "16px" }}>
                    Создать проект
                </Button>
            </Form.Item>
        </Form>
    );
};
