import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Helloview/HomeView.vue'
import indexView from '../views/index.vue'
import loginView from '../views/LoginInfo/index.vue'
import { useLoginStore } from '../stores/login.js'
import { useMenuStore } from '../stores/menu.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:"index",
      component:indexView,
      meta:{
        requiresAuth:true
      },
      children:[
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta:{
            requiresAuth:true,
            key:"首页"
          },
        },
        {
          path: '/project',
          name: 'project',
          component: ()=>import("../views/ProjectInfo/index.vue"),
          meta:{
            requiresAuth:true,
            key:"项目基础信息"
          },
        },
        {
          path: '/tunnel',
          name: 'tunnel',
          component: ()=>import("../views/TunnelInfo/index.vue"),
          meta:{
            requiresAuth:true,
            key:"隧道设计信息"
          },
        },
        {
          path: '/build',
          name: 'build',
          component: ()=>import("../views/BuildManage/index.vue"),
          meta:{
            requiresAuth:true,
            key:"施工监控检测"
          },
        },
        {
          path: '/geological',
          name: 'geological',
          component: ()=>import("../views/GeologicalInfo/index.vue"),
          meta:{
            requiresAuth:true,
            key:"超前地质预报"
          },
        },
        {
          path: '/usercenter',
          name: 'usercenter',
          component: ()=>import("../views/UseCenter/index.vue"),
          meta:{
            requiresAuth:true,
            key:"个人中心"
          },
        },
        {
          path: '/plan',
          name: '计划检测',
          component: ()=>import("../views/BuildManage/planText/index.vue"),
          meta:{
            requiresAuth:true,
            key:"计划检测"
          },
        },
        {
          path: '/section',
          name: '切面检测',
          component: ()=>import("../views/BuildManage/sectionText/index.vue"),
          meta:{
            requiresAuth:true,
            key:"切面检测"
          },
        },
      ]
    },
    {
      path:'/login',
      name:"login",
      component:loginView
    },
    {
      path:"/pdf/:id",
      name:"pdf",
      component:()=>import('../views/TunnelInfo/PDFViews/index.vue')
    },
    {
      path:"/:pathMatch(.*)*",
      name:"notfound",
      component:()=>import('../views/Notfound/index.vue')
    }
  ]
})


//路由权限
router.beforeEach((to,form,next)=>{
  if(to.meta.requiresAuth){
    const loginStore = useLoginStore()
    if(!loginStore.token){
      next({
        path:"/login"
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

//动态面包屑
router.afterEach((to,form)=>{
  //存储路由路径
  localStorage.setItem("active",to.path)
  if(to.meta.key){
    const menuStore = useMenuStore()
    menuStore.breadcrumb = to.meta.key
  }
})




export default router
