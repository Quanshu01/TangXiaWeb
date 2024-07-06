<template>
    <div class="data-analysis">
        <title-top name="评估系统"
            content="AI开启前后对比">
        </title-top>
        <div class="datapicNbig">
            <div class="data-pic">
                <img class="pic-data" src="@/assets/icons/loginCover.svg" />
            </div>
            <div class="data-big">
                <el-tooltip class="item" effect="light" content="查看大图" placement="top-start">
                    <el-button size="mini" class="go-big-view" icon="el-icon-zoom-in" @click="goBigDataAnalysis"></el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import TitleTop from '@/components/TitleTop.vue';
import BigEvaluateSystem from '@/views/BigEvaluateSystem.vue';

export default {
    components: {
        'title-top':TitleTop,
    },
    methods:{
        goBigDataAnalysis(){
            this.$FModal.show(
                { 
                    component: BigEvaluateSystem,
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