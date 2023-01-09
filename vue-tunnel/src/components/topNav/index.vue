<template>
    <div class="top-nav">
        <div class="toggle">
            <div class="toggle-menu">
                <el-icon v-if="menuStore.isCollapse" class="icon" @click="closeMenu(false)">
                    <Fold />
                </el-icon>
                <el-icon v-else class="icon" @click="openMenu(true)">
                    <Expand />
                </el-icon>
            </div>
        </div>
        <div class="breadcrumb">
            <el-breadcrumb>
                <el-breadcrumb-item>{{ $t("messages.navs") }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ menuStore.breadcrumb }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="menu">
            <div class="dropDown">
                <div class="lang">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            语言切换
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="changeLang('zh')">中文</el-dropdown-item>
                                <el-dropdown-item @click="changeLang('en')">英文</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{ loginStore.username }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <RouterLink to="/usercenter">个人中心</RouterLink>
                            </el-dropdown-item>
                            <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useLoginStore } from '../../stores/login.js';
import { useMenuStore } from '../../stores/menu';
import { useRouter } from 'vue-router';
const loginStore = useLoginStore()
const menuStore = useMenuStore()
const router = useRouter()

const exitLogin = () => {
    loginStore.username = "",
        loginStore.permission = "",
        loginStore.token = ""
    router.push('/login')
}

//侧边栏的显示与隐藏
const openMenu = (flag) => {
    menuStore.isCollapse = flag
}
const closeMenu = (flag) => {
    menuStore.isCollapse = flag
}

//中英文切换
const changeLang = (lang)=>{
    localStorage.setItem("lang",lang)
    location.reload()
}





</script>
<style scoped>
.top-nav {
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
}

.toggle {
    padding-top: 17.5px;
    padding-left: 10px;
}

.toggle-menu {
    float: left;
}

.icon {
    font-size: 25px;
}

.breadcrumb {
    float: left;
    line-height: 60px;
    margin-top: 6px;
    margin-left: 20px;
    cursor: pointer;
}

.menu {
    position: absolute;
    right: 20px;
    line-height: 60px;
    margin-top: 5px;
    cursor: pointer;
}

.lang{
    float: left;
    margin-right: 50px;
    cursor: pointer;
}
</style>