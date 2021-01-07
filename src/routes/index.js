import CompManagement from '../pages/admin/compManagement'
import PageNotFound from '../pages/pageNotFound'
import PostPage from '../pages/findteam/PostPage'
import FindTeam from '../pages/findteam/FindTeam'
import CompetitionPage from '../pages/competition/competitionPage'
import AllCompetitionPage from '../pages/competition/allCompetitionPage'
import Homepage from '../pages/homepage'
import Login from '../pages/login'
import Register from '../pages/register'
import DeliverSystemAnnouncement from '../pages/admin/deliverSystemAnnouncement'
import EditTeam from '../pages/personal/editTeam'
import Editinform from '../pages/personal/editInform'

export const adminRoutes = [
  {
    path: '/admin/comp',
    title: '比赛管理',
    component: CompManagement,
  },
  {
    path: '/admin/sysannounce',
    title: '发布系统公告',
    component: DeliverSystemAnnouncement,
  },
]

export const mainRoutes = [
  {
    path: '/404',
    component: PageNotFound,
  },
  {
    path: '/home',
    title: '主页',
    component: Login,
  },
  {
    path: '/homePage',
    title: '主页公告',
    component: Homepage,
  },
  {
    path: '/postpage/MatchId=:ProjctId/groupId=:groupId',
    title: '寻找队伍帖',
    component: PostPage,
  },

  {
    path: '/findTeam/id=:compID',
    title: '寻找队伍',
    component: FindTeam,
  },
  {
    path: '/compPage/id=:compID',
    title: '比赛页面',
    component: CompetitionPage,
  },
  {
    path: '/editinform',
    title: '编辑个人资料',
    component: Editinform,
  },
  {
    path: '/editTeam/:teamID',
    title: '编辑小队',
    component: EditTeam,
  },
  {
    path: '/login',
    title: '登录',
    component: Login,
  },
  {
    path: '/register',
    title: '注册',
    component: Register,
  },
  {
    path: '/allCompPage',
    title: '比赛列表',
    component: AllCompetitionPage,
  },
]