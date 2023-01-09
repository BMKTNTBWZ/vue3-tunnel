import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system',{
    state:()=>{
        return{
            toggleStore:true
        }
    },
    persist:{
        enabled:true,
        strategies:[
            {
                key:"system",
                storage:localStorage
            }
        ]
    }
})