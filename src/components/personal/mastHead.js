import React, { Component } from 'react'
import { Card, Avatar } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { isLogined } from '../../utils/auth'

const data = JSON.parse(localStorage.getItem('userData'))

export default class MastHead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: null,
      role: this.props.role,
      image: null,
    }
    if (isLogined()) {
      var token = JSON.parse(localStorage.getItem('token')).token
      axios
        .get(`/user/profile/${this.state.account}`, {
          headers: { token: token },
        })
        .then((response) => {
          var pictureurl = response.data.icon
          axios.get(pictureurl).then((res) => {
            axios.get(res.data).then((re) => {
              this.setState({
                image: re.data,
                nickname: response.data.nickname,
              })
            })
          })
        })
    } else {
      window.location.hash = '/home'
    }
  }

  render() {
    return (
      <div className="mastHead_card">
        <Card bordered={false} style={{ textAlign: 'center' }}>
          <Avatar
            src={this.state.image}
            size="large"
            style={{ marginBottom: 20 }}
          />
          <p>{this.state.nickname}</p>
          {this.props.role ? (
            <Link to="/editinform">
              <EditOutlined />
            </Link>
          ) : null}
        </Card>
      </div>
    )
  }
}
