<template>
    <div class="pre-status">
        <div class="pre-fwdNkt">
            <div class="pre-fwqs">
                <div class="pre-fwq" v-for="n in JF.length" :key="n.index">
                    <keep-alive>
                        <pre-fwq :fwqId="n"></pre-fwq>
                    </keep-alive>
                </div>
            </div>
            <div class="pre-contents">
                <div class="one-content">
                    <img class="content-pic" src="@/assets/icons/songfeng.svg" />
                    <div class="content-text" style="color:#3FAD45;">空调 送风温度</div>
                </div>
                <div class="one-content">
                    <img class="content-pic" src="@/assets/icons/huifeng.svg" style="-webkit-transform:rotate(180deg);"/>
                    <div class="content-text" style="color:#B165EC;">空调 回风温度</div>
                </div>
                <div class="one-content">
                    <img class="content-pic" src="@/assets/icons/cold_thermometer.svg" />
                    <div class="content-text" style="color:#8698d0;">服务器组 冷通道平均温度</div>
                </div>
                <div class="one-content">
                    <img class="content-pic" src="@/assets/icons/cold_thermometer.svg" />
                    <div class="content-text" style="color:#8698d0;">服务器组 冷通道最大温度</div>
                </div>
                <div class="one-content">
                    <img class="content-pic" src="@/assets/icons/hot_thermometer.svg" />
                    <div class="content-text" style="color:#d66468;">服务器组 热通道温度</div>
                </div>
                <div class="one-content">
                    <img class="content-pic" src="@/assets/icons/power.svg" />
                    <div class="content-text" style="color:#FFC335;">服务器组 功率</div>
                </div>
            </div>
        </div>
        <div class="pre-extend-fwqNkt">
                <el-tooltip class="item" effect="light" content="查看大图" placement="top-start">
                    <el-button icon="el-icon-zoom-in" circle @click="goBigPreStatus"></el-button>
                </el-tooltip>
        </div>

    </div>
</template>

<script>
import PreFwq from '../components/PreFwq.vue';
import BigPreStatus from './BigPreStatus.vue';

export default {
    name: "PreStatus",
    data() {
        return {
            timer:"",
            JF:[],
        }
    },
    components:{
        'pre-fwq':PreFwq,
    },
    created () {
    },
    mounted(){
    },
    methods:{
        goBigPreStatus(){
            this.$FModal.show(
                { 
                    component: BigPreStatus,
                    maxHeight: '100%',
                    width: '96%', 
                    height:'100%',
                    placement: 'center center'  
                },
            )
        },
        
    },
}
</script>

<style>
.pre-status{
    width:100%;
    height:94%;
    display: flex;
}
.pre-fwdNkt{
    width:100%;
    height: 100%;
}
.pre-fwqs{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width:100%;
    height: 84%;
}
.pre-fwq{
    width:15%;
    height: 100%;
}
.pre-contents{
    width:100%;
    height: 16%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.pre-extend-fwqNkt{
    width:5%;
    height: 100%;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}
.content-pic{
    height:1rem;
    width:1.5rem;
}
.content-text{
    font-size: 0.6rem;
    font-weight: 900;
}
</style>