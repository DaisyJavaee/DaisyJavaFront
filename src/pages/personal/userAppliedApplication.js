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

export default class Apply extends Component {

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
        axios
          .get('/user/applications/receive' ,{ headers: { token: token }})
          .then((res)=>{
            this.setState({
            data: res.detail
          })
          })
          .catch(function(error){
            console.log(error)
          })
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

      handleChange(value) {
        console.log(`selected ${value}`);
        this.setState({ 
            flag: value
          });
      };
      
      putData(value1, value2) {
        var data = {
            projectId: value1,
            account: this.state.account,
            groupId: value2,
            result: this.state.choice,

        }
       console.log("data:",data)
        var token = JSON.parse(localStorage.getItem('token')).token
        axios
        .put(`/Application`, data, {
          headers: { token: token },
        })
        .then((res) => {
          console.log(res)
        })
        .catch(erro=>{
            console.log(erro)
        })
      }

      handleClick(valueProjectId, valueGroupId) {
          if(this.state.flag==true){
            this.setState({ 
                choice: "successful"
            });               
          }
          else if(this.state.flag==false){
            this.setState({ 
                choice: "failed"
            }); 
          }
        this.putData(valueProjectId, valueGroupId);
        this.onClose();
        this.render=()=>{
            return(

                <Alert
                message="Success Tips"
                description="Detailed description and advice about successful copywriting."
                type="success"
                closable
                showIcon
                onClose={onAlertClose}
                />   

            )
        }
      }

    componentDidMount(){
        if(isLogined()){
            var token = JSON.parse(localStorage.getItem('token')).token
            var tempAccount = JSON.parse(localStorage.userData).account;
            this.state.account = tempAccount;

            axios
            .get(`/Application/`+this.state.account,{
                headers: { token: token },
            })
            .then((res) => { 
                var result=res.data
                this.setState({data:result})
                //console.log(res)
            })
        }
    }
    

    render() {

        //初始化render数组状态
        let objArr=this.state.data

        return (
            <div>
                <List 
                itemLayout="vertical" 
                dataSource={objArr}
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
 
                            </Col>
                        </Row>
                                
                    </List.Item>
                )}
                />
            </div>
        )
    }
}