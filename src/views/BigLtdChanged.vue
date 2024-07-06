<template>
    <div id="big-ltd-changed">
        <div class="bigscreen-top">
            <div></div>
            <div class="bigscreen-title-info">
                <div class="bigscreen-title-name">
                    冷通道波动显示
                </div>
                <div class="bigscreen-title-text">
                    {{JFname}}机房 服务器机组冷通道各测点温度比前t个时刻波动度数n
                    <div>
                        当前波动温度报警检测度数n: {{ num }} °C
                    </div>
                    <div>
                        当前波动温度报警检测时间t: {{ time }} 分钟
                    </div>
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
        <KeepAlive>
            <div class="big-hp-fwqNkt">
                <div class="big-hp-fwq" v-for="n in JF.length" :key="n.index">
                    <changed-fwq :fwqId="n" :ifBig="true" :hotpointriskall="hotpointriskall"></changed-fwq>
                </div>
            </div>
        </KeepAlive>
        <div class="content-hot">
            <div class="one-content-hot">
                <div class="content-pic-hot" style="background-color:#8698d0;"></div>
                <div class="content-text-hot" style="color:#8698d0;">低波动区</div>
            </div>
            <div class="one-content-hot">
                <div class="content-pic-hot" style="background-color:#79BCFF;"></div>
                <div class="content-text-hot" style="color:#79BCFF;">中波动区</div>
            </div>
            <div class="one-content-hot">
                <div class="content-pic-hot" style="background-color:#2D71CF;"></div>
                <div class="content-text-hot" style="color:#2D71CF;">高波动区</div>
            </div>
            <div class="one-content-hot">
                <div class="content-pic-hot" style="background-color:#0F1114;"></div>
                <div class="content-text-hot" style="color:#0F1114;">弃用测点</div>
            </div>
        </div>
    </div>
</template>

<script>
import ChangedFwq from '@/components/ChangedFwq.vue';
import axios from 'axios';

export default {
    data() {
        return {
            timer:"",
            JF:[],
            dialogChangeVisible:false,
            num: 1,
            time: 1,
        }
    },
    components:{
        'changed-fwq':ChangedFwq,
    },
    created () {
        this.getChange()
        this.gethotpointrisk()
    },
    mounted(){
        this.getChange()
        this.gethotpointrisk()

        this.timer=setInterval(()=>{
            this.getChange()
            this.gethotpointrisk()
        },78363)
    },
    methods: {
        closeModal: function () {
            this.$FModal.hide();
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
        toComfirm(){
            this.dialogChangeVisible=false
            const hContent = this.$createElement;
            this.postdata=[this.num,this.time]
            // console.log(this.JFname+' JF cold_detect_design post this.postdata',this.postdata);
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/cold_detect_design",this.postdata,
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")//
                },
            }).then(res=>{
                    console.log('axios cold_detect_design post',res);
                })
                .catch(function (error) {
                    console.log(error);
                    console.log('axios cold_detect_design post error',error);
                });
            this.$notify({
                title: '修改报警波动阈值 成功',
                message: hContent('i', { style: 'color: #67C23A'}, '修改报警波动度数为'+this.num+',检测时间为'+this.time)
            });
        },
        toCancel(){
            this.dialogChangeVisible=false
            this.$message({
                type: 'info',
                message: '取消输入报警波动阈值 权限密码'
            });
        },
        // handleChangeNum(value) {
        //     console.log(this.JFname+' JF cold_detect_design responce num',value);
        // },
        // handleChangeTime(value) {
        //     console.log(this.JFname+' JF cold_detect_design responce time',value);
        // },
        getChange(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/cold_detect_design",{
                headers:{
                    'token':window.sessionStorage.getItem("token")//
                },
            }).then(
                Response=>{
                    // console.log('axios cold_detect_design',Response.data)
                    this.num=Response.data[0]
                    this.time=Response.data[1]
                },
                Error=>{
                    console.log('axios cold_detect_design error',Error)
            });
        }
    },
    computed: {
        gethotpointrisk() {
            console.log('gethotpointriskdata'+this.$store.getters.getHotpointRiskAll)
            return this.$store.getters.getHotpointRiskAll;
        }
    },
}
</script>

<style>
#big-ltd-changed{
    min-width:90vw;
    padding:1rem 2rem 1rem 0;
    height: 91vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    justify-content: center;
    align-items: center;
    text-align: center;
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
.big-change-value{
    width:100%;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.big-change-params{
    font-size:1rem;
    font-weight: 500;
}
.big-hp-fwqNkt{
    padding:2vh 2vw 0 2vw;
    width:95%;
    height: 66vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.big-hp-fwq{
    width:15%;
    height: 100%;
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