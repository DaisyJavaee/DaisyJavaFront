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

export default class ReceivedApplication extends Component {

    constructor(props) {
        super(props);
        this.state = {
          account:'',
          data:[],
          visible: false,
          flag: "",
          choice: ""
        }
        var token=JSON.parse( localStorage.getItem('token')).token
        const expandGroup = (application)=>{
          axios
            .get(`/groupId/${application.groupId}`, { headers: { token: token }})
            .then((res)=>(res.detail))
            .then((res)=>({...application, res}))};
        axios
          .get(`/user/applications/receive`, { headers: { token: token }})
          .then((res)=>(res.detail))
          .then((detail)=>Promise.all(
            detail.map(application=>(expandGroup(application)))))
          .then((data)=>{this.setState("data", data)})
    }
    

    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
    
    onClose = () => {
      this.setState({
        visible: false,
      });
    };


    handleClick(groupId, applicationId) {
      var token = JSON.parse(localStorage.getItem('token')).token
      axios
        .patch(`/groups/${groupId}/applications/${applicationId}`, {result: this.state.choice }, {
          headers: { token: token },
        })
        .error(err=>{
            console.log(err)
        })
      this.onClose();
    }

    render() {
        return (
            <div>
                <List 
                itemLayout="vertical" 
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item>
                        <Row>
                            <Col span={18}>
                                <List.Item.Meta
                                    //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={
                                    <a href={"#/personal/account="+item.account}>{item.account}申请加入你的小队！</a>
                                    }
                                    description={"小队名称："+item.name}
                                    style={{width:"50%"}}
                                />                            
                            </Col>

                            <Col span={6}>
                                <Button onClick={this.showDrawer}>
                                        审核
                                </Button>
                                <Drawer
                                    title="是否允许该用户加入小队？"
                                    placement='bottom'
                                    closable={false}
                                    onClose={this.onClose}
                                    visible={this.state.visible}
                                >
                                    <Form layout="vertical" hideRequiredMark>
                                        <Form.Item>
                                                <Select defaultValue="approve" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                                                    <Option value="approve">同意</Option>
                                                    <Option value="refuse">拒绝</Option>
                                                </Select>
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" onClick={()=>{this.handleClick(item.groupId, item.applicationId)}}>
                                            Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Drawer>  
                            </Col>
                        </Row>
                                
                    </List.Item>
                )}
                />
            </div>
        )
    }
}