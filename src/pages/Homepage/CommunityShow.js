import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Layout,List,Space, Row} from 'antd'
import Axios from 'axios';
import '../../style/homepage.css'

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const { Header, Footer, Sider, Content } = Layout;
 
// function limitTxt(txt,count) {
//     var str = txt;
//     if(txt.length>count){
//         str = str.substr(0,count) + '...' ;
//     }
//     return str;
// }

class CommunityShow extends Component {
    constructor(props){
        super(props)

        this.state={
            currentData:[],
            isLoaded:false,
            ava:'../../img/avatar/ava.jpg',
        }

    }


    componentDidMount(){
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        var token = JSON.parse(localStorage.getItem('token')).token
        Axios.get('notice', { headers: { token:token } })
        .then(function (response) {
            console.log(response)
          _this.setState({
            currentData:response.data.detail,
            isLoaded:true
          });
        })
        .catch(function (error) {
          console.log(error);
          _this.setState({
            isLoaded:false,
            error:error
          })
        })
    }

    render() {
        if(!this.state.isLoaded){
            return <div>Loading</div>
        }
        else{
            // if(1){
        return ( 
            // <div style={{height: '400px',width:'600px',margin:'10px 10px',float:'right'}}>
            <div style={{height: '100%',margin:'10px'}}>
                <Layout>
                    <Header theme='light'>
                        <Content>
                            <Row>
                            <h1 style={{color:'white'}}>系统公告</h1>
                            </Row>
                        </Content>
                    </Header>
                    <Content style={{paddingLeft:'30px',paddingRight:'30px'}}>
                        <List
                            // bordered={true}
                            itemLayout="horizontal"
                            dataSource={this.state.currentData}
                            renderItem={item => (
                            <List.Item
                                key={item.noticeId}
                            >
                                <List.Item.Meta
                                title={<h2>{item.title}</h2>}
                                description={
                                    <div>
                                        <Row>
                                            <h3>{item.content}</h3>
                                        </Row>
                                        <Row>
                                            <p>{item.noticeTime}</p>
                                        </Row>
                                    </div>
                                }
                                />
                            </List.Item>
                            )}
                        />
                    </Content>
                </Layout>
            </div>
         );
      }
    }
}
 
export default CommunityShow;