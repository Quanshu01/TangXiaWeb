<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    setTimeout(function() {
        location.reload() //登陆成功页面整体刷新一下
    },3600000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId); // 在组件销毁前清除定时器
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}

body {
  background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
  background-blend-mode: screen;
  overflow: auto;
  -webkit-text-size-adjust:none;
  scrollbar-width: none;
  margin: 0;
  padding: 0;
  width:100vw;
}
</style>
