<template>
    <div id="pre-fwq">
        <div class="top-pre">
            <kt-pre v-if=JF[fwqId-1].ktTop[0] :ktId=JF[fwqId-1].ktTop[0] :values=prektdataall[JF[fwqId-1].ktTop[0]-1]></kt-pre>
            <kt-pre v-if=JF[fwqId-1].ktTop[1] :ktId=JF[fwqId-1].ktTop[1] :values=prektdataall[JF[fwqId-1].ktTop[1]-1]></kt-pre>
        </div>

        <div class="center-pre-fwq">
            <div class="left-pre-fwq">
                <div class="pre-singlefwq" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;padding:1rem">{{JF[fwqId-1].fwqLeft}}</div>
            </div>

            <div class="mid-pre-fwq">
                <el-tooltip class="item" effect="dark" content="预测冷通道平均温度" placement="top-start">
                    <ltd-temp :ltdData=prefwqdataall[fwqId-1][0] :font-size=0.75 :realtime=0></ltd-temp>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="预测冷通道最大温度" placement="top-start">
                    <ltd-temp :ltdData=prefwqdataall[fwqId-1][1] :font-size=0.75 :realtime=0></ltd-temp>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="预测热通道平均温度" placement="top-start">
                    <rtd-temp :rtdData=prefwqdataall[fwqId-1][2] :font-size=0.75 :realtime=0></rtd-temp>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="预测机组功率" placement="top-start">
                    <power :powerData=prefwqdataall[fwqId-1][3] :font-size=0.7></power>
                </el-tooltip>
            </div>        

            <div class="right-pre-fwq">
                <div class="pre-singlefwq" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;padding:1rem">{{ JF[fwqId-1].fwqRight }}</div>
            </div>
        </div>

        <div class="bottom-pre">
            <kt-pre v-if=JF[fwqId-1].ktBottom[0] :ktId=JF[fwqId-1].ktBottom[0] :values=prektdataall[JF[fwqId-1].ktBottom[0]-1]></kt-pre>
            <kt-pre v-if=JF[fwqId-1].ktBottom[1] :ktId=JF[fwqId-1].ktBottom[1] :values=prektdataall[JF[fwqId-1].ktBottom[1]-1]></kt-pre>
        </div>
    </div>
</template>

<script>
import KtPre from './KtPre.vue'
import LtdTemp from '../components/LtdTemp.vue'
import RtdTemp from '../components/RtdTemp.vue'
import Power from '../components/PowerData.vue'
import axios from 'axios';

export default {
    name: "PreFwq",
    props: ['fwqId','ifBig'],
    components:{
        'kt-pre':KtPre,
        'ltd-temp':LtdTemp,
        'rtd-temp':RtdTemp,
        'power':Power,
    },
    data() {
        return {
            JF:[],
            wholefwqlist:[],
            prektdataall:[],
            prefwqdataall:[],
        }
    },
    methods:{
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
        getpredata(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/predata",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios predata',Response.data)
                    for(var i=0;i<7;i++){
                        var fwqname = '服务器'+this.wholefwqlist[i]
                        var prefwqdata=[]
                        for(var j=0;j<Response.data.length;j++){
                            if(Response.data[j].Equipment==fwqname){
                            prefwqdata.push(Response.data[j].Value0)
                            }
                        }
                        this.prefwqdataall.push(prefwqdata)
                    }
                    for(i=0;i<20;i++){
                        var ktname = '空调'+(i+1).toString()
                        var prektdata=[]
                        for(j=0;j<Response.data.length;j++){
                            if(Response.data[j].Equipment==ktname){
                            prektdata.push(Response.data[j].Value0)
                            }
                        }
                        this.prektdataall.push(prektdata)
                    }
                }),
                Error=>{
                    console.log('axios predata error',Error)
                }
        },
    },
    created () {
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
    },
    mounted(){
        this.getpredata()
        this.timer=setInterval(()=>{
            // console.log('realtime time',(new Date()).toLocaleString('chinese',{hour12:false}))
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))

            this.getpredata()
        },74266)
    }
}
</script>

<style>
#pre-fwq{
    margin:0.1vw;
    width:90%;
    height:100%;
}
.top-pre,.bottom-pre{
    width:100%;
    height:16%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.center-pre-fwq{
    height:70%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.left-pre-fwq,.right-pre-fwq{
    background-color: #303840;
    width:20%;
    height:96%;
    display:grid;
    justify-content: center;
    align-items: center;
}
.mid-pre-fwq{
    background-color: #566472;
    width:36%;
    height:96%;
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.pre-singlefwq{
    height:2rem;
    display:flex;
    align-items: center;
}
</style>