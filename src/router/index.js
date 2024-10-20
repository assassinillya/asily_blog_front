import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Blog from '@/views/blog.vue'
import friends from '@/views/friends.vue'
import BlogCategory from '@/views/blogCategory.vue'
import Admin from '@/views/admin.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    // 这里要改为用路径获取, 后端也要改
    path: '/blogId/:blogId',
    // path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/friends',
    name: 'friends',
    component: friends
  },
  {
    path: '/blogCategory',
    name: 'blogCategory',
    component: BlogCategory
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
