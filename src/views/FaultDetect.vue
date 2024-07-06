<template>
    <div class="fault-detect">
        <div class="fault-detect-detail">
            <div class="data-show">
                <div class="data-fault">
                    <div class="fault-title">
                        数<br>据<br>异<br>常
                    </div>
                    <div class="data-tables">
                        <div class="kt-table">
                            <div class="kt-normal">
                                <div class="fault-title-son">
                                    空调参数正常范围
                                    <el-button class="click2edit" size="mini" icon="el-icon-edit"
                                        @click="handleEditKTnormal()">
                                    </el-button>
                                        <el-dialog
                                            title="修改 空调参数正常范围" width="40%"
                                            :visible.sync="dialogEditKTnormalFormVisible"
                                            :before-close="handleClose">
                                            <el-form :model="ktNormalParams">
                                                <el-form-item label="送风温度" prop="data" :label-width="120">
                                                    <div class="chooseArea">
                                                        <el-slider
                                                            v-model="ktNormalParams[0]"
                                                            range="true" max="40" step="0.1" show-input="true"
                                                            :marks="ktMarks[0]" @change="changeSF($event)">
                                                        </el-slider>
                                                    </div>
                                                </el-form-item>
                                                <el-form-item label="回风温度" prop="data" :label-width="120">
                                                    <div class="chooseArea">
                                                        <el-slider
                                                            v-model="ktNormalParams[1]"
                                                            range="true" max="40" step="0.1" show-input="true"
                                                            :marks="ktMarks[1]" @change="changeHF($event)">
                                                        </el-slider>
                                                    </div>
                                                </el-form-item>
                                                <el-form-item label="压缩机容量" prop="data" :label-width="120">
                                                    <div class="chooseArea"><el-slider
                                                        v-model="ktNormalParams[2]"
                                                        range="true" max="100" step="1" show-input="true"
                                                        :marks="ktMarks[2]" @change="changeYSJ($event)">
                                                    </el-slider></div>
                                                </el-form-item>
                                                <el-form-item label="风机转速" prop="data" :label-width="120">
                                                    <div class="chooseArea"><el-slider
                                                        v-model="ktNormalParams[3]"
                                                        range="true" max="100" step="1" show-input="true"
                                                        :marks="ktMarks[3]" @change="changeFJ($event)">
                                                    </el-slider></div>
                                                </el-form-item>
                                                <el-form-item label="冷凝风机转速" prop="data" :label-width="120">
                                                    <div class="chooseArea"><el-slider
                                                        v-model="ktNormalParams[4]"
                                                        range="true" max="100" step="1" show-input="true"
                                                        :marks="ktMarks[4]" @change="changeLNFJ($event)">
                                                    </el-slider></div>
                                                </el-form-item>
                                            </el-form>
                                            <div slot="footer" class="dialog-footer">
                                                <el-button type="primary" @click.native="toComfirmKT">确 定</el-button>
                                            </div>
                                        </el-dialog>
                                </div>

                                <div class="kt-normal-detail">
                                    <el-card class="box-card" shadow="hover">
                                        <div v-for="n in ktNormalParams.length" :key="n.index" class="text item">
                                            {{ktParams[n-1] }} : {{ ktNormalParams[n-1] }}
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                            <div class="kt-fault">
                                <div class="fault-title-son">
                                    正常空调比例
                                </div>

                                <div class="kt-fault-detail">
                                    <el-progress type="circle" :percentage=nomalKTper
                                        :width="75" :height="75">
                                    </el-progress>
                                </div>
                            </div>
                        </div>

                        <el-divider direction="vertical"></el-divider>

                        <div class="server-table">
                            <div class="fwq-normal">
                                <div class="fault-title-son">
                                    冷热通道温度正常范围
                                    <el-button class="click2edit" size="mini" icon="el-icon-edit"
                                        @click="handleEditFWQnormal()">
                                    </el-button>
                                        <el-dialog
                                            title="修改 冷热通道温度正常范围" width="40%"
                                            :visible.sync="dialogEditFWQnormalFormVisible"
                                            :before-close="handleClose1">
                                            <el-form :model="lrtdNormalTemps">
                                                <el-form-item label="冷通道温度" prop="data" :label-width="120">
                                                    <div class="chooseArea"><el-slider
                                                        v-model="lrtdNormalTemps[0]"
                                                        range="true" max="30" step="0.1" show-input="true"
                                                        :marks="lrtdMarks[0]" @change="changeLTDtemp($event)">
                                                    </el-slider></div>
                                                </el-form-item>
                                                <el-form-item label="热通道温度" prop="data" :label-width="120">
                                                    <div class="chooseArea"><el-slider
                                                        v-model="lrtdNormalTemps[1]"
                                                        range="true" max="50" step="0.1" show-input="true"
                                                        :marks="lrtdMarks[1]" @change="changeRTDtemp($event)">
                                                    </el-slider></div>
                                                </el-form-item>
                                            </el-form>
                                            <div slot="footer" class="dialog-footer">
                                                <el-button type="primary" @click.native="toComfirmFWQ">确 定</el-button>
                                            </div>
                                        </el-dialog>
                                </div>
                                <div class="kt-normal-detail">
                                    <el-card class="box-card" shadow="hover">
                                        <div v-for="n in lrtdNormalTemps.length" :key="n.index" class="text item">
                                            {{fwqParams[n-1] }} : {{ lrtdNormalTemps[n-1] }}
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                            <div class="fwq-fault">
                                <div class="fault-title-son">
                                    正常冷热通道比例
                                </div>
                                <div class="fwq-fault-detail">
                                    <el-progress type="circle" :percentage=nomalFWQper
                                        :width="75" :height="75">
                                    </el-progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="unstable-kt">
                    <div class="fault-title">
                        报<br>警<br>弹<br>窗<br>项
                    </div>
                    <div class="unstable-kt-detail">
                        <el-button type="primary" class="el-icon-edit" plain size="mini" @click="clickChangeWarn()"
                            >修改</el-button>
                        <el-dialog
                            title="修改 报警弹窗内容" width="50%"
                            :visible.sync="dialogChooseVisible"
                            :before-close="toCancelWarmWindow">
                            <div class="choose-warns">
                                <div class="choose-warn">
                                    {{ choices[1] }}
                                    <span>
                                        <el-tooltip placement="top" effect="light">
                                            <div slot="content">
                                                设置弹窗报警数据异常时间阈值（该机房数据异常持续时间超过此值则报警）
                                            </div>
                                            <i class="el-icon-question TitleTopContent" />
                                        </el-tooltip>
                                    </span>
                                    <div>
                                        <el-form label-width="160px">
                                            <el-form-item label="数据异常持续数间报警阈值" label-width="200px">
                                                <el-input-number v-model=abnormalDataTime :min="1" controls-position="right" 
                                                    label="描述文字" size="mini">
                                                </el-input-number>分钟
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                                <div class="choose-warn">
                                    <el-checkbox v-model="ifCheckLTDTempWave" :label=choices[2] size="small"></el-checkbox>
                                    <span>
                                        <el-tooltip placement="top" effect="light">
                                            <div slot="content">
                                                设置弹窗报警冷通道波动阈值（波动度数/波动检测时间）
                                            </div>
                                            <i class="el-icon-question TitleTopContent" />
                                        </el-tooltip>
                                    </span>
                                    <div>
                                        <el-form label-width="160px">
                                            <el-form-item label="报警波动度数" label-width="200px">
                                                <el-input-number v-model="num" :step="0.1" :min="0.1" controls-position="right" 
                                                    @change="handleChangeNum" label="描述文字" size="mini">
                                                </el-input-number>°C
                                            </el-form-item>
                                            <el-form-item label="报警波动检测时间" label-width="200px">
                                                <el-input-number v-model="time" :step="0.1" :min="1" controls-position="right" 
                                                    @change="handleChangeTime" label="描述文字" size="mini">
                                                </el-input-number>分钟
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click.native="comfirmChangeWarn">确定修改</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </div>
                <div class="unstable-kt">
                    <div class="fault-title">
                        历<br>史<br>报<br>警<br>罗<br>列
                    </div>
                    <div class="warn-list-detail">
                        <el-button type="primary" class="el-icon-document" plain size="mini" @click="clickMoreWarn()">
                            查看</el-button>
                        <el-dialog title="历史报警罗列" :visible.sync="dialogWarnTableVisible">
                            <el-date-picker
                                v-model="exportChosenTime"
                                size="mini"
                                type="datetimerange"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                @change="alertHistoryPostTime()">
                            </el-date-picker>
                            <div style="padding:0.3rem"></div>
                            <el-table :data="warnData" stripe border height="250"
                                :default-sort = "{prop: 'sampletime', order: 'descending'}">
                                <el-table-column property="id" label="序号" width="80"></el-table-column>
                                <el-table-column property="equipment" label="服务器" width="200">
                                </el-table-column>
                                <el-table-column property="content" label="报警详情" width=""></el-table-column>
                                <el-table-column property="sampleTime" label="报警时间" width="200" sortable></el-table-column>
                            </el-table>
                            <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="downloadWarn()" plain>下载报警记录</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </div>
            </div>
            <div class="fault-fwqs">
                <div class="fault-fwq" v-for="n in JF.length" :key="n.index">
                    <fwq :fwqId="n" :ltdNum="1" :Big="0"></fwq>
                </div>
            </div>
            <div class="big-btm">
                <el-tooltip class="item" effect="light" content="查看大图" placement="top-start">
                    <el-button size="mini" class="go-big-view" icon="el-icon-zoom-in" @click="goBigFault"></el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import FaultFwq from '../components/FaultFwq.vue';
import BigFault from '../views/BIgFault.vue';
import axios from 'axios';

export default {
    data() {
        return {
            timer:"",
            chosenTime:"",
            nomalKTper:100,
            nomalFWQper:100,
            JF:[],
            fwqlist:[],
            fwqList:[],
            dialogEditKTnormalFormVisible:false,
            dialogEditFWQnormalFormVisible:false,
            dialogWarnTableVisible:false,
            warnData: [],
            ktParams:['送风温度','回风温度','压缩机容量','风机转速','冷凝风机转速'],
            fwqParams:['冷通道温度','热通道温度'],

            checkAll: false,
            checkedChoices: ['预测冷通道温度 热点', '当前冷通道温度 波动'],
            ifCheckLTDTempWave:false,
            choices:['当前冷通道温度 热点', '数据异常报警时间阈值', '当前冷通道温度 波动'],
            dialogChooseVisible:false,
            dialogChangeVisible:false,
            num:1,
            time:1,
            abnormalDataTime:1,
            now:27,
            exportChosenTime:'',

            ktNormalParams:[],
            sfTemp:[],
            hfTemp:[],
            ysj:[],
            fj:[],
            lnfj:[],
            lrtdNormalTemps:[],
            ltdwd:[],
            rtdwd:[],

            handleUser: '',

            ktMarks: [
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
            lrtdMarks: [
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
    components: {
        'fwq':FaultFwq,
    },
    created () {
        this.role = this.global.roles[(JSON.parse(window.sessionStorage.getItem("user")))['role']]
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getfaultdata()
        this.setKTnormal()
        this.setFWQnormal()
        this.userName = (JSON.parse(window.sessionStorage.getItem("user")))['userName']
        this.systime=(new Date()).toLocaleString('chinese',{hour12:false})
    },
    mounted(){
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.role = this.global.roles[(JSON.parse(window.sessionStorage.getItem("user")))['role']]
            this.userName =(JSON.parse(window.sessionStorage.getItem("user")))['userName']
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.systime=(new Date()).toLocaleString('chinese',{hour12:false})
            this.changeJFinfo()
            this.setKTnormal()
            this.setFWQnormal()
            this.getfaultdata()
        },76041)
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
        inttime(){
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            const formattedStartDate = currentDate.toLocaleDateString();
            const formattedEndDate = endOfDay.toLocaleDateString();

            this.exportChosenTime=[formattedStartDate.replace(/\//g, "-") + ' 00:00:00', formattedEndDate.replace(/\//g, "-") + ' 23:59:59'];
            this.chosenTime=[formattedStartDate.replace(/\//g, "-") + ' 00:00:00', formattedEndDate.replace(/\//g, "-") + ' 23:59:59'];
        },
        uniqArr(arr) { //去重
            var newArr = new Set(arr)
            return Array.from(newArr)
        },
        getfaultdata(){
            this.changeJFinfo()

            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/kt_diagnosis",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    this.abnormalKT=[]
                    for(var i=0;i<Response.data.length;i++){
                        var temp = Response.data[i]
                        this.abnormalKT.push(temp['Equipment'].slice(2,4))
                    }
                    this.abnormalKT = this.uniqArr(this.abnormalKT)
                    console.log('this.abnormalKT',this.abnormalKT)
                    this.nomalKTper = 1-this.abnormalKT.length/this.JFktNum
                    this.nomalKTper = this.nomalKTper*100
                    this.nomalKTper = this.nomalKTper.toFixed(2)
                },
                Error=>{
                    console.log('axios kt_diagnosis error',Error)
                }
            );

            this.faultdata=this.$store.state.faultdata;
        },
        alertHistoryPostTime(){
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/alert_history",this.exportChosenTime,
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(res=>{
                    this.warnData=[]
                    for(var i=0;i<res.data.length;i++){
                        var temp={id:i+1,equipment:res.data[i].equipment,content:res.data[i].content,sampleTime:res.data[i].sampleTime}
                        this.warnData.push(temp)
                    }
                })
                .catch(function (error) {
                    console.log('axios alert_history error',error);
                });
        },
        change(){
            const hContent = this.$createElement;
            this.$prompt('请输入密码', '修改报警波动阈值 密码验证', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                inputType: 'password',
                }).
                then(({value}) => {
                    if(value=='pinganai2023'){
                        this.dialogChangeVisible=true
                    }
                    else{
                        this.$notify({
                            title: '修改报警波动阈值 权限密码输入错误',
                            message: hContent('i', { style: 'color: grey'}, '修改报警波动阈值失败，请重新输入密码')
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入报警波动阈值 权限密码'
                    });
                });
        },
        clickMoreWarn(){
            this.dialogWarnTableVisible=true
            this.inttime()
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/alert_history",this.exportChosenTime,{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                    Response=>{
                        this.warnData=[]
                        // console.log('axios alert_history',Response.data)
                        this.fwqALL=[]
                        for(var i=0;i<Response.data.length;i++){
                            this.fwqALL.push(Response.data[i].equipment)
                            var temp={id:i+1,equipment:Response.data[i].equipment,content:Response.data[i].content,sampleTime:Response.data[i].sampleTime}
                            this.warnData.push(temp)
                        }
                    },
                    Error=>{
                        console.log('axios alert_history error',Error)
                    }
            );
        },
        clickChangeWarn(){
            const hContent = this.$createElement;
            if(this.role=='超管员'){
                this.dialogChooseVisible = true
                this.getAbnormalData()
                this.getIfLTDTempWaveCheck()
                this.getLTDTempWave()
            }
            else{
                this.$notify({
                    title: '无法修改报警阈值',
                    message: hContent('i', { style: 'color: grey'}, '您是'+this.role+', 无权限修改报警阈值')
                });
            }
        },
        toCancelWarmWindow(){
            this.dialogChooseVisible = false
        },
        
        // 数据异常部分：获得数据异常阈值、修改数据异常阈值
        getAbnormalData(){
            console.log('dataStatus_time_limit_design',this.num,this.time,this.userName,this.role,this.systime.replace(/\//g, "-"))
            // 获得数据异常阈值
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/dataStatus_time_limit_design",[this.abnormalDataTime,this.userName,this.role,this.systime.replace(/\//g, "-")],{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios alert AbnormalData',Response.data)
                    this.abnormalDataTime = Response.data
                },
                Error=>{
                    console.log('axios alert AbnormalData error',Error)
            });
        },
        postAbnormalData(){
            console.log('dataStatus_time_limit_design',this.abnormalDataTime,this.userName,this.role,this.systime.replace(/\//g, "-"))
            // 修改数据异常阈值
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/dataStatus_time_limit_design",[this.abnormalDataTime,this.userName,this.role,this.systime.replace(/\//g, "-")],
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    console.log('axios alert_design',Response.data)
                },
                Error=>{
                    console.log('axios post alert_design error',Error)
            });
        },

        // 冷通道波动部分：是否选择报警、获得报警阈值、修改报警阈值
        getIfLTDTempWaveCheck(){
            // 获取是否选择冷通道波动报警
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/alert_design",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                    Response=>{
                        this.ifCheckLTDTempWave=Response.data[0]
                        // console.log('axios alert_design',Response)
                    },
                    Error=>{
                        console.log('axios alert_design error',Error)
                    }
            );
        },
        getLTDTempWave(){
            // 获得冷通道波动阈值
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/cold_detect_design",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios cold_detect_design',Response.data)
                    this.num=Response.data[0] // 冷通道波动度数
                    this.time=Response.data[1] // 冷通道波动时间
                },
                Error=>{
                    console.log('axios cold_detect_design error',Error)
            });
        },
        postifChooseLTDTempWave(){
            const postData = [this.ifCheckLTDTempWave,this.userName,this.role,this.systime.replace(/\//g, "-")]
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/alert_design",postData,
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(res=>{
                console.log('axios ifCheckLTDTempWave',res)
            })
            .catch(function (error) {
                console.log('axios ifCheckLTDTempWave error',error)
            });
        },
        postLTDTempWave(){
            // 修改冷通道波动阈值
            var coldDetectParams=[this.num,this.time]
            var handleUser =[this.userName,this.role,this.systime.replace(/\//g, "-")]
            var requestData = {
                params: coldDetectParams, 
                user: handleUser
            };
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/cold_detect_design",requestData,
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(res=>{
                console.log('axios cold_detect_design',res);
            })
            .catch(function (error) {
                console.log('axios cold_detect_design error',error);
            });
        },

        // 确定修改报警阈值
        comfirmChangeWarn(){
            this.postAbnormalData()
            this.getAbnormalData()
            this.postLTDTempWave()
            this.postifChooseLTDTempWave()
            this.dialogChooseVisible=false
        },

        goBigFault(){
            this.$FModal.show(
                { 
                    component: BigFault,
                    maxHeight: '100%',
                    width: '96%', 
                    height:'100%',
                    placement: 'center center'  
                },
            )
        },
        getfwqallnew(){
            this.realtimefwqltdwdsmall=this.$store.state.realtimefwqltdwdsmall;
            this.realtimefwqltdwdbig=this.$store.state.realtimefwqltdwdbig;
            this.realtimefwqrtdwdsmall=this.$store.state.realtimefwqrtdwdsmall;
            this.realtimefwqrtdwdbig=this.$store.state.realtimefwqrtdwdbig;
            this.fwqltdwdDownMaxIndex=this.$store.state.fwqltdwdDownMaxIndex;
            this.fwqltdwdUpMaxIndex=this.$store.state.fwqltdwdUpMaxIndex;
            this.realtimefwqpower=this.$store.state.realtimefwqpower;
        },
        handleEditKTnormal(){
            if(this.role=="超管员"){
                this.dialogEditKTnormalFormVisible = true
            }
            else{
                this.$notify({
                    title: '无权限修改空调正常范围',
                    message: ('您是'+this.role+' 无权限修改空调正常范围')
                });
            }
        },
        handleEditFWQnormal(){
            if(this.role=="超管员"){
                this.dialogEditFWQnormalFormVisible = true
            }
            else{
                this.$notify({
                    title: '无权限修改空调正常范围',
                    message: ('您是'+this.role+' 无权限修改空调正常范围')
                });
            }
        },
        handleClose() {
            this.dialogEditKTnormalFormVisible = false;
        },
        handleClose1() {
            this.dialogEditFWQnormalFormVisible = false;
        },
        changeSF(val){
            this.sfTemp=val
            // console.log('1 post origin this.ktNormalParams SF',this.ktNormalParams,this.sfTemp)
        },
        changeHF(val){
            this.hfTemp=val
            // console.log('1 post origin this.ktNormalParams HF',this.ktNormalParams,this.hfTemp)
        },
        changeYSJ(val){
            this.ysj=val
            // console.log('1 post origin this.ktNormalParams YSJ',this.ktNormalParams,this.ysj)
        },
        changeFJ(val){
            this.fj=val
            // console.log('1 post origin this.ktNormalParams FJ',this.ktNormalParams,this.fj)
        },
        changeLNFJ(val){
            this.lnfj=val
            // console.log('1 post origin this.ktNormalParams LNFJ',this.ktNormalParams,this.lnfj)
        },
        changeLTDtemp(val){
            this.ltdwd=val
        },
        changeRTDtemp(val){
            this.rtdwd=val
        },
        toComfirmKT() {
            this.ktNormalParams=[this.sfTemp,this.hfTemp,this.ysj,this.fj,this.lnfj]
            this.handleUser =[this.userName,this.role,this.systime.replace(/\//g, "-")]
            var requestData = {
                params: this.ktNormalParams, 
                user: this.handleUser
            };

            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/diagnosis_kt_design", requestData,
            {headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(res=>{
                console.log('axios diagnosis_kt_design',res)
            })
            .catch(function (error) {
                console.log('axios diagnosis_kt_design error',error)
            });

            this.$set(this.ktNormalParams);
            this.$message({
                type: "success",
                message: "空调正常范围 修改成功!",
            });
            this.dialogEditKTnormalFormVisible = false;
        },
        toComfirmFWQ() {
            this.lrtdNormalTemps=[this.ltdwd,this.rtdwd]
            // console.log('this.lrtdNormalTemps 修改为',this.lrtdNormalTemps)
            this.$set(this.lrtdNormalTemps);
            this.handleUser =[this.userName,this.role,this.systime.replace(/\//g, "-")]
            var requestData = {
                params: this.lrtdNormalTemps, 
                user: this.handleUser
            };
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/diagnosis_server_design",requestData)
            .then(res=>{
                console.log('axios diagnosis_server_design post',res);
            })
            .catch(function (error) {
                console.log('axios diagnosis_server_design post error',error);
            });
            
            this.$message({
                type: "success",
                message: "服务器正常范围 修改成功!",
            });
            this.dialogEditFWQnormalFormVisible = false;
        },
        setFWQnormal(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/diagnosis_server_design",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    this.$store.commit('SET_LRTDNORMAL', Response.data); // 将修改前冷热通道正常温度范围信息保存到 Vuex
                    this.lrtdNormalTemps = Response.data
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
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    this.$store.commit('SET_KTNORMAL', Response.data); // 将修改前冷热通道正常温度范围信息保存到 Vuex
                    this.ktNormalParams = Response.data
                    this.sfTemp = Response.data[0]
                    this.hfTemp = Response.data[1]
                    this.ysj = Response.data[2]
                    this.fj = Response.data[3]
                    this.lnfj = Response.data[4]
                },
                Error=>{
                    console.log('axios diagnosis_kt_design error',Error)
                }
            );
        },
        downloadWarn(){
            // 获取表格数据
            const tableData = this.warnData;
            if(tableData!=''){
                this.startTime = this.exportChosenTime.slice(0,1).toString();
                this.endTime = this.exportChosenTime.slice(1,2).toString();
                const csvContent = this.convertToCSV(tableData);
                const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
                const downloadLink = document.createElement('a');
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download = '历史报警罗列_'+this.startTime.slice(0,10)+'至'+this.endTime.slice(0,10)+'.csv';
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
        convertToCSV(data) {
            const header = Object.keys(data[0]).join(',') + '\n';
            const rows = data.map(row => {
                return Object.values(row).join(',') + '\n';
            });
            return header + rows.join('');
        },
    },
}
</script>

<style>
.fault-detect{
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fault-detect-detail{
    width:100%;
    height:100%;
    justify-content: center;
    align-items: center;
}
.data-show{
    width:100%;
    height:35%;
    margin:0.5vh;
    display:flex;
    justify-content: center;
    align-items: center;
}
.data-fault{
    display:flex;
    justify-content: center;
    align-items: center;
    width:52%;
    height:100%;
    background-color: rgb(247, 247, 247);
    border-radius: 1rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}
.el-divider--vertical{
  display:inline-block;
  width:1px;
  height:80%;
  margin:0 8px;
  vertical-align:middle;
  position:relative;
}
.fault-title{
    width:2vw;
    font-size: 0.7rem;
    font-weight: 800;
}
.fault-title-son{
    font-size: 0.6rem;
    font-weight: 600;
    display: flex;
    justify-content: left;
    align-items: center;
    margin:0 1vw
}
.data-tables{
    width:92%;
    height:80%;
    display:flex;
    justify-content: center;
    align-items: center;
}
.kt-table{
    width:50%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
}
.kt-normal{
    width:60%;
    height:96%;
    display: grid;
    justify-content: center;
    align-items: center;
}
.choose-warns{
    display: grid;
    place-items: center;
}
.choose-warn{
    padding:1rem;
}
.fwq-normal{
    width:60%;
    height:96%;
    display: grid;
    justify-content: center;
    align-items: center;
}
.kt-normal-detail{
    padding: 0.1vh 0.2vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.chooseArea{
    width:40vw;
    margin-left:12%;
}
.text {
    font-size: 0.8rem;
    zoom:0.8;
    font-weight:400;
}
.text1 {
    font-size: 0.6rem;
}

.item {
    padding: 0.1vh 0;
}

.box-card {
    width: 90%;
    height:8vh;
    font-size: 0.8rem;
    padding: 0.1vh 0;
    overflow-y: scroll;
}
.kt-fault{
    width:30%;
    height:96%;
    display: grid;
    justify-content: center;
    align-items: center;
}
.fwq-fault{
    height:96%;
    display: grid;
    justify-content: center;
    align-items: center;
}
.kt-fault-detail{
    height:76%;
    padding: 0.1vh 1vw;
}
.fwq-fault-detail{
    height:76%;
    padding: 0.1vh 1vw;
}
.server-table{
    width:50%;
    height:100%;
    margin-left:0.5vw;
    display:flex;
    justify-content: center;
    align-items: center;
}
.unstable-kt{
    width:12%;
    height:100%;
    margin:0 0 0 1%;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(247, 247, 247);
    border-radius: 1rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}
.warn-list{
    width:10%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(247, 247, 247);
    border-radius: 1rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}
.unstable-kt-detail{
    width:70%;
    height:78%;
    margin:0;
    padding:0.5vh;
    display:flex;
    justify-content: center;
    align-items: center;
}
.warn-list-detail{
    width:50%;
    height:78%;
    margin:0;
    padding:0.5vh;
    display:flex;
    justify-content: center;
    align-items: center;
}
.fault-fwqs{
    height:58%;
    width:98%;
    display:flex;
    justify-content: center;
    align-items: center;
}
.fault-fwq{
    height:100%;
    width:15%;
}
.big-btm{
    padding:0.3rem;
    height:6%;
    width:96%;
    display: flex;
    justify-content: right;
    align-items: center;
}
</style>