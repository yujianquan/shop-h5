import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return (originalReplace.call(this, location) as any).catch((err: any) => err)
}

export const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        redirect:'home'
    },
    {
        path: "/home",
        name: "home",
        meta:{
            isFooter:true,
            title:'首页'
        },        
        component: () => import("../views/HomeView.vue")
    },
    {
        path: "/cart",
        name: "cart",
        meta:{
            isFooter:true,
            title:'购物车'
        },
        component:() => import("../views/CartView.vue")
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router
