import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Login')
// import Login from "@/components/Login";
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Home')
// import Home from "@/components/Home";
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Welcome')
// import Welcome from "@/components/Welcome";

const Users = () => import(/* webpackChunkName: "users_rights_roles" */ '@/components/user/Users')
// import Users from "@/components/user/Users";
const Rights = () => import(/* webpackChunkName: "users_rights_roles" */ '@/components/power/Rights')
// import Rights from "@/components/power/Rights";
const Roles = () => import(/* webpackChunkName: "users_rights_roles" */ '@/components/power/Roles')
// import Roles from "@/components/power/Roles";

const Cate = () => import(/* webpackChunkName: "cate_params" */ '@/components/goods/Cate')
// import Cate from "@/components/goods/Cate";
const Params = () => import(/* webpackChunkName: "cate_params" */ '@/components/goods/Params')
// import Params from "@/components/goods/Params";

const GoodsList = () => import(/* webpackChunkName: "goodlist_add" */ '@/components/goods/List')
// import GoodsList from "@/components/goods/List";
const Add = () => import(/* webpackChunkName: "goodlist_add" */ '@/components/goods/Add')
// import Add from "@/components/goods/Add";

const Order = () => import(/* webpackChunkName: "order_report" */ '@/components/order/Order')
// import Order from "@/components/order/Order";
const Report = () => import(/* webpackChunkName: "order_report" */ '@/components/report/Report')
// import Report from "@/components/report/Report";

Vue.use(Router)

const router = new Router({
    routes: [
        {path: "/", redirect:'/login'},
        {path:'/login', component: Login},
        {
            path:'/home',
            component: Home,
            redirect: '/welcome',
            children: [
                {path: '/welcome', component: Welcome},
                {path: '/users', component: Users},
                {path: '/rights', component: Rights},
                {path: '/roles', component: Roles},
                {path: '/categories', component: Cate},
                {path: '/params', component: Params},
                {path: '/goods', component: GoodsList},
                {path: '/goods/add', component: Add},
                {path: '/orders', component: Order},
                {path: '/reports', component: Report}
            ]
        }
    ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) return next('/login');
    next();
})

export default router;