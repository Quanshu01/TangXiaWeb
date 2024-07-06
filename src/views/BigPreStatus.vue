<template>
  <div id="big-pre-status">
    <div class="close">
      <big-title bigname="机组预测状态" bigcontent="预测15分钟后 机组及空调状态"></big-title>
      <el-tooltip class="close-button" effect="light" content="关闭大图" placement="top">
          <i @click="closeModal" class="el-icon-circle-close"></i>
      </el-tooltip>
    </div>

    <div class="big-fwqNkt">
      <div class="big-pre-fwq" v-for="n in JF.length" :key="n.index">
        <pre-fwq :fwqId="n"></pre-fwq>
      </div>
    </div>

    <div class="content-pre">
      <div class="one-content">
        <img class="content-pic-big" src="@/assets/icons/songfeng.svg" />
        <div class="content-text-big" style="color:#3FAD45;">空调 送风温度</div>
      </div>
      <div class="one-content">
        <img class="content-pic-big" src="@/assets/icons/huifeng.svg" style="-webkit-transform:rotate(180deg);"/>
        <div class="content-text-big" style="color:#B165EC;">空调 回风温度</div>
      </div>
      <div class="one-content">
        <img class="content-pic-big" src="@/assets/icons/cold_thermometer_avg.svg" />
        <div class="content-text-big" style="color:#548ED4;">服务器组 冷通道平均温度</div>
      </div>
      <div class="one-content">
        <img class="content-pic-big" src="@/assets/icons/cold_thermometer.svg" />
        <div class="content-text-big" style="color:#63A8F9;">服务器组 冷通道最大温度</div>
      </div>
      <div class="one-content">
        <img class="content-pic-big" src="@/assets/icons/hot_thermometer.svg" />
        <div class="content-text-big" style="color:#d66468;">服务器组 热通道温度</div>
      </div>
      <div class="one-content">
        <img class="content-pic-big" src="@/assets/icons/power.svg" />
        <div class="content-text-big" style="color:#FFC335;">服务器组 功率</div>
      </div>
    </div>
  </div>
</template>

<script>
import PreFwq from '@/components/PreFwq.vue';
import BigTitle from '@/components/BigTitle.vue';

export default {
  data() {
      return {
          timer:"",
          JF:[],
      }
  },
  components:{
    'pre-fwq':PreFwq,
    'big-title':BigTitle
  },
  created () {
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
  },
  mounted(){
    this.timer=setInterval(()=>{
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
      },60571)
  },
  methods: {
    changeJFinfo(){
      if(this.JFname=="201"){
          this.JF=this.global.JF201
          this.fwqlist=this.global.JF201FWQlist
          this.fwqdoublelist=this.global.JF201FWQ
          this.JFktNum=this.global.JF201KTnum
      }
      if(this.JFname=="202"){
          this.JF=this.global.JF202
          this.fwqlist=this.global.JF202FWQlist
          this.fwqdoublelist=this.global.JF202FWQ
          this.JFktNum=this.global.JF202KTnum
      }
      if(this.JFname=="203"){
          this.JF=this.global.JF203
          this.fwqlist=this.global.JF203FWQlist
          this.fwqdoublelist=this.global.JF203FWQ
          this.JFktNum=this.global.JF203KTnum
      }
      if(this.JFname=="204"){
          this.JF=this.global.JF204
          this.fwqlist=this.global.JF204FWQlist
          this.fwqdoublelist=this.global.JF204FWQ
          this.JFktNum=this.global.JF204KTnum
      }
      if(this.JFname=="205"){
          this.JF=this.global.JF205
          this.fwqlist=this.global.JF205FWQlist
          this.fwqdoublelist=this.global.JF205FWQ
          this.JFktNum=this.global.JF205KTnum
      }
    },
    closeModal: function () {
      this.$FModal.hide();
    },
  }
}
</script>

<style>
#big-pre-status{
    min-width:90vw;
    padding:1rem 2rem 1rem 0;
    height: 88vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    justify-content: center;
    align-items: center;
}
.big-fwqNkt{
    padding:0 2rem;
    width:95%;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.big-pre-fwq{
  width:15%;
  height: 100%;
}
.content-pre{
  padding: 1rem 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.one-content{
  margin: 0.5%;
  width:15%;
  height:80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-pic-big{
  height:1.2rem;
  width:1.6rem;
}
.content-text-big{
  font-size: 0.8rem;
  font-weight: 900;
}
</style>