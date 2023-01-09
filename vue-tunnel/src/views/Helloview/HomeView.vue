<template>
    <div class="card">
        <div class="boxItem">
            <el-icon class="box-icon" style="color: #40c9c6;">
                <Tickets />
            </el-icon>
            <span class="box-title">隧道数量：1000个</span>
        </div>
        <div class="boxItem">
            <el-icon class="box-icon" style="color: #36a3f7;">
                <Check />
            </el-icon>
            <span class="box-title">检验合格：980个</span>
        </div>
        <div class="boxItem">
            <el-icon class="box-icon" style="color: #34bfa5;">
                <Clock />
            </el-icon>
            <span class="box-title">正在施工：190个</span>
        </div>
        <div class="boxItem">
            <el-icon class="box-icon" style="color: #f4516c;">
                <Odometer />
            </el-icon>
            <span class="box-title">地质预报：5000个</span>
        </div>
    </div>
    <div class="line" id="line"></div>
    <div class="charts">
        <div id="charts-radar"></div>
        <div id="charts-rose"></div>
        <div id="charts-bar"></div>
    </div>

</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import api from '../../api/index'
const { proxy } = getCurrentInstance()
onMounted(() => {
    api.getLine().then(res => {
        if (res.data.status === 200) {
            proxy.$line('line', res.data.result.lines)
        }
    }).catch(error => {
        console.log(error);
    }),
        // 加载图表
        proxy.$radar("charts-radar")
    proxy.$rose("charts-rose")
    proxy.$bar("charts-bar")
})
</script>

<style scoped>
.card {
    display: flex;
}

.card .boxItem {
    flex: 1;
    height: 150px;
    margin: 20px;
    padding: 10px;
    background: #fff;
}

.card .boxItem .box-icon {
    display: block;
    font-size: 80px;
    color: #40c9c6;
    line-height: 150px;
    float: left;
    padding-left: 10px;
}

.card .boxItem:nth-child(1) {
    margin-left: 0;
}

.card .boxItem:nth-child(4) {
    margin-right: 0;
}

.box-title {
    display: block;
    font-size: 20px;
    color: #666;
    line-height: 150px;
    float: right;
    padding-right: 10px;
}

.line {
    width: 100%;
    height: 300px;
    background-color: #fff;
}

.charts {
    display: flex;
}

.charts div {
    flex: 1;
    height: 450px;
    margin: 20px;
    padding: 10px;
    background-color: #fff;
}

.charts div:nth-child(1) {
    margin-left: 0;
}

.charts div:nth-child(3) {
    margin-right: 0;
}
</style>