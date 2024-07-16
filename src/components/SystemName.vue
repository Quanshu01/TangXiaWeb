<template>
    <div class="system-name">
        <div class="system-name-jfNtime">
            <div style="font-size: 0.8rem; margin:0 0.2rem">当前位于:</div>
            <div class="nameNchange">
                <div class="jf-name">{{chooseJF}}机房</div>
            </div>
        </div>
        <!-- AI状态栏 - 上右 - 机房参数罗列-->
        <div class="jf-params" shadow="hover">
            <div class="display-jfdata" v-for="n in paramsKey.length" :key="n">
                <div v-if="paramsKey[n-1]=='机房PUE'">
                    <v-gauge class="vue-gause"
                        :value="parseFloat(paramsValue[n-1])"
                        height="100"
                        :maxValue="parseFloat(2)"
                        :decimalPlace="parseFloat(2)"
                        :animationSpeed="parseFloat(5)">
                    </v-gauge>
                    <span class="display-value" style="font-size: 0.7rem;">{{ paramsKey[n-1] }}</span>
                </div>
                <div v-else>
                    <span class="display-value" style="font-size: 0.7rem;">{{ paramsKey[n-1] }}</span> :
                    <span class="display-key" style="font-size: 0.6rem;">{{ paramsValue[n-1] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import VGauge from 'vgauge';

export default {
    name: "SystemName",
    data(){
        return{
            timer:"",
            timer2:"",
            valuegauge: 1.35,
            value:202,
            JFChangedVisibledialog:false,
            JFChangedVisibledrawer:false,
            table: false,
            dialog: false,
            chooseJF:703,
            tempChooseJF:703,
            paramsKey:['机房IT总功率','机房空调总功率','机房PUE'],
            paramsValue:[],
        }
    },
    components: {
        VGauge
    },
    created () {
        this.getjfparamsdata()
        this.paramsdata =  JSON.parse(window.sessionStorage.getItem("jfprms"))
    },
    mounted(){
        this.getjfparamsdata()
        this.paramsdata =  JSON.parse(window.sessionStorage.getItem("jfprms"))
        this.timer2=setInterval(()=>{
            this.getjfparamsdata()
            this.paramsdata =  JSON.parse(window.sessionStorage.getItem("jfprms"))
        },1000)
    },
    methods:{
        cancelForm() {
            this.dialog = false;
            this.JFChangedVisibledrawer = false
            clearTimeout(this.timer);
        },
        getjfparamsdata(){
            axios.get(this.global.apiURL+"/703display/jfdisplay").then(
                Response=>{
                    var paramsdataTemp = {}
                    for(var i=0;i<Response.data.length;i++){
                        paramsdataTemp[Response.data[i].Content]=Response.data[i].Detail
                    }
                    this.paramsValue = Object.values(paramsdataTemp)
                    this.$store.commit('SET_JFPRMS', paramsdataTemp); // 将机房信息保存到 Vuex
                },
            Error=>{
                console.log('axios jfparams error',Error.message)
            });
        },
    }
}
</script>

<style>
.system-name {
    width: 100%;
    height: 23vh;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.vue-gause{
    zoom:0.5;
}
.sys-logo{
    height:2.5rem;
    width:2.5rem;
}
.sys-txt{
    font-size: 1.1rem;
    -webkit-transform-origin-x: 0;            
    font-weight: 800;
    color:#5C5C5C;
    margin-left:0.8rem;
}
.system-name-jfNtime{
    padding:0.3rem;
    height:5vh;
    justify-content: center;
    align-items: center;
}
.nameNchange{
    display: flex;
    justify-content: center;
    align-items: center;
}
.jf-name{
    color:rgb(65, 65, 65);
    font-size: 1.2rem;
    font-weight: 600;
    margin-right: 1rem;
}
.real-time{
    color:grey;
    margin-left:0.5rem;
    font-size: 0.8rem;
    margin-top:0.2rem;
}
.exchange-JF{
    margin:0.1rem;
    height:1.3rem;
    width:1.3rem;
    padding:0.2rem;
    transform:rotate(90deg)
}
.jf-params{
    width: 100%;
    height:8vh;
    border-radius: 0.3rem;
    align-items: center;
    justify-content: center;
}
.display-jfdata{
    padding:0.1vh 0;
}
</style>