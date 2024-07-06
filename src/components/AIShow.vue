<template>
    <div class="ai-show">
        <title-top name="运行状态"
                content="目前系统运行状态">
        </title-top>
        <div class="box-card-scroll-1">
            <div  class="display-data" v-for="n in aidataValue.length" :key="n.index">
                <el-tooltip class="item" effect="light" :content=displayKeyContent[n-1] placement="top-start">
                    <span class="display-value">
                        <i class="el-icon-warning-outline"></i>
                        {{ disKey[n-1] }}
                    </span> : 
                </el-tooltip>
                <div class="display-key" v-if="datatrue1">{{ aidataValue[n-1] }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import TitleTop from '@/components/TitleTop.vue';

export default {
    name: "AIStatus",
    data(){
        return {
            display:{},
            displayValue:[],
            displayKey:[],
            disKey:['AI启停状态', '机房状态'],
            displayKeyContent:['目前AI控制真实状态（开启/关闭）','目前机房热点情况（无热点/服务器X出现热点）'],
            paramsdatas:{},
            aidata:{},
            aiKey:['AI群控 扑灭实际热点', '热点预测准确率', '机房冷通道最高温度'],
            aidataKey:[],
            aidataValue:[],
            datatrue1:true,
            displayStatus:[
                {
                    "Content": "AI启停状态",
                    "Detail": '开启'
                },
                {
                    "Content": "机房状态",
                    "Detail": '无热点'
                },
            ]
        }
    },
    created () {
        this.getaidisplay()
    },
    mounted(){
        this.getaidisplay()

        // this.timer=setInterval(()=>{
        //     this.getaidisplay()
        // },2000)
    },
    components: {
        'title-top':TitleTop,
    },
    methods:{
        getaidisplay(){
            console.log("Display Temp Length:", this.displayStatus.length);

            // 初始化 aidata
            this.aidata = {};
            for (let i = 0; i < this.displayStatus.length; i++) {
                const item = this.displayStatus[i];
                this.aidata[item.Content] = item.Detail;
            }

            // 处理 aidataKey 和 aidataValue 的值
            this.aidataKey = Object.keys(this.aidata);
            this.aidataValue = Object.values(this.aidata);

            console.log("aidataKey:", this.aidataKey);
            console.log("aidataValue:", this.aidataValue);

            // 设置 datatrue1 为 true 表示数据已加载
            this.datatrue1 = true;
            // axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aidisplay",
            // {
            //     headers:{
            //         'token':window.sessionStorage.getItem("token")
            //     },
            // }).then(
            //     Response=>{
            //         this.display = Response.data
            //         this.displayKey=Object.keys(Response.data)
            //         this.displayValue=Object.values(Response.data)
            //     },
            //     Error=>{
            //         console.log('axios aidisplay error',Error.message)
            //     });
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
    height:18vh;
    width:96%;
    border-radius: 0.8rem; 
    font-size:0.8rem;
    display: grid;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
}
.display-data{
    padding:0.2rem 0 0.2rem 0;
}
.display-value{
    font-size: 0.8rem;
    font-weight: 800;
}
.display-key-ai{
    color:gray;
    font-size: 0.8rem;
}
</style>