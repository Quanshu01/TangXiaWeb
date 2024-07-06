<template>
    <div class="system-name">
        <div class="system-name-jfNtime">
            <div style="font-size: 0.8rem; margin:0 0.2rem">当前位于棠下:</div>
            <div class="nameNchange">
                <!-- <div class="jf-name">{{chooseJF}}机房</div> -->
                <div class="jf-name">703 机房</div>
                <el-tooltip class="item" effect="dark" content="切换机房" placement="bottom">
                    <el-button size="mini" class="exchange-JF" icon="el-icon-sort" @click="changeJF()"></el-button>
                </el-tooltip>
                <el-drawer title="切换机房" :visible.sync="JFChangedVisibledrawer" direction="ttb" size="30%">
                    <div>
                        <el-form label-position="top" label-width="100px">
                            <el-form-item>
                                <el-select v-model="value" placeholder="请选择机房" @change="JFSelect(value)">
                                    <el-option v-for="item in JFs"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div class="demo-drawer__footer">
                            <el-button @click="cancelForm">取 消</el-button>
                            <el-button type="primary" @click.native="toComfirmChange">确 定</el-button>
                        </div>
                    </div>
                </el-drawer>
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
            value:703,
            JFChangedVisibledialog:false,
            JFChangedVisibledrawer:false,
            JFs:[
                {
                    value: 703,
                    label: '703机房'
                },
                {
                    value: 303,
                    label: '303机房'
                },
            ],
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
        this.chooseJF = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getjfparamsdata()
        this.paramsdata =  JSON.parse(window.sessionStorage.getItem("jfprms"))
    },
    mounted(){
        this.chooseJF = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getjfparamsdata()
        this.paramsdata =  JSON.parse(window.sessionStorage.getItem("jfprms"))
        this.timer2=setInterval(()=>{
            this.getjfparamsdata()
            this.paramsdata =  JSON.parse(window.sessionStorage.getItem("jfprms"))
        },10000)
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
        changeJF(){
            this.tempChooseJF = this.value
            // console.log('click change JF initial tempChooseJF',this.tempChooseJF)
            // console.log('click change JF button',this.chooseJF)
            this.JFChangedVisibledialog=true
            this.JFChangedVisibledrawer = true
        },
        handleClose() {
            this.JFChangedVisibledialog = false
            this.$message({
                message: "取消切换机房",
            });
        },
        JFSelect(value){
            this.tempChooseJF = value
            // console.log('choose change JF button value',value)
            // console.log('choose change JF button',this.tempChooseJF)
        },
        cancelForm() {
            this.dialog = false;
            this.JFChangedVisibledrawer = false
            // console.log('cansole change JF',this.chooseJF)
            clearTimeout(this.timer);
        },
        toCancelChange(){
            this.JFChangedVisibledialog = false,
            this.JFChangedVisibledrawer = false,
            this.$message({
                message: "取消切换机房",
            });
            // console.log('cansole change JF',this.chooseJF)
        },
        toComfirmChange(){
            if(this.tempChooseJF==this.JFname){
                this.$alert('系统正处于您所选择的 '+this.JFname+' 机房。', {
                    confirmButtonText: '好的',
                });
                // console.log('confirm change JF same',this.tempChooseJF)
            }
            else{
                this.$confirm('确定要切换到 '+this.value+' 机房吗？')
                    .then(_ => {
                        console.log('confirm change JF yes',this.chooseJF,_)
                        sessionStorage.setItem("room",  JSON.stringify(this.value))
                        sessionStorage.removeItem('realtimefwqrtdwdbig');
                        sessionStorage.removeItem('realtimefwqpower');
                        sessionStorage.removeItem('fwqltdwdDownMaxIndex');
                        sessionStorage.removeItem('realtimefwqltdwdbig');
                        sessionStorage.removeItem('realtimefwqltdwdsmall');
                        sessionStorage.removeItem('realtimefwqrtdwdsmall');
                        sessionStorage.removeItem('fwqltdwdUpMaxIndex');
                        sessionStorage.removeItem('ktdataall');
                        this.$message({
                            type: "success",
                            message: "成功切换为 "+this.value+ " 机房！",
                        });
                        setTimeout(function() {
                            location.reload() //成功切换机房后整体刷新一下
                        },1000)  // 1秒后执行打印功能
                        })
                    .catch(_ => {
                        console.log('confirm change JF no',this.chooseJF,_)
                    });
                }
            this.JFChangedVisibledrawer = false
        },
        getjfparamsdata(){
            axios.get(this.global.apiURL+'6703'+"/jf703/jfparams",
            // axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/jfparams",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios jfparams sys',Response.data)
                    var paramsdataTemp = {}
                    for(var i=0;i<Response.data.length;i++){
                        // paramsdataTemp[Response.data[i].Content]=Response.data[i].Detail
                        paramsdataTemp[Response.data[i].content]=Response.data[i].detail
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
    -webkit-transform: scale(0.90);
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