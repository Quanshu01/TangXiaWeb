<template>
    <div id="big-hotpoint-risk">
        <div class="bigscreen-top">
            <div></div>
            <div class="bigscreen-title-info">
                <div class="bigscreen-title-name">
                    热点风险显示
                </div>
                <div class="bigscreen-title-text">
                    {{JFname}}机房 服务器机组冷通道测点热点风险评估
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
        <div class="big-hp-fwqNkt">
            <div class="big-hp-fwq" v-for="n in JF.length" :key="n.index">
                <hot-fwq :fwqId="n" :ifBig="true"></hot-fwq>
            </div>
        </div>
        <div class="content-hot">
            <div class="one-content-hot">
                <div class="content-pic-hot" style="background-color:#67C23A;"></div>
                <div class="content-text-hot" style="color:#67C23A;">热点低风险区</div>
            </div>
            <div class="one-content-hot">
                <div class="content-pic-hot" style="background-color:#E6A23C;"></div>
                <div class="content-text-hot" style="color:#E6A23C;">热点中风险区</div>
            </div>
            <div class="one-content-hot">
                <div class="content-pic-hot" style="background-color:#F56C6C;"></div>
                <div class="content-text-hot" style="color:#F56C6C;">热点高风险区</div>
            </div>
            <div class="one-content-hot">
                <div class="content-pic-hot" style="background-color:#0F1114;"></div>
                <div class="content-text-hot" style="color:#0F1114;">弃用冷通道测点</div>
            </div>
        </div>
    </div>
</template>

<script>
import HotFwq from '@/components/HotFwq.vue';

export default {
    data() {
        return {
            timer:"",
            JF:[],
            hotpointriskall:[],
        }
    },
    components:{
        'hot-fwq':HotFwq,
    },
    created () {
        this.gethotpointrisk()
    },
    mounted(){
            this.gethotpointrisk()

        this.timer=setInterval(()=>{
            this.gethotpointrisk()
        },66303)
    },
    methods: {
        closeModal: function () {
            this.$FModal.hide();
        },
        gethotpointrisk(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/riskdatanew0216",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
            Response=>{
                // console.log('axios riskdatanew0216',Response.data)
                this.hotpointriskall=[]
                for(var i=0;i<this.fwqlist.length;i++){
                    var fwqTop = Response.data[0][this.fwqlist[i]]['up']
                    var fwqBottom = Response.data[0][this.fwqlist[i]]['down']
                    this.hotpointriskall.push([Object.values(fwqTop),Object.values(fwqBottom)])
                }
            },
            Error=>{
                console.log('axios riskdatanew0216 error',Error)
            });
        },
    }
}
</script>

<style>
#big-hotpoint-risk{
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
.big-hp-fwqNkt{
    padding:2vh 2vw 0 2vw;
    width:95%;
    height: 74vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.big-hp-fwq{
    width:15%;
    height: 100%;
    padding:0.2rem;
}
.content-hot{
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.one-content-hot{
    margin: 0.5%;
    width:15%;
    height:80%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content-pic-hot{
    height:1rem;
    width:2rem;
    margin-right:0.5rem;
    border-radius: 20%;
}
.content-text-hot{
    font-size: 1rem;
    font-weight: 900;
}
</style>