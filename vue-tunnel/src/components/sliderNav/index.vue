<template>
    <div class="slider-nav" :style="{ width: menuStore.isCollapse ? '64px' : '180px' }">
        <div class="logo" v-show="store.toggleStore">{{ menuStore.isCollapse ? "隧道" : '隧道工程项目' }}</div>
        <el-menu background-color="#304156" text-color="#fff" active-text-color="#ffd04b" :default-active="active"
            :collapse="menuStore.isCollapse" router class="el-menu">
            <template v-for="(item, index) in menuStore.menuData" :key="index">
                <el-sub-menu v-if="item.children" :index="item.path">
                    <template #title>
                        <component class="icon" :is="item.icon"></component>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="childItem.path" v-for="(childItem, childIndex) in item.children"
                        :key="childIndex">
                        <span>{{ childItem.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.path">
                    <component class="icon" :is="item.icon"></component>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from '../../stores/menu';
import { useSystemStore } from '../../stores/system';
const menuStore = useMenuStore()
const store = useSystemStore()
const active = ref("/")
if (localStorage.getItem("active")) {
    active.value = localStorage.getItem('active')
}
</script>

<style scoped>
.slider-nav {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 180px;
    background-color: #304156;
    transition: 0.3s ease-in;
}

.logo {
    width: 100%;
    color: #fff;
    font-size: 24px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
}

.icon {
    width: 20px;
    padding-right: 10px;
}
</style>