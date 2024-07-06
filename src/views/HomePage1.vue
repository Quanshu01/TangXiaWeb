<template>
    <div id="home1">
        <el-header class="sys-header">
            <div class="header-real-time">{{ systime }}</div>
            <div style="display:flex; align-items: center;">
                <img class="header-sys-logo" src="@/assets/icons/newlogo.svg" />
                <span class="header-sys-txt">数据中心智慧自动化控制系统</span> 
            </div>
            <div style="display:flex; align-items: center;">
                <!--实时数据导出-->
                <div>
                    <el-button round size="small" icon="el-icon-download" style="margin-right:15px" @click="DataMessage()" @focus="inttime()">数据</el-button>
                    <el-dialog title="实时数据导出" width="70%" 
                        :visible.sync="dialogDataTableVisible">
                        <div class="choice-time">
                            <div style="margin-left:2vw">
                                <el-date-picker
                                    v-model="exportChosenTime"
                                    size="mini"
                                    type="datetimerange"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    @change="datachangeTime()">
                                </el-date-picker>
                            </div>
                        </div>

                        <div Style="font-weight:bold;padding: 20px 20px 10px;">选择空调或服务器</div>
                        <div class="bigaipre-choose-fwq">
                            <el-radio-group v-for="n in JFktNum" :key="n.index">
                                <el-button class="click2KT" size="mini" @click="chooseKT($event)">空调{{n}}</el-button>
                            </el-radio-group>
                            <el-radio-group>
                                <el-button style="font-size:0.6vw;padding:0.5vh 0.5vw;" size="mini" @click="chooseKT($event)">全部空调</el-button>
                            </el-radio-group>
                        </div>
                        <div class="bigaipre-choose-fwq">
                            <el-radio-group v-for="n in fwqdoublelist" :key="n.index">
                                <el-button class="click2KT" size="mini" @click="chooseFWQ($event)">{{n}}列</el-button>
                            </el-radio-group>
                            <el-radio-group>
                                <el-button style="font-size:0.6vw;padding:0.5vh 0.5vw;" size="mini" @click="chooseFWQ($event)">全部服务器</el-button>
                            </el-radio-group>
                        </div>
                        <div v-show="showClearButton">
                            <div Style="font-weight:bold;padding: 20px 20px 10px;">选择参数</div>
                                <div class="bigaipre-choose-fwq">
                                    <el-radio-group v-for="n in params" :key="n.index">
                                        <el-button  style="font-size:0.6vw;padding:0.5vh 0.5vw;" size="mini" @click="chooseParams($event)">{{n}}</el-button>
                                    </el-radio-group>
                                </div>
                        </div>

                        <span slot="footer" class="dialog-footer">
                            <div class="button-row">
                                <el-button v-show="showClearButton" @click="clearSelection" plain>清除选择</el-button>
                                <el-button style="width:300px;" type="primary" @click="downloadData()" plain >{{downloadButtonText}}</el-button>
                            </div>
                        </span>

                    </el-dialog>
                </div>
                
                <!--当前报警详情-->
                <div>
                <div style="margin-right: 1rem;">
                    <el-badge :value=this.global.warnNum class="item">
                        <el-button round size="small" icon="el-icon-bell" @click="dialogWarnTableVisible=true">报警</el-button>
                    </el-badge>
                </div>
                    <el-dialog title="当前报警详情" width="60%"
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
                            <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="downloadWarn()" plain>下载报警记录</el-button>
                        </span>
                    </el-dialog>
                </div>
                

                <!--历史操作日志记录-->
                <div>
                    <el-button round size="small" icon="el-icon-collection" style="margin-right:15px" @click="logMessage()">日志</el-button>
                    <el-dialog title="历史操作日志记录" width="60%" 
                    :visible.sync="dialogLogTableVisible">
                    <div class="choice-time">
                        <div style="margin-left:2vw">
                            <el-date-picker
                                v-model="exportChosenTime"
                                size="mini"
                                type="datetimerange"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                @change="logchangeTime()">
                            </el-date-picker>
                        </div>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="logTableData"
                        tooltip-effect="dark"
                        style="width: 100%" height="250"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            prop="userName"
                            label="登陆用户"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="userRole"
                            label="用户权限"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="room"
                            label="机房"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            label="操作内容">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="操作时间"
                            width="200"
                            show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="downloadLog()" plain>下载历史操作日志记录</el-button>
                    </span>
                </el-dialog>
                </div>
                
                <!--用户信息及管理-->
                <div>
                <el-tooltip placement="top">
                    <div slot="content">{{ this.role }}</div>
                    <div style="display:grid; place-items: center;">
                        <el-avatar
                            icon="el-icon-user-solid"
                            style="float: right;"
                            size="medium">
                        </el-avatar>
                        <span class="header-role-txt">{{userName}}</span>
                    </div>
                </el-tooltip>

                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-close" command="logout">退出</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus" command="newAccount">管理账号</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                </div>
            </div>

        </el-header>
        <div class="homepage">
            <div class="all-left">
                <system-name></system-name>
                <ai-status></ai-status>
                <data-analysis></data-analysis>
                <ai-show></ai-show>
            </div>
            <div class="all-mid" v-if="isLoading">
                <!-- 显示加载中的提示 -->
                <p>Loading...</p>
            </div>
            <div  class="all-mid" v-else>
                <jf-statues></jf-statues>
                <ai-pre></ai-pre>
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
import AIStatus from '../components/AIStatus.vue';
import JfStatus from '../views/JfStatues.vue'
import AICommandVue from '../components/AICommand.vue';
import DataAnalysis from '../components/DataAnalysis.vue'
import AIPreVue from '../views/AIPre.vue';
import AIShow from '@/components/AIShow.vue';
import AIShowCopy from '@/components/AIShowCopy.vue';
import userManage from '@/components/userManage.vue'

import axios from 'axios';
const synth = window.speechSynthesis;

export default {
    name: 'home-vue',
    data(){
        return{
            dataLoaded: false,
            JF:"",
            timer:"",
            timer2:"",
            preHPValue:'',
            dialogWarnTableVisible:false,
            dialogLogTableVisible:false,
            dialogDataTableVisible:false,
            warnTableData:[],
            logTableData:[],
            dataTableData:[],
            multipleSelection: [],
            roleDict:{'root':'root','normal':'普通用户','operator':'运维人员'},
            systime:(new Date()).toLocaleString('chinese',{hour12:false}),
            exportChosenTime:'',
            chosenTime:["-1","-1"],
            startTime: "-1",
            endTime: "-1",
            selectedButton: '', // 跟踪用户选择的按钮
            selectedParams:'',
            showClearButton:false,
            params:["服务器A功率","空调功率","风机1转速","风机2转速","压缩机1容量","压缩机2容量",
            "送风温度1","送风温度4","送风温度设定","回风温度1","回风温度2","回风温度3","回风温度4","回风温度设定","全部参数"],
            userName:'',
        };
    },
    mounted(){
        this.getfwqNkt()
        this.gethotpointrisk()
        this.getserverfaulttable()
        this.getpreConltdwd()
        this.gethotpointriskdata()
        this.jfBaseInfo()
        this.getUPSAlert()
        this.AbnormalLTDMessage()
        this.getChange()
        this.inttime()
        this.getcarbinetktdata()
        this.getcarbintserverdata()
        this.timer=setInterval(()=>{
            this.getUPSAlert()
            this.AbnormalLTDMessage()
            this.getChange()
            this.getfwqNkt()
            this.gethotpointrisk()
            this.getserverfaulttable()
            this.getpreConltdwd()
            this.gethotpointriskdata()
        },84330)
        this.timer2=setInterval(()=>{
            this.jfBaseInfo()
            this.systime=(new Date()).toLocaleString('chinese',{hour12:false})
        },1000)

    },
    created () {
        this.fetchData();
        this.gethotpointrisk()
        this.getserverfaulttable()
        this.getpreConltdwd()
        this.gethotpointriskdata()
        this.jfBaseInfo()
        this.getUPSAlert()
        this.AbnormalLTDMessage()
        this.getChange()
        this.inttime()
        this.getcarbinetktdata()
        this.getcarbintserverdata()
    },
    components: {
            'system-name':SystemName,
            'ai-status':AIStatus,
            'ai-show':AIShow,
            'ai-show-copy':AIShowCopy,
            'jf-statues':JfStatus,
            'ai-command':AICommandVue,
            'data-analysis':DataAnalysis,
            'ai-pre':AIPreVue,
    },
    methods:{
        async fetchData() {
            await this.getfwqNkt()
        },
        inttime(){
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            const formattedStartDate = currentDate.toLocaleDateString();
            const formattedEndDate = endOfDay.toLocaleDateString();
            this.startTime=formattedStartDate.replace(/\//g, "-") + ' 00:00:00';
            this.endTime=formattedEndDate.replace(/\//g, "-") + ' 23:59:59';
            this.exportChosenTime=[formattedStartDate.replace(/\//g, "-") + ' 00:00:00', formattedEndDate.replace(/\//g, "-") + ' 23:59:59'];
            this.chosenTime=[formattedStartDate.replace(/\//g, "-") + ' 00:00:00', formattedEndDate.replace(/\//g, "-") + ' 23:59:59'];
        },
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
        jfBaseInfo(){
            this.role = this.global.roles[(JSON.parse(window.sessionStorage.getItem("user")))['role']]
            this.role = this.global.roles[(JSON.parse(window.sessionStorage.getItem("user")))['role']]
            this.userName = (JSON.parse(window.sessionStorage.getItem("user")))['userName']
            this.systime=(new Date()).toLocaleString('chinese',{hour12:false})
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.changeJFinfo()
            if(this.JFname=="201"){
                this.JF="二零一"
            }
            if(this.JFname=="202"){
                this.JF="二零二"
            }
            if(this.JFname=="203"){
                this.JF="二零三"
            }
            if(this.JFname=="204"){
                this.JF="二零四"
            }
            if(this.JFname=="205"){
                this.JF="二零五"
            }
        },
        filterTag(value, row) {
            return row.name === value;
        },
        clearAllSelection(){
            this.global.warnNum=0
            this.warnTableData=[]
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
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/alert",{
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
                                nowHPTabledata['num']=b+1
                                nowHPTabledata['name']='冷通道热点'
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
                                abnormalData['num']=b+1
                                abnormalData['name']='数据异常'
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
                                changedTabledata['num']=i+1
                                changedTabledata['name']='冷通道波动'
                                changedTabledata['content']=this.ltdChanged[i][2]
                                changedTabledata['server']=this.ltdChanged[i][1]
                                changedTabledata['time']=this.ltdChanged[i][0]
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
        logout(){
            this.$confirm('确定登出 '+this.role+" "+this.userName+' ?', '登出', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
            }).then(() => {
                this.$router.replace({path: '/'})
                sessionStorage.clear()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消登出'
                });          
            });
        },
        newAccount(){
            this.$confirm('确定进入管理账户界面 ?', '管理账号', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
            }).then(() => {
                this.$FModal.show(
                    { 
                        component: userManage,
                        maxHeight: '100%',
                        width: '96%', 
                        height:'100%',
                        placement: 'center center'  
                    },
                )
            }).catch(() => {       
            });
        },
        handleCommand(command) {
            if(command=='logout'){
                this.logout()
            }
            if(command=='newAccount'){
                if(this.role=="超管员"){
                    this.newAccount()
                }
                else{
                    this.$notify({
                        title: '无权限创建新账户',
                        message: ('您是'+this.role+' 无权限创建新账户')
                    });
                }
            }
        },
        //日志信息获取
        logchangeTime(){
            this.chosenTime = this.exportChosenTime.slice(0,2);
            this.startTime = this.exportChosenTime.slice(0,1).toString();
            this.endTime = this.exportChosenTime.slice(1,2).toString();
            this.logMessage()
        },
        logMessage() {
            this.dialogLogTableVisible=true
            axios.post(this.global.apiURL+'6703'+"/jf703/log", this.exportChosenTime,{
            // axios.post(this.global.apiURL + this.global.ports[this.JFname] + "/getData/" + this.JFname + "/logs", this.exportChosenTime,{
                headers: {
                    'token': window.sessionStorage.getItem("token")
                },
            }).then(Response => {
                this.logTableData = [];
                const logs = Response.data;

                this.dialoglogTableVisible = true;

                if (logs.length) {
                for (let i = 0; i < logs.length; i++) {
                    const log = logs[i];
                    const logTableData = {};
                    logTableData['content'] = log.content;
                    logTableData['room'] = log.datacenter_room.slice(2,6);
                    logTableData['userName'] = log.userName;
                    logTableData['userRole'] = log.userRole;
                    logTableData['time'] = log.time;

                    this.logTableData.push(logTableData);
                    console.log('logTableData',this.logTableData)
                }
                }
            }).catch(Error => {
                console.log('axios logMessage error', Error);
            });
        },
        //日志下载
        downloadLog() {
            const tableData = this.logTableData;
            if(tableData!=''){
                const csvContent = this.convertToCSV(tableData);
                const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
                const downloadLink = document.createElement('a');
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download = '历史操作日志_'+this.startTime.slice(0,10)+'至'+this.endTime.slice(0,10)+'.csv';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(url);
            } else{
                this.$alert('当前导出数据为空，请重试', {
                    confirmButtonText: '好的',
                });
            }
        },
        //格式转换
        convertToCSV(data) {
            const header = Object.keys(data[0]).join(',') + '\n';
            const rows = data.map(row => {
                return Object.values(row).join(',') + '\n';
            });
            return header + rows.join('');
        },

        //数据获取
        clearSelection(){
            this.selectedButton = '';
            this.selectedParams = '';
            this.showClearButton=false;
        },
        datachangeTime(){
            this.chosenTime = this.exportChosenTime.slice(0,2);
            this.startTime = this.exportChosenTime.slice(0,1).toString();
            this.endTime = this.exportChosenTime.slice(1,2).toString();
            this.DataMessage()
        },
        chooseKT(event) {
            if(event.target.innerText === '全部空调'){
                this.selectedButton = event.target.innerText
            }else{
                this.selectedButton = '空调'+event.target.innerText.replace('空调', '');
            }
            this.showClearButton =true;
            this.checkSelectionComplete();
        },
        chooseFWQ(event) {
            if(event.target.innerText === '全部服务器'){
                this.selectedButton = event.target.innerText
            }else{
                this.selectedButton = event.target.innerText.replace('列', '')+'列';
            }
            this.showClearButton =true;
            this.checkSelectionComplete();
        },
        chooseParams(event) {
            this.selectedParams = event.target.innerText
        },
        checkSelectionComplete() {
            if (this.selectedKT.length > 0 || this.selectedFWQ.length > 0) {
            this.isSelectionComplete = true;
            } else {
            this.isSelectionComplete = false;
            }
        },
        DataMessage() {
            this.dialogDataTableVisible=true
        },
        //数据下载
        downloadData() {
            console.log('dataTableData', this.dataTableData)
            if(this.exportChosenTime === ''){
                this.$alert('请选择导出数据的时间范围', {
                    confirmButtonText: '好的',
                });
            }else if (this.selectedButton === '') {
                this.$alert('请选择导出机房或服务器数据', {
                    confirmButtonText: '好的',
                });
            } else if(this.selectedParams === ''){
                this.$alert('请选择导出参数', {
                    confirmButtonText: '好的',
                });
            } else{
                axios.post(this.global.apiURL + this.global.ports[this.JFname] + "/getData/" + this.JFname + "/realdata/out", [this.startTime,this.endTime,this.selectedButton,this.selectedParams], {
                headers: {
                'token': window.sessionStorage.getItem("token")
                }
            })
            .then(response => {
                this.DataTableData = [];
                const out = response.data;
                if (out.length) {
                for (let i = 0; i < out.length; i++) {
                    const data = out[i];
                    const DataTableData = {};
                    DataTableData['Location'] = data.Location;
                    DataTableData['EquipmentType'] = data.EquipmentType;
                    DataTableData['Equipment'] = data.Equipment;
                    DataTableData['PointName'] = data.PointName;
                    DataTableData['SiteName'] = data.SiteName;
                    DataTableData['Value0'] = data.Value0;
                    DataTableData['time'] = data.time;
                    this.DataTableData.push(DataTableData);
                    console.log('DataTableDate',this.DataTableDate)
                }
                }
                    const tableData = this.DataTableData;
                    if(tableData!=''){
                        const csvContent = this.convertToCSV(tableData);
                        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
                        const downloadLink = document.createElement('a');
                        const url = URL.createObjectURL(blob);
                        downloadLink.href = url;
                        downloadLink.download = this.selectedButton + this.selectedParams+"_"+this.startTime.slice(0,10)+'至'+this.endTime.slice(0,10)+'.csv';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        URL.revokeObjectURL(url);
                    } else{
                        this.$alert('当前导出数据为空，请重试', {
                            confirmButtonText: '好的',
                        });
                    }
            })
            .catch(error => {
             console.log('axios DataMessage error', error);
            });
            }
        },
        warnchangeTime(){
            this.chosenTime = this.exportChosenTime.slice(0,2)
            this.startTime = this.exportChosenTime.slice(0,1).toString();
            this.endTime = this.exportChosenTime.slice(1,2).toString();
            console.log('this.chosenTime',this.exportChosenTime)
            this.AbnormalLTDMessage()
        },
        downloadWarn(){
            const tableData = this.warnTableData;
            if(tableData!=''){
                const csvContent = this.convertToCSV(tableData);
                const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
                const downloadLink = document.createElement('a');
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download ='报警日志_'+this.startTime.slice(0,10)+'至'+this.endTime.slice(0,10)+'.csv';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(url);
            } else{
                this.$alert('当前导出数据为空，请重试', {
                    confirmButtonText: '好的',
                });
            }
        },

        //列间空调数据获取
        getcarbinetktdata(){
            axios.get(this.global.apiURL+'6703'+"/jf703/realdata_kt",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    console.log('jf703 realdata_kt', Response.data)
                    this.carbinetktdata=Response.data
                    console.log('jf703 this.carbinetktdata', this.carbinetktdata)
                    this.$store.commit('SET_CARBINETKTDATA', this.carbinetktdata);
                },
                Error=>{
                    console.log('axios ktnew error',Error)
                }
            );
        },
        getcarbintserverdata(){
            axios.get(this.global.apiURL+'6703'+"/jf703/realdata_server",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('jf703 realdata_server', Response.data)
                    // this.carbinetserverdata=Response.data.reduce((acc, item, index) => {
                    // if (index % 2 === 0) {
                    //     acc.push([item.value0]);
                    // } else {
                    //     acc[Math.floor(index / 2)].push(item.value0);
                    // }
                    // return acc;
                    // }, []);

                    // console.log('carbinetserverdata',this.carbinetserverdata)


                    // this.carbinetserverdata = Response.data.map(item => item.value0);

                    // this.carbinetserverdata = Response.data.map(item => item.value0).reduce((result, value, index) => {
                    // const chunkIndex = Math.floor(index / 4);
                    // if (!result[chunkIndex]) {
                    //     result[chunkIndex] = [];
                    // }
                    // if (index % 4 === 2) {
                    //     result[chunkIndex].push('');
                    // }
                    // result[chunkIndex].push(value);
                    // return result;
                    // }, []);

                    this.carbinetserverdata = [];
                    for (let i = 0; i < Response.data.length; i += 4) {
                    const chunk = Response.data.slice(i, i + 4).map(item => item.value0);
                    const swappedChunk = [...chunk.slice(2), '', ...chunk.slice(0, 2)];
                    this.carbinetserverdata.push(swappedChunk);
                    }
                    
                    this.$store.commit('SET_CARBINETSERVERDATA', this.carbinetserverdata);
                },
                Error=>{
                    console.log('axios ktnew error',Error)
                }
            );
        },            
        //获得空调和服务器数据   
        getktdata(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/ktnew",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    this.ktdataall=Response.data[0]['机房空调']
                    // 提交 mutation 将数据保存到 Vuex store
                    this.$store.commit('SET_KTDATAALL', this.ktdataall);
                },
                Error=>{
                    console.log('axios ktnew error',Error)
                }
            );
        },
        getfwqall(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/servernew",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios servernew',Response.data)
                    this.realtimefwqltdwdsmall=[]
                    this.realtimefwqltdwdbig=[]
                    this.realtimefwqrtdwdsmall=[]
                    this.realtimefwqrtdwdbig=[]
                    this.fwqltdwdDownMaxIndex=[]
                    this.fwqltdwdUpMaxIndex=[]
                    this.realtimefwqpower=[]

                    // 机组实时状态 冷通道温度/热通道温度 大图小图数据获取
                    for(var j=0;j<(Object.keys(Response.data[0]['servercold']).length);j++){
                        // 机组实时状态 冷通道温度 小图数据获取
                        this.realtimefwqltdwdsmall.push(Object.values(Response.data[0]['servercold'][this.fwqlist[j]]['avg']))
                        // 机组实时状态 热通道温度 小图数据获取
                        this.realtimefwqrtdwdsmall.push(Object.values(Response.data[0]['serverhot'][this.fwqlist[j]]['avg']))

                        // 机组实时状态 冷通道温度 大图数据获取
                        var realtimefwqltdwd=Response.data[0]['servercold'][this.fwqlist[j]]['sitedetail']
                        this.realtimefwqltdwdbig.push([Object.values(realtimefwqltdwd['up']),Object.values(realtimefwqltdwd['down'])])
                        // 机组实时状态 热通道温度 大图数据获取
                        this.realtimefwqrtdwdbig.push(Object.values(Response.data[0]['serverhot'][this.fwqlist[j]]['sitedetail']))

                        // 机组实时状态 冷通道温度 大图 最大次大值数据获取
                        this.fwqltdwdDownMaxIndex.push([realtimefwqltdwd['cold_down_max_index'],realtimefwqltdwd['cold_down_submax_index']])
                        this.fwqltdwdUpMaxIndex.push([realtimefwqltdwd['cold_up_max_index'],realtimefwqltdwd['cold_up_submax_index']])
                    }
                    // 机组实时状态 服务器功率 大小图数据获取
                    this.realtimefwqpower=Object.values(Response.data[0]['serverpower'])
                   
                    this.$store.commit('SET_FWQLTDWDSMALL', this.realtimefwqltdwdsmall);
                    this.$store.commit('SET_FWQLTDWDBIG', this.realtimefwqltdwdbig);
                    this.$store.commit('SET_FWQRTDWDSMALL', this.realtimefwqrtdwdsmall);
                    this.$store.commit('SET_FWQRTDWDBIG', this.realtimefwqrtdwdbig);
                    this.$store.commit('SET_FWQLTDWDDOUWNMAXINDEX', this.fwqltdwdDownMaxIndex);
                    this.$store.commit('SET_FWQLTDWDUPMAXINDEX', this.fwqltdwdUpMaxIndex);
                    this.$store.commit('SET_FWQPOWER', this.realtimefwqpower);

                    
                },
                Error=>{
                    console.log('axios servernew error',Error)
                }
            );
        },
        async getfwqNkt() {
            await this.getktdata();
            await this.getfwqall();
            this.dataLoaded = true;
        },

        //设备异常诊断数据
        getserverfaulttable(){    
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/server_diagnosis",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios server_diagnosis',Response.data)

                    this.faultdata=[]
                    for(var i=0;i<Response.data.length;i++){
                        var temp = Response.data[i]
                        var tempTabledata = {}
                        tempTabledata['params']=temp['PointName']
                        tempTabledata['fwq']=temp['Equipment'].slice(3,4)
                        tempTabledata['detail']=temp['Value0']
                        tempTabledata['cite']=temp['SiteName']
                        this.faultdata.push(tempTabledata)
                    }
                    // 提交 mutation 将数据保存到 Vuex store
                    this.$store.commit('SET_FAULTDATA', this.faultdata);      
                    console.log('this.faultdata',this.faultdata)                       
                    this.cntFaultfwq = this.countFre(this.faultdata)
           
                },
                Error=>{
                    console.log('axios server_diagnosis error',Error)
                }
            );
        },

        //获得热点风险显示数据
        gethotpointriskdata(){
            console.log('hotpointriskalldata',this.hotpointriskalldata)
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/riskdatanew0216",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
            Response=>{
                // console.log('axios riskdatanew0216',Response.data)
                this.hotpointriskalldata=[]
                for(var i=0;i<this.fwqlist.length;i++){
                    var fwqTop = Response.data[0][this.fwqlist[i]]['up']
                    var fwqBottom = Response.data[0][this.fwqlist[i]]['down']
                    this.hotpointriskalldata.push([Object.values(fwqTop),Object.values(fwqBottom)])
                }
                 // 提交 mutation 将数据保存到 Vuex store
                 this.$store.commit('SET_HOTPOINTRISKALLDATA', this.hotpointriskalldata);
            },
            Error=>{
                console.log('axios riskdatanew0216 error',Error)
            });
        },


        //获得冷通道波动数据
        gethotpointrisk() {
            axios.get(this.global.apiURL + this.global.ports[this.JFname] + "/getData/" + this.JFname + "/realdata/coldsite_change", {
                headers: {
                    'token': window.sessionStorage.getItem("token")
                },
            }).then(
                Response => {
                    this.hotpointriskall = [];
                    for (var i = 0; i < this.fwqlist.length; i++) {
                        var fwqTop = Response.data[0][this.fwqlist[i]]['up'];
                        var fwqBottom = Response.data[0][this.fwqlist[i]]['down'];
                        this.hotpointriskall.push([Object.values(fwqTop), Object.values(fwqBottom)]);
                    }
                    // 提交 mutation 将数据保存到 Vuex store
                    this.$store.commit('SET_HOTPOINTRISKALL', this.hotpointriskall);
                },
                Error => {
                    console.log('axios coldsite_change error', Error.message);
                });
        },

        //AI策略显示 
        getpreConltdwd(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/precmd",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
            Response=>{
                // console.log('axios precmd',Response.data)
                this.ktChangedValue=Object.values(Response.data[0]['kt']['hf'])
                this.ktChangedSFValue=Object.values(Response.data[0]['kt']['sf'])
                this.preltdmax=Object.values(Response.data[1]['server'])

                this.ifprecmd = false

                this.$store.commit('SET_KTCHANGEDVALUE', this.ktChangedValue);
                this.$store.commit('SET_KTCHANGEDSFVALUE', this.ktChangedSFValue);
                this.$store.commit('SET_PRELTDMAX', this.preltdmax);
                this.$store.commit('SET_IFPRECMD', this.ifprecmd);                
            }),
            Error=>{
                console.log('axios precmd error',Error)
            }
        },   


    },
    computed: {
        downloadButtonText() {
            if (this.selectedButton === '') {
            return '请选择导出数据';
            } else {
            return '导出' + this.selectedButton + this.selectedParams+ '数据';
            }
        },
        isLoading() {
            return this.ktdataall === null || this.realtimefwqltdwdsmall.length === 0;
        }
    },
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
    width:15vw;
    margin-right: 1vw;
}
.all-mid{
    width:58vw;
    margin:0.5vw;
}
.all-right{
    width:22vw;
    margin-left: 1vw;
}
.choice-time{
    width:100%;
    height:5vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bigaipre-choose-fwq{
    margin-right: 50px ;
    height:5vh;
    font-size: 40px;
    display: flex;
    justify-content: center;
}
</style>
