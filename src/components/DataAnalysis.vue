<template>
    <div class="data-analysis">
        <title-top name="数据分析"
            content="所有空调各参数历史波动曲线">
        </title-top>
        <div class="datapicNbig">
            <div class="data-pic">
                <img class="pic-data" src="@/assets/icons/loginCover.svg" />

            </div>
            <div class="data-big">
                <el-tooltip class="item" effect="light" content="查看大图" placement="top-start">
                    <el-button icon="el-icon-zoom-in"  size="mini" class="go-big-view" @click="goBigDataAnalysis"></el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import TitleTop from '@/components/TitleTop.vue';
import BigDataAnalysis from '@/views/BigDataAnalysis.vue'
export default {
    name: "DataAnalysis",
    components: {
        'title-top':TitleTop,
    },
    methods:{
        goBigDataAnalysis(){
            this.$FModal.show(
                { 
                    component: BigDataAnalysis,
                    maxHeight: '100%',
                    width: '96%', 
                    height:'90%',
                    placement: 'center center'  
                },
            )
        },
    },
}
</script>

<style>
.data-analysis {
    margin: 1vh 0 0 0;
    width: 100%;
    height: 18vh;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.85);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.datapicNbig{
    width:100%;
    height:90%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.data-pic{
    width:60%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.pic-data{
    width:100%;
    height:80%;
}
.data-big{
    width:20%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>