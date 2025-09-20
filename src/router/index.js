import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/views/LogIn.vue'
import Register from '@/views/Register.vue'
import UserList from '../views/ChatsFunction/UserListView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
   },
    {
      path: '/login',
      name: 'login',
      component: LogIn,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/ChatsList',
      name: 'ChatsList',
      component: () => import('../views/ChatsList.vue'),
      children: [
        {
          path: '/ChatsList/chat',
          name: 'Chat',
          component: () => import('../views/ChatsFunction/Chat.vue'),
        },
        {
          path: '/ChatsList/userList',
          name: 'GroupChat',
          component: UserList,
        },
      ],
    },
    {
      path:"/test",
      name:"test",
      component: () => import('../views/Test.vue')
    }
    
  ],
})

export default router
