<template>
    <div id="jf-view">
        <el-carousel indicator-position="outside" class="lbt">
            <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timer:"",
            timer1:"",
            selectPath: "/now-status",
            notifyPromise:Promise.resolve(),
            routers: [
                {
                    class: "now-status",
                    value: "机房实时状态",
                    to: "/now-status",
                },
                {
                    class: "fault-detect",
                    value: "设备异常诊断",
                    to: "/fault-detect",
                },
                {
                    class: "hotpoint-risk",
                    value: "热点风险显示",
                    to: "/hotpoint-risk",
                },
                {
                    class: "ltd-changed",
                    value: "冷通道波动显示",
                    to: "/ltd-changed",
                },
                {
                    class: "pre-control",
                    value: "AI 策略显示",
                    to: "/pre-control",
                },
            ],
            imgs: [
                {url: require('../assets/dataanalysis.png'), link: '/now-status'},
                {url: require('../assets/dataanalysis.png'), link: '/fault-detect'},
            ]
        }
    },
    watch: {
        // 侦听路由选中
        $route(to) {
            this.selectPath = to.path;
            // console.log('to.path',to.path)
        },
    },
    methods: {
        linkTo () {
            let activeIndex = this.$refs.carousel.activeIndex
            this.$router.push(this.imgs[activeIndex].link)
        }
    }
}
</script>

<style>
.lbt{
    margin: 0 0 0 0;
    width:83vw;
    height: 60vh;
    background-color: white;
    border-radius: 1rem;
}
.el-carousel__item h3 {
    line-height: 5vh;
    margin: 0;
}
</style>