<template>
    <div class="setting">
        <!-- 控制抽屉按钮 -->
        <el-button size="large" type="primary" class="setting-btn" @click="drawer = true">
            <el-icon class="setting-icon">
                <Setting />
            </el-icon>
        </el-button>
        <el-drawer v-model="drawer" title="系统设置" size="20%" class="drawer">
            <el-icon class="logoShowIcon"><TurnOff /></el-icon>
            <span class="logoShow">LOGO的显示与隐藏</span>
            <el-switch v-model="store.toggleStore"  class="logoShowSwitch"/>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSystemStore } from '../../stores/system.js'
const store = useSystemStore()
const drawer = ref(false)
const logoToggle = ref(false)
</script>

<style scoped>
.setting {
    position: fixed;
    right: 0;
    top: 300px;
    z-index: 100;
}

.setting-btn {
    width: 30px;
    height: 30px;
}

.setting-icon {
    font-size: 20px;
}

.drawer{
    float: left;
}

.logoShowIcon{
    font-size: 30px;
    margin:0 10px 0 0;
}

.logoShow{
    position: absolute;
    top: 98px;
}

.logoShowSwitch{
    position: absolute;
    right: 10px;
    top: 90px;
}
</style>