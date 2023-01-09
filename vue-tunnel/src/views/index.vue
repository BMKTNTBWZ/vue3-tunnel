<template>
    <div class="container">
        <Drawer />
        <SliderNav />
        <div class="right-container" :style="{ marginLeft: menuStore.isCollapse ? '64px' : '180px' }">
            <TopNav />
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import SliderNav from '../components/sliderNav/index.vue'
import TopNav from '../components/topNav/index.vue'
import api from '../api/index.js'
import { useMenuStore } from '../stores/menu';
import { useLoginStore } from '../stores/login';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue'
// import Dynamic from '../router/DynamicRouter.js'
import System from '../views/SystemManage/index.vue'
import Work from "../views/WorkManage/index.vue"
import Drawer from '../components/Drawer/index.vue'

const menuStore = useMenuStore()
const loginStore = useLoginStore()
const router = useRouter()

onMounted(() => {
    api.getAuthority({
        user: loginStore.permission
    }).then(res => {
        if (res.data.status === 200) {
            menuStore.menuData = res.data.menuData.menus
            //判断当前用户权限
            if (loginStore.permission === "admin") {
                router.addRoute("index", { path: 'system', component: System })
                router.addRoute("index", { path: 'work', component: Work })
            }
        }
    }).catch(error => {
        console.log(error);
    })
})
</script>
<style scoped>
.right-container {
    margin-left: 180px;
    transition: 0.3s ease-in;
}

.content {
    padding: 10px;
}
</style>