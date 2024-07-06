<template>
    <div id="home1">
        <el-header class="sys-header">
            <div class="header-real-time">{{ systime }}</div>
            <div style="display:flex; align-items: center;">
                <img class="header-sys-logo" src="@/assets/icons/newlogo.svg" />
                <span class="header-sys-txt">数据中心智慧自动化控制系统</span> 
            </div>
            <div style="display:flex; align-items: center;">
                <div style="margin-right: 1rem;">
                    <el-badge :value=this.global.warnNum class="item">
                        <el-button round size="small" icon="el-icon-bell" @click="dialogWarnTableVisible=true">报警</el-button>
                    </el-badge>
                </div>
                    <el-dialog title="当前报警详情" width="60%"
                        append-to-body
                        :visible.sync="dialogWarnTableVisible">
                        <el-table
                            ref="multipleTable"
                            :data="warnTableData"
                            tooltip-effect="dark"
                            style="width: 100%" height="250"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                prop="num"
                                label="序号"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="报警项"
                                width="80"
                                :filter-method="filterTag"
                                :filters="[{ text: '冷通道热点', value: '冷通道热点' }, { text: '数据异常', value: '数据异常' }, { text: '冷通道波动', value: '冷通道波动' }]">
                            </el-table-column>
                            <el-table-column
                                prop="server"
                                label="服务器"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="content"
                                label="报警内容"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="time"
                                label="时间"
                                width="200"
                                show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="clearAllSelection()" plain>清除全部报警项</el-button>
                        </span>
                    </el-dialog>
            </div>

        </el-header>
        <div class="homepage">
            <div class="all-left">
                <system-name></system-name>
                <data-analysis></data-analysis>
                <ai-show></ai-show>
            </div>
            <div class="all-mid">
                <jf-statues></jf-statues>
            </div>
            <div class="all-right">
                <ai-command></ai-command>
                <ai-show-copy></ai-show-copy>
            </div>
        </div>
    </div>
</template>

<script>
import SystemName from '../components/SystemName.vue';
import JfStatus from '../views/JfStatues.vue'
import AICommandVue from '../components/AICommand.vue';
import DataAnalysis from '../components/DataAnalysis.vue'
import AIShow from '@/components/AIShow.vue';
import AIShowCopy from '@/components/AIShowCopy.vue';

import axios from 'axios';


const synth = window.speechSynthesis;

export default {
    name: 'home-vue',
    metaInfo: {
        requiresAuth: true // 表示这个页面需要认证
    },
    data(){
        return{
            JF:"",
            timer:"",
            timer2:"",
            preHPValue:'',
            dialogWarnTableVisible:false,
            dialogLogTableVisible:false,
            warnTableData:[],
            logTableData:[],
            multipleSelection: [],
            roleDict:{'root':'root','normal':'普通用户','operator':'运维人员'},
            systime:new Date().toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
        }
    },
    mounted(){
        this.getUPSAlert()
        this.AbnormalLTDMessage()
        this.logMessage()
        this.getChange()
        this.getjfparamsdata()

        this.timer=setInterval(()=>{
            this.getUPSAlert()
            this.AbnormalLTDMessage()
            this.logMessage()
            this.getChange()
        },84330)
        this.timer2=setInterval(()=>{
            this.systime=new Date().toLocaleDateString() + " " + (new Date()).toLocaleTimeString()
        },1000)

    },
    created () {
        this.getUPSAlert()
        this.AbnormalLTDMessage()
        this.logMessage()
        this.getChange()
    },
    components: {
            'system-name':SystemName,
            'ai-show':AIShow,
            'ai-show-copy':AIShowCopy,
            'jf-statues':JfStatus,
            'ai-command':AICommandVue,
            'data-analysis':DataAnalysis,
    },
    methods:{
        filterTag(value, row) {
            return row.name === value;
        },
        clearAllSelection(){
            this.global.warnNum=0
            this.warnTableData=[]
        },
        //下载日志功能
        downloadLog() {
            // 获取表格数据
            const tableData = this.warnTableData;
            // 将表格数据转换为CSV格式
            const csvContent = this.convertToCSV(tableData);
            // 创建Blob对象
            const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
            // 创建下载链接
            const downloadLink = document.createElement('a');
            const url = URL.createObjectURL(blob);
            // 设置下载链接的属性
            downloadLink.href = url;
            downloadLink.download = 'logTable.csv';
            // 将下载链接添加到文档中并触发点击事件
            document.body.appendChild(downloadLink);
            downloadLink.click();
            // 移除下载链接
            document.body.removeChild(downloadLink);
            // 释放URL对象
            URL.revokeObjectURL(url);
        },
        convertToCSV(data) {
            const header = Object.keys(data[0]).join(',') + '\n';
            const rows = data.map(row => {
                return Object.values(row).join(',') + '\n';
            });
            return header + rows.join('');
        },
        logMessage(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/log",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    this.logTableData=[]
                    this.OpenAILog=Response.data['OpenAI_Log']
                    this.reSetLog = Response.data['reSet_Log']
                    this.confirmParamsLog=Response.data['confirmParams_Log']
               
                    this.dialoglogTableVisible=true
                    if(this.OpenAILog.length){
                        for(var b=0;b<this.OpenAILog.length;b++){
                            var OpenAITabledata={}
                            OpenAITabledata['name']='打开AI'
                            OpenAITabledata['num']=b+1
                            OpenAITabledata['id']=this.OpenAILog[b][0]
                            OpenAITabledata['content']=this.OpenAILog[b][3]
                            OpenAITabledata['role']=this.OpenAILog[b][2]
                            OpenAITabledata['systime']=this.OpenAILog[b][1]
                            this.LogTableData.push(OpenAITabledata)
                        }
                    }
                    if(this.reSetLog.length){
                        for(b=0;b<this.reSetLog.length;b++){
                            var reSetData={}
                            reSetData['name']='一键恢复'
                            reSetData['num']=b+1
                            reSetData['content']=this.reSetLog[b][2]
                            reSetData['role']=this.reSetLog[b][1]
                            reSetData['systime']=this.reSetLog[b][0]
                            this.LogTableData.push(reSetData)
                        }
                    }
                    if(this.confirmParamsLog.length){
                        for(var i=0;i<this.confirmParamsLog.length;i++){ 
                            var confirmParamsTabledata={}
                            confirmParamsTabledata['name']='修改AI参数'
                            confirmParamsTabledata['id']=this.confirmParamsLog[i][0]
                            confirmParamsTabledata['num']=i+1
                            confirmParamsTabledata['content']=this.confirmParamsLogd[i][3]
                            confirmParamsTabledata['role']=this.confirmParamsLog[i][2]
                            confirmParamsTabledata['systime']=this.confirmParamsLog[i][1]
                            this.LogTableData.push(confirmParamsTabledata)
                        }
                    }
                    
                },
                Error=>{
                    console.log('axios logMessage error',Error)
                }
            )
        },
        handleSpeak(text){
            const msg = new SpeechSynthesisUtterance();
            msg.text = text;
            msg.lang = 'zh-CN';
            msg.volume = '1';
            msg.rate = 1;
            msg.pitch = 1;
            synth.speak(msg);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        getChange(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/cold_detect_design",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios cold_detect_design',Response)
                    this.num=Response.data[0]
                    this.time=Response.data[1]
                },
                Error=>{
                    console.log('axios cold_detect_design error',Error)
            });
        },
        getUPSAlert(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/"+this.JFname+"/upsalert",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios upsalert',Response.data)
                    if(Response.data){
                        this.$confirm('机房功率大于等于450kW', 'UPS告警', {
                            confirmButtonText: '确定',
                            type: 'warning'
                            }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '已知UPS告警信息'
                            });         
                        });
                    }
                },
                Error=>{
                    console.log('axios upsalert error',Error)
            });
        },
        AbnormalLTDMessage() {
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/alert",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    this.warnTableData=[]
                    this.nowHotPoint=Response.data['real_hot']
                    this.abnormalDataWarn = Response.data['data_abnormal_detail']
                    this.ltdChanged=Response.data['cold_change']

                    this.global.warnNum = this.nowHotPoint.length+this.abnormalDataWarn.length+this.ltdChanged.length

                    if(this.global.warnNum){
                        this.dialogWarnTableVisible=true
                        if(this.nowHotPoint.length){ //当前机房热点
                            this.handleSpeak(this.JF+'机房 出现'+this.nowHotPoint.length+"个 真实冷通道热点报警")

                            for(var b=0;b<this.nowHotPoint.length;b++){ // 冷通道波动
                                var nowHPTabledata={}
                                nowHPTabledata['name']='冷通道热点'
                                nowHPTabledata['num']=b+1
                                nowHPTabledata['id']=this.nowHotPoint[b][0]
                                nowHPTabledata['content']=this.nowHotPoint[b][3]
                                nowHPTabledata['server']=this.nowHotPoint[b][2]
                                nowHPTabledata['time']=this.nowHotPoint[b][1]
                                this.warnTableData.push(nowHPTabledata)
                            }
                        }
                        if(this.abnormalDataWarn.length){ //数据异常热点
                            this.handleSpeak(this.JF+'机房 出现'+this.abnormalDataWarn.length+"个 数据异常报警,")
                            for(b=0;b<this.abnormalDataWarn.length;b++){ // 冷通道预测热点
                                var abnormalData={}
                                abnormalData['name']='数据异常'
                                abnormalData['num']=b+1
                                abnormalData['content']=this.abnormalDataWarn[b][2]
                                abnormalData['server']='-'
                                abnormalData['time']=this.abnormalDataWarn[b][0]
                                this.warnTableData.push(abnormalData)
                            }
                        }
                        if(this.ltdChanged.length){ // 语音播报冷通道波动出现报警个数
                            this.handleSpeak(this.JF+'机房 出现'+this.ltdChanged.length+"个 冷通道波动报警")
                            if(this.num && this.time){
                                this.handleSpeak("报警阈值是"+this.num+"度，报警时间是"+this.time+"分钟")
                            }
                            for(var i=0;i<this.ltdChanged.length;i++){ // 冷通道波动
                                var changedTabledata={}
                                changedTabledata['name']='冷通道波动'
                                changedTabledata['id']=this.ltdChanged[i][0]
                                changedTabledata['num']=i+1
                                changedTabledata['content']=this.ltdChanged[i][3]
                                changedTabledata['server']=this.ltdChanged[i][2]
                                changedTabledata['time']=this.ltdChanged[i][1]
                                this.warnTableData.push(changedTabledata)
                            }
                        }
                    }
                },
                Error=>{
                    console.log(this.JFname+' JF dont get! - ',Response.message)
                    this.resbody = Error.message
                }
            )
        },
        getjfparamsdata(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/jfparams",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios jfparams sys',Response.data)
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
    },
    // computed: {
    //     userName() {
    //         return this.$store.state.user.userName
    //     }
    // }
}
</script>

<style>
#home1{
    overflow-x: hidden;
}
.sys-header{
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.85);
    display: flex; 
    align-items: center;
    justify-content: space-between; 
    box-shadow: 0 0 10px 0 grey;
}
.nav-logo {
    position: absolute;
    padding-top: -1%;
    left: 5%;
    font-size: 40px;
}
.header-sys-logo{
    width:1.6rem;
    height:1.6rem;
    margin:0
}
.header-sys-logo2{
    height:1.6rem;
    margin:0
}
.header-sys-txt{
    font-size: 1rem;
    margin: 0 0.5rem;
    font-weight: 600;
}
.header-role-txt{
    font-size: 0.6rem;
}
.header-real-time{
    color:black;
    font-size: 0.8rem;
    font-weight: 500;
}
.homepage{
    display: flex;
    justify-content: center;
    align-items: center;
    margin:1vw;
    width:98vw;
}
.all-left{
    width:17vw;
}
.all-mid{
    width:61vw;
    margin:1vw;
}
.all-right{
    width:17vw;
}
</style>
