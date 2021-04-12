import React, {FC} from "react";
import {Form, Input, Button, Typography} from "antd";
import "./Login.less";
import {Project} from "../typings";

const layout = {
    wrapperCol: { span: 24 },
};

const tailLayout = {
    wrapperCol: { span: 24 },
};

const { Title } = Typography;

export interface CreateProject2Props {
    project: Project;
    onSetProject: (project: Project) => void;
}


export const CreateProjectStep2: FC<CreateProject2Props> = ({ project, onSetProject }) => {
    if (project.name.length === 0) {
        window.location.href = "/#/init_project";
    }

    const onFinish = (values: any) => {
        console.log("Success:", values);

        let teachers = [ ...project.teachers ];

        teachers.forEach(teacher => {
            teacher.hours = values[teacher.email];
        });

        onSetProject({
            ...project,
            teachers: teachers
        });
        window.location.href = "/#/setup_project_subjects";
    };

    const onBackClick = () => {
        window.location.href = "/#/init_project";
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
                Часы занятости преподавателей на проекте
            </Title>

            {
                project.teachers.map(teacher => {
                    return (
                        <div key={teacher.email}>
                            <Title level={5}>{teacher.email}</Title>
                            <Form.Item
                                name={teacher.email}
                                rules={[{ required: true, message: "Пожалуйста заполните занятость преподавателя!" }]}
                            >
                                <Input placeholder={"Занятость на проекте"} />
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
                <Button type="primary" htmlType="submit"
                        style={{ marginLeft: "16px" }}>
                    Далее
                </Button>
            </Form.Item>
        </Form>
    );
};