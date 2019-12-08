import requestFriend from "@/components/requestFriend"
export default {
  path: "/home",
  component: () => import("@/page/home"),
  meta: {
    keepAlive: true,
  },
  children: [{
    path: "requestFriend",
    name: "sendFriendRequest",
    component: requestFriend,
    // component: () => import("@/components/requestFriend"),
    meta: {
      keepAlive: true,
    }
  }, ]
}
