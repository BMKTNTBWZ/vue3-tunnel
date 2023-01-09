<template>
    <div class="_404">
        <h2 class="m-0">抱歉，页面未找到，<span class="num">{{ countDown }}</span>s后自动跳转到首页
        </h2>
        <img src="../../assets/404.png" alt="页面未找到">
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const countDown = ref('5')
const timer = ref(null)
onMounted(() => {
    function goHome() {
        router.push('/')
        clearInterval(timer.value)
    }
    timer.value = setInterval(() => {
        countDown.value > 0 ? countDown.value-- : goHome()
    }, 1000)
})
</script>

<style scoped>
body {
    background-color: #dceebc;
}

._404 {
    width: 30%;
    margin: 5rem auto;
}

._404 img {
    width: 30rem;
}

._404 .m-0 {
    font-size: 25px;
}

._404 .num {
    color: red;
}
</style>