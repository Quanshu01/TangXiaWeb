<template>
    <div id="big-now-status">
        <div class="bigscreen-top">
            <div></div>
            <div class="bigscreen-title-info">
                <div class="bigscreen-title-name">
                    机房实时状态
                </div>
                <div class="bigscreen-title-text">
                    {{JFname}}机房 当前时刻服务器机组及空调状态
                </div>
            </div>
            <div>
                <div class="bigscreen-close">
                    <el-tooltip class="close-button" effect="light" content="关闭大图" placement="top">
                        <i @click="closeModal" class="el-icon-close"></i>
                    </el-tooltip>
                </div>
            </div>
        </div>

        <!-- 大图 服务器 -->
        <div class="big-fwqNkt">
            <div class="big-now-fwq" v-for="n in JF.length" :key="n.index">
                <fwq :fwqId="n" :ltdNum=2></fwq>
            </div>
        </div>

        <!-- 大图 服务器 图例 -->
        <div class="now-contents">
            <div class="one-content-now">
                <img class="content-pic-now" src="@/assets/icons/cold_thermometer_avg.svg" />
                <div class="content-text-now" style="color:#548ED4;">冷通道温度</div>
            </div>
            <div class="one-content-now">
                <div class="content-pic-now-big" style="background-color:#94290D;"/>
                <div class="content-text-now" style="color:#94290D;">该列冷通道最大温度</div>
            </div>
            <div class="one-content-now">
                <div class="content-pic-now-big" style="background-color:#D0912B;"/>
                <div class="content-text-now" style="color:#D0912B;">该列冷通道次大温度</div>
            </div>
            <div class="one-content-now">
                <img class="content-pic-now" src="@/assets/icons/hot_thermometer.svg" />
                <div class="content-text-now" style="color:#d66468;">热通道温度</div>
            </div>
            <div class="one-content-now">
                <img class="content-pic-now" src="@/assets/icons/power.svg" />
                <div class="content-text-now" style="color:#FFC335;">服务器组功率</div>
            </div>
        </div>
    </div>
</template>

<script>
import Fwq from '../components/Fwq.vue';

export default {
    data() {
        return {
            timer:"",
            JF:[],
        }
    },
    components:{
        'fwq':Fwq,
    },
    created () {
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getktdata()
        this.getfwqall()
    },
    mounted(){
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getktdata()
        this.getfwqall()
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.getktdata()
            this.getfwqall()
        },84692)
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
        getfwqall(){
            this.realtimefwqltdwdsmall=this.$store.state.realtimefwqltdwdsmall;
            this.realtimefwqltdwdbig=this.$store.state.realtimefwqltdwdbig;
            this.realtimefwqrtdwdsmall=this.$store.state.realtimefwqrtdwdsmall;
            this.realtimefwqrtdwdbig=this.$store.state.realtimefwqrtdwdbig;
            this.fwqltdwdDownMaxIndex=this.$store.state.fwqltdwdDownMaxIndex;
            this.fwqltdwdUpMaxIndex=this.$store.state.fwqltdwdUpMaxIndex;
            this.realtimefwqpower=this.$store.state.realtimefwqpower;
        },
        getktdata() {
            this.ktdataall=this.$store.state.ktdataall;
        }
    },
    computed: {
    },
}
</script>

<style>
#big-now-status{
    min-width:90vw;
    padding:1rem 2rem 1rem 0;
    height: 93vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    justify-content: center;
    text-align: center;
    align-items: center;
}
.bigscreen-top{
    width:97%;
    padding:0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.bigscreen-title-info{
    display: grid;
    align-items: center;
    justify-content: center;
    padding:0.6% 3%;
    border-radius: 1rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.bigscreen-title-name{
    font-size: 1.2rem;
    font-weight: 800;
}
.bigscreen-title-text{
    font-size: 0.8rem;
    font-weight: 300;
    color:grey;
}
.bigscreen-close{
    display: grid;
    align-items: center;
    justify-content: center;
    height:60%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    border-radius: 50%;
}
.close-button {
    padding: 1vh;
}
.big-fwqNkt{
    padding:0 2vw;
    min-width:92vw;
    height: 78vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.big-now-fwq{
    width:15%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content-pic-now-big{
    height:0.6rem;
    width:0.8rem;
    margin-right:0.5rem;
    border-radius: 20%;
}
</style>