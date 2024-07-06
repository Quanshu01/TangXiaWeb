<template>
    <div id="big-data-analysis">
        <div class="bigscreen-top">
            <div></div>
            <div class="bigscreen-title-info">
                <div class="bigscreen-title-name">
                    评估系统
                </div>
                <div class="bigscreen-title-text">
                    {{JFname}}机房 AI运行中及运行后机房参数记录及评估
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
        <div class="choose-kt">

        </div>

    </div>
</template>

<script>

export default {
    components:{
    },
    data(){
        return{
            
        }
    },
    created(){
    },
    mounted(){
        this.timer=setInterval(()=>{
        },81727)
    },
    methods:{
        closeModal: function () {
            this.$FModal.hide();
        },
    },

}
</script>

<style>
#big-data-analysis{
    padding:1rem 2rem 1rem 0;
    height: 93vh;
    width:100%;
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
.close {
    padding:1rem 1rem 0 1rem;
    width:96%;
    height:10%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.choose-data-dy{
    display: flex;
    height:5vh;
    width:90vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.choose-kt{
    display:grid;
    place-items: center;
    height:4vh;
    width:96vw;
}
.ana-click2kt{
    font-size:0.6vw;
    padding:0.5vh 0.5vw;
}
.ai-now{
    height:50%;
    width:100%;
    background-color:azure;
    display: block;
}
.chose-fwqicon{
    height:8vh;
    background-color: aqua;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ai-after{
    height:30%;
    width:100%;
    background-color:aliceblue;
}
.kt-chart{
    display: flex;
    align-items: center;
    justify-content: center;
    height:72vh;
    width:100%;
    padding:0 1rem;
}
</style>