<template>
    <iframe :src="PDFurl" width="100%" height="100%"></iframe>
</template>

<script setup>
import { useRoute } from "vue-router"
import { onMounted ,ref } from "vue";
import api from '../../../api/index.js'

const route = useRoute()

const PDFurl = ref("")

onMounted(()=>{
    api.getPDFViews({id:route.params.id}).then(res=>{
        if(res.data.status===200){
            PDFurl.value = "http://localhost:3000/"+res.data.result.urlName
        }else{
            console.log(res.data.msg);
        }
    }).catch(err=>{
        console.log(err);
    })
})
</script>

<style scoped>

</style>