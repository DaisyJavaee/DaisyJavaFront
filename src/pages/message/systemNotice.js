import React, { Component } from 'react'
import { Card,Avatar,List, Button, Badge } from 'antd'
import {isLogined} from "../../utils/auth"
import { CheckCircleTwoTone, NotificationOutlined } from '@ant-design/icons';

import CONSTURL from '../../components/community/config';
import Axios from 'axios';

export default class SystemNotice extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: true
    };
  }

  changeState() {
    this.setState({ show: false });
  };

  componentDidMount(){
    if(isLogined()){
      var token = JSON.parse(localStorage.getItem('token')).token

      Axios
      .get(`/Notice`,{
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => { 
        var result=res.data
        this.setState({data:result})
        console.log(res)
      })
    }
  }

  render() {
        //初始化render数组状态
        let objArr=this.state.data

        return (
            <div className='notice'>

                <div style={{ marginLeft: '83%', marginTop: '10px', marginBottom: '10px' }}>
                  <Button 
                    size="large" 
                    icon={<CheckCircleTwoTone />}  
                    onClick={this.changeState.bind(this)}
                  >
                    全部已读
                  </Button>                
                </div>

                <Card id='notice_card' bordered={false}>
                <List 
                  itemLayout="vertical" 
                  dataSource={objArr} 
                  renderItem={item => (
                    <List.Item>

                        <Badge dot={this.state.show}>
                          <NotificationOutlined />
                        </Badge> 

                      <List.Item.Meta
                        //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={item.title}
                        description={"通知时间："+item.time}
                      />

                      <div>{item.content}</div>
                    </List.Item>
                )}
                />
                </Card>
            </div>
        )
    }
}