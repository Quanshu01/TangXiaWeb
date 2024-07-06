<template>
    <div class="ltd-changed">
        <div class="ltd-changed-inside">
            <div class="hot-fwdNkt">
                <div class="hot-fwqs">
                    <div class="hot-fwq" v-for="n in JF.length" :key="n.index">
                        <KeepAlive>
                            <changed-fwq :fwqId="n" :ifBig="false" :hotpointriskall="hotpointriskall"></changed-fwq>
                        </KeepAlive>
                    </div>
                </div>
                <div class="hot-contents">
                    <div class="one-content-hot-s">
                        <div class="content-pic-hot-s" style="background-color:#8698d0;"></div>
                        <div class="content-text-hot-s" style="color:#8698d0;">低波动区</div>
                    </div>
                    <div class="one-content-hot-s">
                        <div class="content-pic-hot-s" style="background-color:#79BCFF;"></div>
                        <div class="content-text-hot-s" style="color:#79BCFF;">中波动区</div>
                    </div>
                    <div class="one-content-hot-s">
                        <div class="content-pic-hot-s" style="background-color:#2D71CF;"></div>
                        <div class="content-text-hot-s" style="color:#2D71CF;">高波动区</div>
                    </div>
                    <div class="one-content-hot-s">
                        <div class="content-pic-hot-s" style="background-color:#0F1114;"></div>
                        <div class="content-text-hot-s" style="color:#0F1114;">弃用测点</div>
                    </div>
                    <div class="one-content-hot-s">
                        <el-tooltip class="item" effect="light" content="查看大图" placement="top-start">
                            <el-button size="mini" class="go-big-view" icon="el-icon-zoom-in" @click="goBigLtdChanged"></el-button>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChangedFwq from '@/components/ChangedFwq.vue';
import BigLtdChanged from './BigLtdChanged.vue'
import axios from 'axios';

export default {
    metaInfo: {
        requiresAuth: true // 表示这个页面需要认证
    },
    data() {
        return {
            timer:"",
            JF:[],
            dialogChangeVisible:false,
            num: 1,
            time: 1,
            hotpointriskall:[]
        }
    },
    components:{
        'changed-fwq':ChangedFwq
    },
    created () {
        this.gethotpointrisk()
        this.getChange()
    },
    mounted(){
        this.gethotpointrisk()
        this.getChange()

        this.timer=setInterval(()=>{
            this.gethotpointrisk()
            this.getChange()
        },82430)
    },
    methods:{

        goBigLtdChanged(){
            this.$FModal.show(
                { 
                    component: BigLtdChanged,
                    maxHeight: '100%',
                    width: '96%', 
                    height:'100%',
                    placement: 'center center'  
                },
            )
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
                    console.log(this.JFname+' JF cold_detect_design post responce',res);
                })
                .catch(function (error) {
                    console.log(error);
                    // console.log(this.JFname+' JF cold_detect_design data - dont post',Response.message)
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
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/cold_detect_design",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios cold_detect_design Response',Response.data)
                    this.num=Response.data[0]
                    this.time=Response.data[1]
                },
                Error=>{
                    console.log(this.JFname+' JF dont get! - cold_detect_design',Response.message)
                    this.resbody = Error.message
            });
        }
    },
    computed: {
        gethotpointrisk() {
            return this.$store.getters.getHotpointRiskAll;
        }
    },
}
</script>

<style>
.ltd-changed{
    width:100%;
    height:98%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ltd-changed-inside{
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.change-value0{
    width:100%;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.change-value{
    width:100%;
    height: 10%;
    display: flex;
}
.windowTitle{
    width:2rem
}
.change-params{
    font-size: 0.8rem;
}
.hot-fwdNkt{
    width:100%;
    height: 90%;
    display: flex;
}
.hot-fwqs{
    padding:0.5rem;
    width:86%;
    height: 96%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hot-fwq{
    padding:0.5rem;
    width:12%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hot-contents{
    width:10%;
    height: 100%;
    /* display:flex; */
    justify-content: center;
    align-items: center;
}
.extend-fwqNkt{
    width:5%;
    height: 100%;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}
.one-content-hot-s{
    margin: 0.5%;
    width:100%;
    height:20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content-pic-hot-s{
    height:0.8rem;
    width:0.8rem;
    margin-right:0.5rem;
    border-radius: 20%;
    justify-content: center;
    align-items: center;
}
.content-text-hot-s{
    font-size: 0.6rem;
    font-weight: 900;
}
</style>