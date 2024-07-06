<template>
    <div class="ai-show">
        <div class="box-card-scroll-1">
            <div class="display-data">
                <el-tooltip class="item" effect="light" :content=displayKeyContent[0] placement="top-start">
                    <span class="display-value"><i class="el-icon-warning-outline"></i>{{ disKey[0] }}</span>
                </el-tooltip>
            </div>
                <div v-if="datatrue1"><div>{{ displayValue[0] }}</div></div>
                <el-tooltip class="item" effect="light" :content=displayKeyContent[1] placement="top-start">
                    <span class="display-value"><i class="el-icon-warning-outline"></i>{{ disKey[1] }}</span>
                </el-tooltip>
                <div class="display-key1" v-if="datatrue1"><div class="scrolling-content">{{ displayValue[1] }}</div></div>
                <el-tooltip class="item" effect="light" :content=displayKeyContent[2] placement="top-start">
                    <span class="display-value"><i class="el-icon-warning-outline"></i>{{ disKey[2] }}</span>
                </el-tooltip>
                <div v-if="datatrue1"><div>{{ displayValue[2] }}</div></div>
            </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "AIStatus",
    data(){
        return {
            display:{},
            displayValue:[],
            displayKey:[],
            disKey:['AI启停状态', '机房状态', 'AI触发模块'],
            displayKeyContent:['目前AI控制真实状态（开启/关闭）','目前机房热点情况（无热点/服务器X出现热点）','目前 AI所处状态（关闭/群控/预控/保底）'],
            paramsdatas:{},
            aiKey:['AI群控 扑灭实际热点', '热点预测准确率', '机房冷通道最高温度'],
            aidataKey:[],
            aidataValue:[],
            datatrue1:false,
        }
    },
    created () {
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getaidisplay()

    },
    mounted(){
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getaidisplay()

        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.getaidisplay()
        },20000)
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
        getaidisplay(){
            axios.get(this.global.apiURL+'6703'+"/jf703/aidisplay",
            // axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aidisplay",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    this.datatrue1 = true
                    this.display = Response.data
                    this.displayKey=Object.keys(Response.data)
                    this.displayValue=Object.values(Response.data)
                    console.log('this.displayKey',this.displayKey)
                    console.log('this.displayValue',this.displayValue)
                    console.log('this.displayKey.length',this.displayKey.length)
                },
                Error=>{
                    console.log('axios aidisplay error',Error.message)
                });
        },
    },
}
</script>

<style>
.ai-show{
    margin:1vh 0;
    width: 100%;
    height: 24vh;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.85);
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.display-key-ai{
    font-size: 0.6rem;
    font-weight: 600;
    padding:0.1rem;
}
.box-card-scroll-1 {
    margin: 0 3%;
    height:22vh;
    width:96%;
    border-radius: 0.6rem; 
    font-size:0.8rem;
    display: grid;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
}
.box-card-scroll-2 {
    margin: 1vh 3%;
    height:14vh;
    width:96%;
    border-radius: 0.6rem; 
    font-size:0.8rem;
    display: grid;
    align-items: center;
    justify-content: center;
    overflow-y: hidden;
}
.display-data{
    padding:0.1rem 0 0.1rem 0;
}
.display-value{
    font-size: 0.8rem;
    font-weight: 800;
}
.display-key{
    color:gray;
    font-size: 0.7rem;
    overflow-y: scroll;
    height:2rem;
}
.display-key1{
    overflow-y: scroll;
    height:3rem;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
    /* width: 13rem; */
}
.scrolling-content {
  animation: scrollText 30s linear infinite;
}
@keyframes scrollText {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>