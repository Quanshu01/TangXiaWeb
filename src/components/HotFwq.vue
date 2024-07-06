<template>
    <div id="hot-fwq">
        <div class="fwq-title">
            <div class="left-hp">
                <div class="hotrisk-singlefwq" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;padding:1rem">{{ JF[fwqId-1].fwqLeft }}</div>
            </div>
            <div class="mid-hp">
            </div>
            <div class="right-hp">
                <div class="hotrisk-singlefwq" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;padding:1rem">{{ JF[fwqId-1].fwqRight }}</div>
            </div>
        </div>
        <div class="fwq-body">
            <div class="left-hp">
                <div class="fwq-risk">
                    <div class="top-risk">
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdLeftindex][0].length" :key="n.index">
                            <risk-block v-if=ifBig :riskData=hotpointriskall[JF[fwqId-1].fwdLeftindex][0][n-1] :riskDataHeight=1.6 :riskDataWidth=1.6></risk-block>
                        </div>
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdLeftindex][0].length" :key="n.index">
                            <risk-block v-if="ifBig===false" :iftext=false :riskData=hotpointriskall[JF[fwqId-1].fwdLeftindex][0][n-1]></risk-block>
                        </div>
                    </div>
                    <div class="bottom-risk">
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdLeftindex][1].length" :key="n.index">
                            <risk-block v-if=ifBig :riskData=hotpointriskall[JF[fwqId-1].fwdLeftindex][1][n-1] :riskDataHeight=1.6 :riskDataWidth=1.6></risk-block>
                        </div>
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdLeftindex][1].length" :key="n.index">
                            <risk-block v-if="ifBig===false" :iftext=false :riskData=hotpointriskall[JF[fwqId-1].fwdLeftindex][1][n-1]></risk-block>
                        </div>
                    </div>
                </div>


            </div>
            <div class="mid-hp">
            </div>
            <div class="right-hp">
                <div class="fwq-risk">
                    <div class="top-risk">
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdrightindex][0].length" :key="n.index">
                            <risk-block v-if=ifBig :riskData=hotpointriskall[JF[fwqId-1].fwdrightindex][0][n-1] :riskDataHeight=1.6 :riskDataWidth=1.6></risk-block>
                        </div>
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdrightindex][0].length" :key="n.index">
                            <risk-block v-if="ifBig===false" :iftext=false :riskData=hotpointriskall[JF[fwqId-1].fwdrightindex][0][n-1]></risk-block>
                        </div>
                    </div>
                    <div class="bottom-risk">
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdrightindex][1].length" :key="n.index">
                            <risk-block v-if=ifBig :riskData=hotpointriskall[JF[fwqId-1].fwdrightindex][1][n-1] :riskDataHeight=1.6 :riskDataWidth=1.6></risk-block>
                        </div>
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdrightindex][1].length" :key="n.index">
                            <risk-block v-if="ifBig===false" :iftext=false :riskData=hotpointriskall[JF[fwqId-1].fwdrightindex][1][n-1]></risk-block>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import RiskBlock from '../components/RiskBlock.vue'
export default {
    name: "HotFwq",
    props: ['fwqId','ifBig'],
    components:{
        'risk-block':RiskBlock,
    },
    data() {
        return {
            JF:[],
            fwqlist:[],
            hotpointriskall:[],
            colorList: ['#67C23A','#E6A23C','#F56C6C'],
        }
    },
    mounted(){
            this.gethotpointrisk()
        
        this.timer=setInterval(()=>{
            this.gethotpointrisk()
        },84579)
    },
    created () {
        this.gethotpointrisk()
    },
    methods:{
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
    },
}
</script>

<style>
#hot-fwq{
    margin:0.1rem;
    width:100%;
    height:100%;
}
.fwq-title{
    margin:0.2rem 1rem 0 0;
    width:98%;
    height:15%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fwq-body{
    margin:0 0 0 0;
    width:98%;
    height:82%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.left-hp,.right-hp{
    background-color: #303840;
    width:40%;
    height:100%;
    display:grid;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.6)
}
.mid-hp{
    background-color: #b5c5dc;
    width:16%;
    height:100%;
    display: grid;
    justify-content: center;
    align-items: center;
}
.hotrisk-singlefwq{
    height:1rem;
    display:flex;
    align-items: center;
}
.fwq-risk{
    display: flex;
    justify-content: center;
    align-items: center;
}
.top-risk,.bottom-risk{
    display: grid;
    padding:0.1rem;
}
</style>