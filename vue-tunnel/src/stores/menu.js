import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu',{
    state:()=>{
        return{
            isCollapse : false,
            breadcrumb:"",
            menuData:[]
        }
    },
    persist:{
        enabled:true,
        strategies:[
            {
                key:"menu",
                storage:localStorage
            }
        ]
    }
})