import React, {FC, useState} from "react";
import {Form, Input, Button,  Modal, Typography, Select} from "antd";
import axios from "axios";
import {API_Prefix, API_URL} from "../utils/api";
import "./Login.less";
import {Project} from "../typings";

const layout = {
    wrapperCol: { span: 24 },
};

const tailLayout = {
    wrapperCol: { span: 24 },
};

const { Title } = Typography;

export interface CreateProject1Props {
    project: Project;
    onSetProject: (project: Project) => void;
}

export const CreateProjectStep1: FC<CreateProject1Props> = ({ project, onSetProject }) => {
    const onFinish = (values: any) => {
        console.log("Success:", values);

        const groups = values.groups.map((val: string) => ( { name: val } ));
        const teachers = values.teachers.map((val: any) => ( { email: val, hours: 0 } ));
        const subjects = values.subjects.map((val: any) => ( { name: val, hours: 0 } ));

        onSetProject({
            name: values.name,
            groups: groups,
            teachers: teachers,
            subjects: subjects
        });

        window.location.href = "/#/setup_project_teachers";
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={
                {
                    name: project.name,
                    subjects: project.subjects.map(val => val.name),
                    groups: project.groups.map(val => val.name),
                    teachers: project.teachers.map(val => val.email),
                }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={"LoginForm"}
        >
            <Title level={3} className={"Login-title"}>
                Создание нового проекта
            </Title>

            <Form.Item
                name="name"
                rules={[{ required: true, message: "Пожалуйста введите название проекта!" }]}
            >
                <Input placeholder={"Название проекта"} />
            </Form.Item>

            <Title level={5}>{'Предметы'}</Title>
            <Form.Item
                name="subjects"
                rules={[{ required: true, message: "Пожалуйста заполните предметы для проекта!" }]}
            >
                <Select mode={'tags'} tokenSeparators={[',']} placeholder={"Предметы"} />
            </Form.Item>

            <Title level={5}>{'Учебные группы'}</Title>
            <Form.Item
                name="groups"
                rules={[{ required: true, message: "Пожалуйста заполните учебные группы проекта!" }]}
            >
                <Select mode={'tags'} tokenSeparators={[',']} placeholder={"Названия учебных групп"} />
            </Form.Item>

            <Title level={5}>{'Email преподавателей'}</Title>
            <Form.Item
                name="teachers"
                rules={[{ required: true, message: "Пожалуйста заполните преподавателей проекта!" }]}
            >
                <Select mode={'tags'} tokenSeparators={[',']} placeholder={"Email преподавателей"} />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Далее
                </Button>
            </Form.Item>
        </Form>
    );
};