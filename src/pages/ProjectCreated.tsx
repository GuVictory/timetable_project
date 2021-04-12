import React from "react";
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import "./Login.less";

export const ProjectCreated = () => {
    setTimeout(() => { window.location.href = "/#/"; }, 6000);

    return (
        <Result
            icon={<SmileOutlined />}
            title={`Проект успешно создан!`}
        />
    );
};