import { defineStore } from 'pinia'

export const useLoginStore = defineStore("login",{
    state:()=>{
        return{
            token:"",
            permission:"",
            username:""
        }
    },
    //持久化存储
    persist:{
        enabled:true,
        strategies:[
            {
                key:"login",
                storage:localStorage
            }
        ]
    }

})