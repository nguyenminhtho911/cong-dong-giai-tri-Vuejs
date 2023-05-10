import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import ChangePassword from './pages/ChangePassword'
import PostDetail from './pages/PostDetail'
import PostUpload from './pages/PostUpload'
import UserPage from './pages/UserPage'
import UserProfile from './pages/UserProfile'
import Search from './pages/Search'
import DashboardPosts from './pages/DashboardPosts'
import PostEdit from './pages/PostEdit'
import AdminManage from './pages/AdminManage'

import { ifNotAuthenticated, ifAuthenticated, ifAuthenticatedIsAdmin } from './plugins/authenticate'

Vue.use(VueRouter) 

const routes = [
    { 
        path: '/', 
        name: 'home-page',
        component: HomePage 
    },
    { 
        path: '/login', 
        name: 'login',
        component: Login,
        beforeEnter: ifNotAuthenticated, // router chỉ vào khi chưa login - ko yêu cầu login
    },
    { 
        path: '/register', 
        name: 'register',
        component: Register,
        beforeEnter: ifNotAuthenticated, // router chỉ vào khi chưa login - ko yêu cầu login
    },
    { 
        path: '/user/:id', 
        name: 'user-page',
        component: UserPage,
        beforeEnter: ifAuthenticated, // router chỉ cho phép vào khi đã đăng nhập - router yêu cầu login
    },
    { 
        path: '/user/:id/profile', 
        name: 'user-profile',
        component: UserProfile,
        beforeEnter: ifAuthenticated,
    },
    { 
        path: '/user/:id/password', 
        name: 'change-password',
        component: ChangePassword 
    },
    { 
        path: '/post-detail/:id', 
        name: 'post-detail',
        component: PostDetail
    },
    {
        path: '/upload',
        name: 'upload',
        component: PostUpload,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/dashboard/posts',
        name: 'dashboard-posts',
        component: DashboardPosts,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/dashboard/post-edit/:id',
        name: 'post-edit',
        component: PostEdit,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/admin',
        name: 'admin-manage',
        component: AdminManage, 
        beforeEnter: ifAuthenticatedIsAdmin,
    }
]

const scrollBehavior = function (to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
}

const router = new VueRouter({
    mode: 'history',
    scrollBehavior,
    routes
});

export default router;