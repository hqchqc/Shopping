import vue from 'vue'
import vueRouter from 'vue-router'

const home = ()=> import('../views/Home/Home.vue')
const category = ()=> import('../views/Category/Category.vue')
const cart = ()=> import('../views/Cart/Cart.vue')
const profile = ()=> import('../views/Profile/Profile.vue')

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
    }
];

const router = new vueRouter({
    routes,
    mode:'history'
})

export default router