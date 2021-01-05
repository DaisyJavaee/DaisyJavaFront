import React, { Component } from 'react'
import {Card,List,Drawer,Button, Alert} from 'antd'
import { Form, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {isLogined} from "../../utils/auth"
import { CheckCircleTwoTone, NotificationOutlined } from '@ant-design/icons';

//import CONSTURL from '../../components/community/config';
import axios from 'axios';
const { Option } = Select;

const onAlertClose = (e) => {
    console.log(e, 'I was closed.');
    window.location.reload()
  };

export default class ApplicationDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: false
        }
        var token=JSON.parse( localStorage.getItem('token')).token
     }

    handleChange(value) {
        this.setState("choice", value==="true")
    }
    
    render() {
        return (
            <Drawer
            title="是否允许该用户加入小队？"
            placement='bottom'
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
        >
            <Form layout="vertical" hideRequiredMark>
                <Form.Item>
                        <Select defaultValue="true" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="true">同意</Option>
                            <Option value="false">拒绝</Option>
                        </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={()=>{this.handleClick(item.projectId, item.groupId)}}>
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>  
        )
     }
    


}