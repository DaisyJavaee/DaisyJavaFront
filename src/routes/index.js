import AdminIndex from "../pages/admin/adminIndex";
import CompManagement from "../pages/admin/compManagement";
import PageNotFound from "../pages/pageNotFound";
import PostPage from "../pages/findteam/PostPage";
import FindTeam from "../pages/findteam/FindTeam";
import CompetitionPage from "../pages/competition/competitionPage";
import AllCompetitionPage from "../pages/competition/allCompetitionPage";
import Homepage from "../pages/homepage";

import CompNotice from "../pages/message/compNotice";
import Apply from "../pages/personal/userReceivedApplication";
import SystemNotice from "../pages/message/systemNotice";
import TeamMessage from "../pages/message/teamMessage";
import UserTeam from "../pages/personal/userTeam"
import UserComp from "../pages/personal/userComp"
import UserInform from "../pages/personal/userInform"
import Editinform from "../pages/personal/editInform"
import EditTeam from "../pages/personal/editTeam"

import SearchPage from "../pages/search/searchPage";
import SearchResult from "../pages/search/searchResult";
import Login from "../pages/login";
import Register from "../pages/register";
import SearchContentComp from "../components/search/searchContentComp";
import SearchContentComm from "../components/search/searchContentComm";
import SearchContentUsr from "../components/search/searchContentUsr";
import DeliverSystemAnnouncement from "../pages/admin/deliverSystemAnnouncement";

export const adminRoutes = [{
    path: "/admin/comp",
    title: "比赛管理",
    component: CompManagement
},
{
    path: "/admin/sysannounce",
    title: "发布系统公告",
    component: DeliverSystemAnnouncement
},
]

export const mainRoutes = [{
    path: '/404',
    component: PageNotFound
},
{
    path: "/home",
    title: "主页",
    component: Login
},
{
    path: "/homePage",
    title: "主页公告",
    component: Homepage
},
{
    path: "/postpage/MatchId=:ProjctId/groupId=:groupId/Pid=:id",
    title: "寻找队伍帖",
    component: PostPage
},

{
    path: "/findTeam/id=:compID",
    title: "寻找队伍",
    component: FindTeam
},
{
    path: "/compPage/id=:compID",
    title: "比赛页面",
    component: CompetitionPage
},
{
    path: "/search",
    title: "搜索页面",
    component: SearchPage
},
{
    path: "/searchResult",
    title: "搜索结果页面",
    component: SearchResult
},
{
    path: "/editinform",
    title: "编辑个人资料",
    component: Editinform
},
{
    path: "/editTeam/:teamID",
    title: "编辑小队",
    component: EditTeam
},
{
    path: "/login",
    title: "登录",
    component: Login
},
{
    path: "/register",
    title: "注册",
    component: Register
},
{
    path: "/allCompPage",
    title: "比赛列表",
    component: AllCompetitionPage
}]

    
export const searchRoutes = [
{
    path: "/searchResult/type=comp/:kw",
    title: "比赛",
    component: SearchContentComp
},
{
    path: "/searchResult/type=comm/:kw",
    title: "社区",
    component: SearchContentComm
},
{
    path: "/searchResult/type=user/:kw",
    title: "用户",
    component: SearchContentUsr
}
]

export const messageRoutes = [
{
    path: "/message/system",
    title: "系统公告",
    component: SystemNotice
},
{
    path: "/message/comp",
    title: "比赛通知",
    component: CompNotice
},
{
    path: "/message/team",
    title: "队伍消息",
    component: TeamMessage
},
{
    path: "/message/apply",
    title: "组队申请",
    component: Apply
}]
