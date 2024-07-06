<template>
    <div id="big-fault">
        <div class="bigscreen-top">
            <div></div>
            <div class="bigscreen-title-info">
                <div class="bigscreen-title-name">
                    设备异常诊断
                </div>
                <div class="bigscreen-title-text">
                    {{JFname}}机房 当前时刻机组及空调异常详情显示
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

        <div class="big-fault-detail">
            <div class="big-data-show">
                <div class="big-data-fault">
                    <title-top name="数据异常" :font-size="1" 
                        content="当前时刻 空调参数及冷热通道温度异常罗列">
                    </title-top>
                    <div class="big-data-tables">
                        <div class="big-kt-table">
                            <div class="big-kt-normal">
                                <title-top name="空调参数正常范围" :font-size="0.8"
                                    content="当前时刻 空调参数正常范围（可根据需求修改阈值）">
                                </title-top>
                                <div class="big-kt-normal-detail">
                                    <el-card class="big-box-card0" shadow="hover">
                                        <div v-for="n in form1.length" :key="n.index" class="item">
                                            {{ktParams[n-1] }} : {{ form1[n-1] }}
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                            <div class="big-kt-fault">
                                <title-top name="空调参数异常罗列" :font-size="0.8"
                                    content="当前时刻 空调参数超出所设阈值 表格">
                                </title-top>
                                <div class="kt-fault-detail">
                                    <kt-abnormal :font-size="0.6"></kt-abnormal>
                                </div>
                            </div>
                        </div>
                        <div class="big-server-table">
                            <div class="big-fwq-normal">
                                <title-top name="冷热通道温度正常范围" :font-size="0.8"
                                    content="当前时刻 冷热通道温度正常范围（可根据需求修改阈值）">
                                </title-top>
                                <div class="big-kt-normal-detail">
                                    <el-card class="big-box-card0" shadow="hover">
                                        <div v-for="n in form2.length" :key="n.index">
                                            {{fwqParams[n-1] }} : {{ form2[n-1] }}
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                            <div class="big-fwq-fault">
                                <title-top name="冷热通道温度异常罗列" :font-size="0.8"
                                    content="当前时刻 冷热通道温度超出所设阈值 表格">
                                </title-top>
                                <div class="big-kt-fault-detail">
                                    <fwq-abnormal :font-size="0.6"></fwq-abnormal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="big-fault-fwqs">
                <div class="big-fault-fwq" v-for="n in JF.length" :key="n.index">
                    <fwq :fwqId="n" :ltdNum="1" :Big=1></fwq>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleTop from '@/components/TitleTop.vue';
import KTAbnormal from '@/components/KTAbnormal.vue';
import FWQAbnormal from '@/components/FWQAbnormal.vue';
import FaultFwq from '../components/FaultFwq.vue';
import axios from 'axios';

export default {
    data() {
        return {
            timer:"",
            timer2:"",
            JF:[],
            dialogFormVisible:false,
            dialogFormVisible1:false,
            ktParams:['送风温度','回风温度','压缩机容量','风机转速','冷凝风机转速'],
            fwqParams:['冷通道温度','热通道温度'],
            form1:[],
            sfTemp:[],
            hfTemp:[],
            ysj:[],
            fj:[],
            lnfj:[],
            form2:[],
            ltdwd:[],
            rtdwd:[],
            marks: [
                {
                    20: '20°C',
                    30: '30°C',
                    26: {
                        style: {
                            color: '#1989FA'
                        },
                        label: this.$createElement('strong', '26°C')
                    }
                },
                {
                    20: '20°C',
                    26: '26°C',
                    32: {
                        style: {
                            color: '#1989FA'
                        },
                        label: this.$createElement('strong', '32°C')
                    }
                },
                {
                    30: '30',
                    60: '60',
                    90: {
                        style: {
                            color: '#1989FA'
                        },
                        label: this.$createElement('strong', '90')
                    },
                },
                {
                    30: '30',
                    60: '60',
                    90: {
                        style: {
                            color: '#1989FA'
                        },
                        label: this.$createElement('strong', '90')
                    },
                },
                {
                    30: '30',
                    60: '60',
                    90: {
                        style: {
                            color: '#1989FA'
                        },
                        label: this.$createElement('strong', '90')
                    },
                },
            ],
            marks1: [
                {
                    20: '20°C',
                    23: '23°C',
                    27: {
                        style: {
                            color: '#1989FA'
                        },
                        label: this.$createElement('strong', '27°C')
                    }
                },
                {
                    20: '20°C',
                    26: '26°C',
                    32: {
                        style: {
                            color: '#1989FA'
                        },
                        label: this.$createElement('strong', '32°C')
                    }
                },
            ],
        }
    },
    components:{
        'title-top':TitleTop,
        'kt-abnormal':KTAbnormal,
        'fwq-abnormal':FWQAbnormal,
        'fwq':FaultFwq,
    },
    created () {
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
    },
    mounted(){
        this.setKTnormal()
        this.setFWQnormal()
        this.changeJFinfo()
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        },78284)
        this.timer2=setInterval(()=>{
            this.setKTnormal()
            this.setFWQnormal()
        },76800)
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
        handleClose() {
            this.dialogFormVisible = false;
            this.$message({
                message: "取消修改 空调正常范围",
            });
        },
        handleClose1() {
            this.dialogFormVisible1 = false;
            this.$message({
                message: "取消修改 服务器正常范围",
            });
        },
        changeSF(val){
            this.sfTemp=val
        },
        changeHF(val){
            this.hfTemp=val
        },
        changeYSJ(val){
            this.ysj=val
        },
        changeFJ(val){
            this.fj=val
        },
        changeLNFJ(val){
            this.lnfj=val
        },
        changeLTDtemp(val){
            this.ltdwd=val
        },
        changeRTDtemp(val){
            this.rtdwd=val
        },
        setFWQnormal(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/diagnosis_server_design",{
                headers:{
                    'token':window.sessionStorage.getItem("token")//
                },
            }).then(
                Response=>{
                    // console.log('axios diagnosis_server_design',Response)
                    this.form2 = Response.data
                    this.ltdwd = Response.data[0]
                    this.rtdwd = Response.data[1]
                },
                Error=>{
                    console.log('axios diagnosis_server_design error',Error)
                }
            );
        },
        setKTnormal(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/diagnosis_kt_design",{
                headers:{
                    'token':window.sessionStorage.getItem("token")//
                },
            }).then(
                Response=>{
                    this.form1 = Response.data
                    this.sfTemp = Response.data[0]
                    this.hfTemp = Response.data[1]
                    this.ysj = Response.data[2]
                    this.fj = Response.data[3]
                    this.lnfj = Response.data[4]
                },
                Error=>{
                    console.log(this.JFname+' JF diagnosis server design - dont get!',Response.message)
                    this.resbody = Error.message
                }
            );
        },
    }
}
</script>

<style>
#big-fault{
    min-width:90vw;
    padding:1rem 2rem 1rem 0;
    height: 91vh;
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
.big-fault-detail{
    padding:1rem;
    width:94vw;
    height:75vh;
}
.big-data-show{
    width:100%;
    height:30%;
    display:flex;
    justify-content: center;
    align-items: center;
}
.big-data-fault{
    width:100%;
    height:100%;
    background-color:#f1f1f1;
    border-radius: 1rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}
.big-fault-fwqs{
    height:59vh;
    width:100%;
    padding:0.2rem;
    display:flex;
    justify-content: center;
    align-items: center;
}
.big-fault-fwq{
    width:15%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fault-detect{
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fault-detect-detail{
    width:95%;
    height:100%;
    justify-content: center;
    align-items: center;
}
.big-data-tables{
    width:100%;
    height:85%;
    display:flex;
    justify-content: center;
    align-items: center;
}
.big-kt-table{
    width:49%;
    height:96%;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
}
.big-kt-normal{
    width:30%;
    height:96%;
    display: grid;
}
.big-kt-fault{
    width:70%;
    height:96%;
}
.big-fwq-normal{
    width:30%;
    height:96%;
    display: grid;
}
.big-fwq-fault{
    width:80%;
    height:96%;
}
.big-kt-normal-detail{
    width:97%;
    height:80%;
    padding: 0.1vh 0.1vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item {
    padding: 0.1vh 0;
}
.big-box-card0 {
    font-size: 0.7rem;
    width: 90%;
    height:11vh;
    line-height:2vh;
    overflow-y: scroll;
    text-align: center;
    align-items: center;
}
.color-block{
    height:0.5rem;
    width:0.5rem;
    background-color: aqua;
}
.big-kt-fault-detail{
    width:97%;
    height:80%;
    padding: 0.1vh 0.1vw;
}
.big-server-table{
    width:49%;
    height:96%;
    margin-left:1vh;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
}
.unstable-kt{
    width:19%;
    height:100%;
}
.big-unstable-kt-detail{
    width:96%;
    height:78%;
    margin:0;
    padding:0.5vh;
}
.fault-fwq{
    height:55%;
    width:100%;
    display:flex;
}
</style>