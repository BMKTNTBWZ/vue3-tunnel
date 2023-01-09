import System from "../views/SystemManage/index.vue"
import Work from "../views/WorkManage/index.vue"

const Dynamic = [
    {
        path: '/work',
        name: 'work',
        component: Work,
        meta: {
            requiresAuth: true,
            key: "工作监督管理"
        },
    },
    {
        path: '/system',
        name: 'system',
        component: System,
        meta:{
          requiresAuth:true,
          key:"系统信息管理"
        },
    },
]

export default Dynamic