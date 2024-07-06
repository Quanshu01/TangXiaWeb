<template>
    <!-- AI状态栏 -->
    <div class="ai-status">
        <div class="box-card-1">
            <div class="display-value-new" style="font-size: 1vw;zoom:0.9">
                <div>
                    <el-tooltip placement="top" effect="light">
                        <div slot="content">
                            开启/关闭 AI群控+预控+保底
                        </div>
                        <i class="el-icon-warning-outline TitleTopContent"></i>
                    </el-tooltip>
                </div>
                <div class="control-ai">
                    AI开关
                    <div>
                        <el-switch
                            :value="ifAIopen" class="ai-switch"
                            active-color="#13ce66" inactive-color="#E5E5E5"
                            active-value="1" inactive-value="0"
                            @click.native="inputAI()">
                        </el-switch>
                        <el-dialog
                            title="启停AI密码验证"
                            :visible.sync="AIpasswordVisible"
                            width="30%"
                        >
                            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="密码" prop="pass">
                                    <el-input type="password" placeholder="请输入" 
                                    v-model="ruleForm.pass" prefix-icon="el-icon-lock" show-password
                                    autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="AIpasswordVisible = false">取 消</el-button>
                                <el-button type="primary" @click="confirmAI()">确 定</el-button>
                            </span>
                        </el-dialog>
                        <el-dialog
                            append-to-body
                            title="关闭AI后操作提示"
                            :visible.sync="closeAIrecommandDialog"
                            width="30%"
                            @opened="handleDialogOpened"
                            >
                            <span v-if="showFirstReminder" ref="firstReminder">您已关闭AI，请 15分钟 后再关闭维谛开关。</span>
                            <span v-else ref="secondReminder">第二次提醒，请关闭维谛开关。</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="handleCloseDialog">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-card-1">
            <div class="display-value-new" style="font-size: 1vw;zoom:0.9">
                    <div>
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">
                                恢复所有控制参数
                            </div>
                            <i class="el-icon-warning-outline TitleTopContent"></i>
                        </el-tooltip>
                    </div>
                <div class="control-ai">
                        <div v-if="ifResetopen == 0">
                                <div>一键恢复</div>
                                <div v-if="AIopened == 0">
                                    <el-tooltip effect="light" content="AI开关从未启动过，无需恢复" placement="top">  
                                        <el-button class="ai-switch" icon="el-icon-refresh-left" @click="inputReset()"></el-button>          
                                    </el-tooltip>
                                </div>
                                <div v-else>
                                        <div v-if="AIopened == 1">
                                            <el-tooltip effect="light" content="一键恢复前需要关闭AI开关" placement="top">  
                                                <el-button class="ai-switch" icon="el-icon-refresh-left" @click="inputReset()"></el-button>          
                                            </el-tooltip>
                                        </div>
                                        <div v-if="AIopened == 2">  
                                                <el-button class="ai-switch" icon="el-icon-refresh-left" @click="inputReset()"></el-button>          
                                        </div>      
                                </div>
                        </div>
                        
                        <div v-else>
                            <div>恢复中</div>
                            <el-button class="ai-switch" :loading="true"></el-button>                
                        </div>
                    
                    <el-dialog
                        title="一键恢复密码验证"
                        :visible.sync="ResetpasswordVisible"
                        width="30%"
                        >
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="密码" prop="pass">
                                <el-input type="password" placeholder="请输入" show-password
                                v-model="ruleForm.pass" prefix-icon="el-icon-lock"
                                autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="ResetpasswordVisible = false">取 消</el-button>
                            <el-button type="primary" @click="confirmReset()">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </div>
        </div>
        <div class="box-card-1">
            <div class="display-value-new" style="font-size: 1vw;zoom:0.9">
                <div>
                    <el-tooltip placement="top" effect="light">
                        <div slot="content">
                            修改AI算法控制参数
                        </div>
                        <i class="el-icon-warning-outline TitleTopContent"></i>
                    </el-tooltip>
                </div>
                <div class="control-ai">
                    AI参数
                    <div style="">
                                <div v-if="ifAIopen == 0">
                                    <el-tooltip effect="light" content="修改AI参数前请打开AI开关" placement="top" >  
                                        <el-button class="ai-switch" icon="el-icon-edit" @click="inputParams()"></el-button>          
                                    </el-tooltip>
                                </div>
                                <div v-else>
                                    <el-button class="ai-switch" icon="el-icon-edit" @click="inputParams()"></el-button>          
                                </div>
                        
                            <el-dialog
                                title="修改AI参数密码验证"
                                :visible.sync="ParamspasswordVisible"
                                width="30%">
                                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="密码" prop="pass">
                                        <el-input type="password" placeholder="请输入" show-password
                                        v-model="ruleForm.pass" prefix-icon="el-icon-lock"
                                        autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="ParamspasswordVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="confirmParams()">确 定</el-button>
                                </span>
                            </el-dialog>
                            <el-dialog
                                append-to-body
                                title="AI参数修改"
                                :visible.sync="aiControlVisible"
                                width="30%">
                                    <ai-control></ai-control>
                                <span slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="comfirmAIParamsEdit">确 定</el-button>
                                </span>
                            </el-dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import AIcontrolDetail from './AIcontrolDetail.vue';

export default {
    name: "AIStatus",
    data(){
        return {
            ifAIopen: "0",
            ifResetopen: "0",
            aiControlVisible: false,
            AIpasswordVisible: false,
            ResetpasswordVisible: false,
            ParamspasswordVisible: false,
            closeAIrecommandDialog: false,
            showFirstReminder: false,
            inputPassword:'',
            ruleForm: {
                pass: '',
            },
            displaydata:[],
            displayKey:[],
            displayDataContent:['目前AI状态（开启/关闭）','目前机房热点情况（无热点/服务器X出现热点）','目前 AI所处状态（关闭/群控/预控/保底）'],
            paramsdatas:{},
            paramsdata1:{},
            rules: [],  // 声明并设置 rules 属性为响应式属性
            systime:(new Date()).toLocaleString('chinese',{hour12:false}),
            handleUser: {
                userName: "",
                role: "",
                time_operate: "",
            },
            timer:"",
            timer2:"",
            AIopened:0,//默认开启时AI未启动
        }
    },
    components: {
        'ai-control':AIcontrolDetail,
    },
    created () {
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.role = this.global.roles[(JSON.parse(window.sessionStorage.getItem("user")))['role']]
        this.userName = (JSON.parse(window.sessionStorage.getItem("user")))['userName']
        this.getENS()
    },
    mounted(){
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.role = this.global.roles[(JSON.parse(window.sessionStorage.getItem("user")))['role']]
            this.userName =(JSON.parse(window.sessionStorage.getItem("user")))['userName']
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.systime=(new Date()).toLocaleString('chinese',{hour12:false})
        },1000)
        this.timer=setInterval(()=>{
            this.getENS()
        },15003)

        this.playVoicePrompt();
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
        getENS(){
            axios.get(this.global.apiURL+'6703'+"/jf703/aicontrol",
            // axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aicontrol",
                {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    this.ifAIopen = Response.data[0]
                    this.ifResetopen = Response.data[1]
                    if(this.ifAIopen == 1){
                        this.AIopened = 1
                    }
                    // console.log('this.ifAIopen',this.ifAIopen)
                },
                Error=>{
                    console.log('axios aicontrol error',Error.message)
                });
        },

        inputAI(){
            const hContent = this.$createElement;
            if(this.role!='普通用户'){
                this.AIpasswordVisible=true
                this.ruleForm['pass']=''
            }
            else{
                this.$notify({
                    title: '无法启停AI',
                    message: hContent('i', { style: 'color: grey'}, '您是'+this.role+', 无权限开启/停止AI')
                });
            }
        },
        confirmAI(){
            const hContent = this.$createElement;
            this.AIpasswordVisible = false
            this.inputPassword = this.ruleForm['pass']
            // console.log('this.inputPassword',this.inputPassword)
            this.postRes = false
            axios.
                post(this.global.apiURL+this.global.ports[this.JFname]+"/"+this.JFname+"/password",this.inputPassword,            
                    {
                        headers:{
                            'token':window.sessionStorage.getItem("token"),
                            'Content-Type':'text/plain'
                        },
                    }
                ).then(res=>{
                    this.postRes = res.data
                    // console.log('axios password post this.postRes',this.postRes);
                    if(this.postRes){
                        this.openAI()
                    }
                    else{
                        this.$notify({
                            title: '无法启停AI',
                            message: hContent('i', { style: 'color: grey'}, '启停AI密码输入错误')
                        });
                    }
                })
                .catch(function (error) {
                    console.log('axios password post error',error);
                });
        },
        openAI(){
            const hContent = this.$createElement;
            this.showFirstReminder = true
                if(this.ifAIopen=="0"){
                    if(this.ifResetopen == 0){  // 一键恢复期间不能开启AI
                        this.ifAIopen="1"
                        axios.post(this.global.apiURL+'6703'+"/jf703/aicontrol",[this.ifAIopen,this.ifResetopen,this.userName,this.role,this.systime.replace(/\//g, "-")],
                        
                        // axios.post(this.global.apiURL+'6703'+"/jf703/aidata",[this.ifAIopen,this.ifResetopen,this.userName,this.role,this.systime.replace(/\//g, "-")],               
                        // axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aicontrol",[this.ifAIopen,this.ifResetopen,this.userName,this.role,this.systime.replace(/\//g, "-")],
                        {
                            headers:{
                                'token':window.sessionStorage.getItem("token")
                            },
                        }).then(res=>{
                            console.log('axios aicontrol post',res);
                            this.$notify({
                                title: '开启 AI',
                                message: hContent('i', { style: 'color: #409EFF'}, '验证密码输入正确，准备开始 AI'),
                            });
                            this.AIopened = 1;
                        })
                        .catch(function (error) {
                            console.log('axios aicontrol post',error);
                        });
                    }
                    else{
                        this.$notify({
                            title: '无法 开启AI',
                            message: hContent('i', { style: 'color: grey'}, '正在一键恢复， 无法 开启/停止 一键恢复')
                        });
                    }
                }
                else{
                    this.ifAIopen="0";
                    axios.post(this.global.apiURL+'6703'+"/jf703/aicontrol",[this.ifAIopen,this.ifResetopen,this.userName,this.role,this.systime.replace(/\//g, "-")],
                    // axios.post(this.global.apiURL+'6703'+"/jf703/aidata",[this.ifAIopen,this.ifResetopen,this.userName,this.role,this.systime.replace(/\//g, "-")],
                    // axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aicontrol",[this.ifAIopen,this.ifResetopen,this.userName,this.role,this.systime.replace(/\//g, "-")],
                    {
                        headers:{
                            'token':window.sessionStorage.getItem("token")
                        },
                    }).then(res=>{
                            console.log('axios aicontrol post',res);
                            this.$notify({
                                title: '关闭 AI',
                                message: hContent('i', { style: 'color: #E6A23C'}, '验证密码输入正确，准备关闭 AI')
                            });
                            this.AIopened = 2;
                        })
                        .catch(function (error) {
                            console.log('axios aicontrol post error',error);
                        });

                }
        },

        inputReset(){
            const hContent = this.$createElement;
            if(this.role!='普通用户'){
                this.ResetpasswordVisible=true
                this.ruleForm['pass']=''
            }
            else{
                this.$notify({
                    title: '无法一键恢复',
                    message: hContent('i', { style: 'color: grey'}, '您是'+this.role+', 无权限开启/停止一键恢复')
                });
            }
        },
        confirmReset(){
            const hContent = this.$createElement;
            this.ResetpasswordVisible = false
            this.inputPassword = this.ruleForm['pass']
            this.postRes = false
            axios.
                post(this.global.apiURL+this.global.ports[this.JFname]+"/"+this.JFname+"/password",this.inputPassword,            
                    {
                        headers:{
                            'token':window.sessionStorage.getItem("token"),
                            'Content-Type': 'text/plain'
                        },
                    }
                ).then(res=>{
                    this.postRes = res.data
                    // console.log('axios password post',this.postRes);
                    if(this.postRes){
                        this.reSet()
                    }
                    else{
                        this.$notify({
                            title: '无法一键恢复',
                            message: hContent('i', { style: 'color: grey'}, '一键恢复密码输入错误')
                        });
                    }
                })
                .catch(function (error) {
                    console.log('axios password post error',error);
                });
        },
        reSet(){
            const hContent = this.$createElement;
                if(this.ifResetopen=="0"){
                    this.ifResetopen="1"
                    axios.post(this.global.apiURL+'6703'+"/jf703/aicontrol",[this.ifAIopen,this.ifResetopen,this.userName,this.role,this.systime.replace(/\//g, "-")],
                    // axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aicontrol",[this.ifAIopen,this.ifResetopen,this.userName,this.role,this.systime.replace(/\//g, "-")],
                    {
                        headers:{
                            'token':window.sessionStorage.getItem("token")
                        },
                    }).then(res=>{
                            console.log('axios post aicontrol',res);
                            this.$notify({
                                title: '开启 一键恢复',
                                message: hContent('i', { style: 'color: #409EFF'}, '正在一键恢复AI开启前参数设置')
                            });
                        })
                        .catch(function (error) {
                            console.log('axios post aicontrol error',error);
                        });
                }
        },

        inputParams(){
            const hContent = this.$createElement;
            if(this.role=='超管员'){
                this.ParamspasswordVisible=true
                this.ruleForm['pass']=''
            }
            else{
                this.$notify({
                    title: '无法修改AI参数',
                    message: hContent('i', { style: 'color: grey'}, '您是'+this.role+', 无权限修改AI参数')
                });
            }
        },
        confirmParams(){
            const hContent = this.$createElement;
            this.ParamspasswordVisible = false
            this.inputPassword = this.ruleForm['pass']
            // console.log('this.inputPassword',this.inputPassword)
            this.postRes = false
            axios.
                post(this.global.apiURL+this.global.ports[this.JFname]+"/"+this.JFname+"/password",this.inputPassword,            
                    {
                        headers:{
                            'token':window.sessionStorage.getItem("token"),
                            'Content-Type':'text/plain'
                        },
                    }
                ).then(res=>{
                    this.postRes = res.data
                    // console.log('axios password post',res);
                    if(this.postRes){
                        // console.log('axios password post',this.postRes);
                        this.aiControlVisible = true
                    }
                    else{
                        this.$notify({
                            title: '无法修改AI参数',
                            message: hContent('i', { style: 'color: grey'}, '修改AI参数密码输入错误')
                        });
                    }
                })
                .catch(function (error) {
                    console.log('axios password post error',error);
                });
        },

        comfirmAIParamsEdit(){
            this.handleUser = {
                userName: this.userName,
                userRole: this.role,
                time_operate: this.systime.replace(/\//g, "-")
            };

            // 存储数据到 sessionStorage
            window.sessionStorage.setItem("handleuser", JSON.stringify(this.handleUser));

            var user = JSON.parse(window.sessionStorage.getItem("handleuser"));
            var comfirmAIParams = JSON.parse(window.sessionStorage.getItem("aitempparams"));

            // 构造要发送给后端的数据对象
            var requestData = {
                content: comfirmAIParams, // 使用名为 content 的属性存储 comfirmAIParams 数据
                user: user // 使用名为 user 的属性存储 user 数据
            };

            this.systime = this.systime.replace(/\//g, "-");
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aiparams",requestData,           
                    {
                        headers:{
                            'token':window.sessionStorage.getItem("token")
                        },
                    }
                ).then({
                    // console.log('axios aiparams post',res);
                })
                .catch(function (error) {
                    console.log('axios aiparams post error',error);
                });
            this.aiControlVisible = false
        },
        handleCloseDialog() {
        this.closeAIrecommandDialog = false;
        if (this.showFirstReminder) {
            // 显示第一次提醒后，15分钟后再显示第二次提醒
            setTimeout(() => {
            this.closeAIrecommandDialog = true;
            this.showFirstReminder = false;
            }, 15 * 60 * 1000); // 15分钟等于15 * 60秒 * 1000毫秒
            // }, 10 * 1000); // 15分钟等于15 * 60秒 * 1000毫秒
        }
        },
        handleDialogOpened() {
            this.$nextTick(() => {
                this.playVoicePrompt();
            });
        },
        playVoicePrompt() {
            const firstReminder = this.$refs.firstReminder;
            const secondReminder = this.$refs.secondReminder;
        
            const utterance = new SpeechSynthesisUtterance();
        
            if (this.showFirstReminder) {
                utterance.text = firstReminder.innerText;
            } else {
                utterance.text = secondReminder.innerText;
            }
        
            window.speechSynthesis.speak(utterance);
         },
    },
    watch:{
        ifResetopen(newValue, oldValue){
            const hContent = this.$createElement;
            if(newValue==0 && oldValue==1){
                this.$notify({
                    title: '一键恢复 结束',
                    message: hContent('i', { style: 'color: green'}, 'AI参数已恢复至开启前设置')
                });
            }
        },
        ifAIopen(newValue, oldValue){
            if(newValue==0 && oldValue==1){
                this.closeAIrecommandDialog = true
            }
        }
    }
}
</script>

<style>
.ai-status{
    margin: 1vh 0 0 0;
    width: 100%;
    height: 20vh;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.85);
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.el-divider--horizontal {
  display:inline-block;
  width:80%;
  height:1px;
  margin:0;
  vertical-align:middle;
}
.top-show{
    padding:0.2vh 0.2vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mid-show{
    height:30%;    
    /* width:100%; */
    padding:0.2vh 0.2vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btm-show{
    height:28%;    
    padding:0.2vh 0.2vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-card__body{
    padding:0.2vw;
}
.box-card-1{
    width: 100%;
    height:28%;
    border-radius: 0.8rem; 
    padding:0.2rem;
    font-size:0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.box-card-2{
    width: 100%;
    height:65%;
    border-radius: 0.8rem; 
    padding:0.2rem;
    font-size:0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.ai-switch{
    width:3vw;
    height:3vh;
    padding: 0.1rem;
}
.display-data{
    padding:0.2rem 0 0.2rem 0;
}
.display-value{
    font-size: 0.7rem;
    font-weight: 800;
}
.display-key{
    color:gray;
    font-size: 0.7rem;
}
.control-ai{
    display: grid;
    align-items: center;
    padding:0 0.5vw;
    align-items: center;
    justify-items: center;
}
.display-value-new{
    font-size: 0.8rem;
    font-weight: 800;
    display:flex;
}
</style>