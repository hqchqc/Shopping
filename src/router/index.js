import vue from 'vue'
import vueRouter from 'vue-router'

const home = ()=> import('views/Home/Home.vue')
const category = ()=> import('views/Category/Category.vue')
const cart = ()=> import('views/Cart/Cart.vue')
const profile = ()=> import('views/Profile/Profile.vue')
const detail = ()=> import('views/Detail/Detail.vue')

vue.use(vueRouter);

const routes = [
    {
        path:'',
        redirect: '/home'
    },
    {
        path:'/home',
        component: home
    },
    {
        path:'/cart',
        component:cart
    },
    {
        path:'/category',
        component:category
    },
    {
        path:'/profile',
        component:profile
    },
    {
        path:'/detail/:iid',
        component:detail
    }
];

const router = new vueRouter({
    routes,
    mode:'history'
})

export default router