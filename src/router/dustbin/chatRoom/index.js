export default {
  path: '/chatRoom',
  component: () => import('@/page/chatRoom'),
  children: [{
      path: 'friendList',
      component: () => import('@/components/friendList')
    },
    // // {
    // //   path: 'room',
    // //   component: () => import('@/components/room')
    // // },
    // {
    //   path: 'record',
    //   component: () => import('@/components/record')
    // },
    // {
    //   path: "friendOperation",
    //   component: () => import("@/components/friendOperation")
    // },
    {
      path: "/chatRoom",
      redirect: '/chatRoom/friendList'
    }
  ]
}
