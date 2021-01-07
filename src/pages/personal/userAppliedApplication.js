import React, { Component } from 'react'
import { Card, List, Drawer, Button, Alert } from 'antd'
import { Form, Col, Row, Input, Select, DatePicker } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { isLogined } from '../../utils/auth'
import { CheckCircleTwoTone, NotificationOutlined } from '@ant-design/icons'

//import CONSTURL from '../../components/community/config';
import axios from 'axios'
const { Option } = Select

const onAlertClose = (e) => {
  console.log(e, 'I was closed.')
  window.location.reload()
}

export default class AppliedApplication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      data: [],
      visible: false,
      flag: '',
      choice: '',
    }
    var token = JSON.parse(localStorage.getItem('token')).token
    axios
      .get(`/user/applications`, { headers: { token: token } })
      .then((res) => {
        this.setState({'data': res.data.detail})
      })
    const expandGroup = (application) => {
      axios
        .get(`/groups/${application.groupId}`, { headers: { token: token } })
        .then((res) => res.data.detail)
        .then((res) => ({ ...application, res }))
    }
 
  }

  componentDidMount() {
    if (isLogined()) {
      var token = JSON.parse(localStorage.getItem('token')).token
      var tempAccount = JSON.parse(localStorage.userData).account
      this.state.account = tempAccount

      axios
        .get(`/Application/` + this.state.account, {
          headers: { token: token },
        })
        .then((res) => {
          var result = res.data
          this.setState({ data: result })
          console.log(this.state.data)
        })
    }
  }

  render() {
    //初始化render数组状态
    let objArr = this.state.data

    return (
      <div>
        <List
          itemLayout="vertical"
          dataSource={objArr}
          renderItem={(item) => (
            <List.Item>
              <Row>
                <Col span={18}>
                  <List.Item.Meta
                    //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={
                      <a href={'#/personal/account=' + item.account}>
                        {item.account}申请加入你的小队！
                      </a>
                    }
                    description={'小队名称：' + item.groupId}
                    style={{ width: '50%' }}
                  />
                </Col>

                <Col span={6}>
                  <List.Item.Meta> {item.result}</List.Item.Meta>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    )
  }
}
