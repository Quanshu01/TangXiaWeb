<template>
    <div id="big-abormal-detect">
        <div class="close">
            <big-title bigname="故障检测" bigcontent="分析机房故障深层次来源"></big-title>
            <el-tooltip class="close-button" effect="light" content="关闭大图" placement="top">
                <i @click="closeModal" class="el-icon-circle-close"></i>
            </el-tooltip>
        </div>
        <div class="chart-view">
            <div class="choose-kt">
                <el-button-group  v-for="n in 20" :key="n.index">
                </el-button-group>
            </div>

            <div class="kt-chart">
                <el-empty description="暂无内容"></el-empty>
            </div>
        </div>
    </div>
</template>

<script>
import BigTitle from '@/components/BigTitle.vue';

export default {
    components:{
        'big-title':BigTitle
    },
    data(){
        return{
        }
    },
    methods:{
        closeModal: function () {
            this.$FModal.hide();
        },
    },
}
</script>

<style>
#big-abormal-detect{
    min-width:90vw;
    padding:1rem 2rem 1rem 0;
    height: 88vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    justify-content: center;
    text-align: center;
}
.close {
    padding:1rem 1rem 0 1rem;
    width:100%;
    height:10%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    background-color: antiquewhite;
}
.big-name{
    padding:0 3vw;
    font-size: 1.4vw;
    font-weight: 800;
}
.big-name-note{
    padding:0 1rem;
    font-size: 0.8rem;
    font-weight:300;
    color:#757575;
}
.chart-view{
    height:80vh;
    justify-content: center;
    align-items: center;
}
.choose-kt{
    display: flex;
    align-items: center;
    justify-content: center;
    height:4vh;
    padding:1vh 0.5vh;
}
.kt-chart{
    display: flex;
    align-items: center;
    justify-content: center;
    height:72vh;
    width:100%;
}
</style>