import Vue from 'vue'
import Router from 'vue-router'
// import chatRoomRouter from './chatRoom'
import loginRouter from '@/page/login'
import registerRouter from '@/page/register'
// import homeRouter from "./home"

import sendFriendRequest from "@/components/requestFriend"
import home from "@/page/home"
import friendListRouter from "@/components/myFriendList"
// import getHistoryReadListRouter from '@/components/privateHistoryPage';

Vue.use(Router)

export default new Router({
  // mode:history,
  base:"/webChat/",
  routes: [
    //登录页
    {
      path: '/login',
      component: loginRouter,
      meta: {
        keepAlive: false
      }
    },
    //新建好友列表页
    {
      name:"newFriendGroup",
      path:"/newFriendGroup",
      component:()=>import("@/components/newFriendGroup"),
      meta:{
        keepAlive:true,
      }
    },
    //好友分组列表页
    {
      name: "friendList",
      path: "/myFriendList/:groupId",
      component: friendListRouter,
      meta: {
        keepAlive: true,
      }
    },
    //好友聊天室
    {
      name: "privateChatRoom",
      path: "/privateChatroom/:friendId/:name/:avatar",
      component: () => import("@/components/privateChatroom"),
      meta: {
        keepAlive: true,
      }
    },
    //好友的历史消息列表
    {
      name: "privateHistoryPage",
      path: "/privateHistoryPage/:fromId/:toId",
      component: () => import("@/components/privateHistoryPage"),
      meta: {
        keepAlive: true,
      }
    },
    //注册页
    {
      path: '/register',
      component: registerRouter,
      meta: {
        keepAlive: false
      }
    },
    //登录聊天室的主页
    {
      path: "/home",
      component: home,
      meta: {
        keepAlive: true,
      },

    },
    //提交好友请求的页面
    {
      path: "/requestFriend",
      component: sendFriendRequest,
      meta: {
        keepAlive: true,
      },
      children: [{
        path: "result",
        component: () => import('@/components/searchResult'),
        meta: {
          keepAlive: true,
        }
      }]
    },
    //查询好友请求并处理好友请求
    {
      path: "/solveRequest",
      component: () => import("@/components/solveFriendRequest"),
      meta: {
        keepAlive: true,
      },
      //查询结果
      // children: [{
      //   path: "requestResult",
      //   component: () => import("@/components/friendRequestResult"),
      //   meta: {
      //     keepAlive: true,
      //   }
      // }]
    },
    //查询自己已经处理过的好友请求
    {
      path:"/acceptRejectFriend",
      component:()=>import("@/components/acceptRejectFriend"),
      meta:{
        keepAlive:true,
      }
    },
    {
      path: '/*',
      redirect: '/login',
    }
  ]
})
