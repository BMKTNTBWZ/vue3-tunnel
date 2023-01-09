<template>
    <div class="login-container">
        <el-form :model="user" class="user" size="large">
            <div class="title-container">
                <h3 class="title">隧道管理系统</h3>
            </div>
            <el-form-item props="username">
                <el-input :prefix-icon="User" v-model="user.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item props="password">
                <el-input :prefix-icon="Lock" v-model="user.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%;margin-bottom: 30px;" @click.native.prevent="loginHandler">登录</el-button>
        </el-form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import api from '../../api/index.js'
import { User,Lock } from '@element-plus/icons-vue'
import { useLoginStore } from '../../stores/login.js'
import { useRouter } from 'vue-router'
const loginStore =useLoginStore()
//获取路由对象
const router = useRouter()
//声明用户信息
const user = reactive({
    username: "",
    password: ""
})
//登陆事件
function loginHandler() {
    api.getLogin({
        username:user.username,
        password:user.password
    }).then(res=>{
        if(res.data.status === 200){
            loginStore.token = res.data.token
            loginStore.username = res.data.username
            loginStore.permission = res.data.permission
            router.push('/')
        }else{
            ElMessage.error(res.data.msg)
        }
    })

}
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
}

.user{
    width: 500px;
    padding: 200px 50px 0;
    margin: 0 auto ;
}

.title-container .title{
    font-size: 30px;
    margin: 20px;
    color: #fff;
    text-align: center;
}
</style>