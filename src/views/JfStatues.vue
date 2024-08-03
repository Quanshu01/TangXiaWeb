<template>
    <div class="jf-statues">
        <div class="dashboard">
            <div class="dashboard-title">
                <router-link
                    v-for="(router, index) in routers"
                        :key="index"
                        :to="router.to">
                    <el-button class="click2JZ" type="info" round :to="router.to" plain size="mini">{{ router.value }}</el-button>
                </router-link>
            </div>
            <div class="status">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "JfStatues",
    data() {
        return {
            selectPath: "/",
            notifyPromise:Promise.resolve(),
            routers: [
                {
                    class: "now-status",
                    value: "机房实时状态",
                    to: "/now-status",
                },
                {
                    class: "ltd-changed",
                    value: "温度波动显示",
                    to: "/ltd-changed",
                },
            ],
        }
    },
    watch: {
        // 侦听路由选中
        $route(to) {
            this.selectPath = to.path;
        },
    },
}
</script>

<style>
.jf-statues{
    margin: 0 0 0 0;
    width: 100%;
    height: 86vh;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 1rem;
    display: flex;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.dashboard {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width:100%;
    padding: 0 1rem;
}
.lbt{
    background-color: antiquewhite;
}
.dashboard-title {
    margin: 6vh 10rem 0 10rem;
    width:100%;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button-box {
    display: flex;
    justify-content: flex-end;
}
.nav {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 11.5rem;
    height: 2rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    cursor: default;
}
.nav:hover {
    background-color: var(--Gray-2);
}
.nav.checked {
    background-color: var(--Theme-1);
}
.nav-name {
    color: var(--Gray-7);
    font-size: 0.75rem;
    line-height: 1.5rem;
    font-weight: 600;
}
.status{
    width:100%;
    min-width: 44.5rem;
    height:82%;
    display: flex;
}
.click2JZ{
    margin: 2rem;
    font-size: 0.8vw;
    width:8vw;
    height:4vh;
    padding:1%;
}
</style>