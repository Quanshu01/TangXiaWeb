<template>
    <div class="ai-show-copy">
        <title-top name="温度概况"
                content="目前系统运行状态">
        </title-top>
        <div class="box-card-scroll-1">
            <div  class="display-data" v-for="n in aidataValue.length" :key="n.index">
                    <span class="display-value">
                        {{ aidisKey[n-1] }}
                    </span> : 
                <div class="display-key-ai" v-if="datatrue1">{{ aidataValue[n-1] }} ℃</div>
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
            disKey:['AI启停状态', '机房状态', 'AI触发模块'],
            aidisKey:['冷通道最低温度', '冷通道最高温度', '热通道最低温度', '热通道最高温度'],
            displayKeyContent:['目前AI状态（开启/关闭）','目前机房热点情况（无热点/服务器X出现热点）','目前 AI所处状态（关闭/群控/预控/保底）'],
            paramsdatas:{},
            aiKey:['冷通道最低温度', '冷通道最高温度', '热通道最低温度', '热通道最高温度'],
            aidata:{},
            aidataKey:[],
            aidataValue:[],
            datatrue1:false,
            displayTemp:[
                {
                    "Content": "冷通道最低温度",
                    "Detail": 22.40
                },
                {
                    "Content": "冷通道最高温度",
                    "Detail": 23.90
                },
                {
                    "Content": "热通道最低温度",
                    "Detail": 25.01
                },
                {
                    "Content": "热通道最高温度",
                    "Detail": 26.80
                }
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
            // 初始化 aidata
            this.aidata = {};
            for (let i = 0; i < this.displayTemp.length; i++) {

                const item = this.displayTemp[i];
                this.aidata[item.Content] = item.Detail;
            }

            // 处理 aidataKey 和 aidataValue 的值
            this.aidataKey = Object.keys(this.aidata);
            this.aidataValue = Object.values(this.aidata);

            // 设置 datatrue1 为 true 表示数据已加载
            this.datatrue1 = true;



            // this.aidataKey = Object.keys(this.displayTemp);
            // this.aidataValue = Object.values(this.displayTemp);

            // axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aipreparams",
            // {
            //     headers:{
            //         'token':window.sessionStorage.getItem("token")
            //     },
            // }).then(
            //     Response=>{
            //         this.datatrue1 = true
            //         this.aidata={}
            //         for(var i=0;i<Response.data.length;i++){
            //             this.aidata[Response.data[i].Content]=Response.data[i].Detail
            //         }
            //         this.aidataKey=Object.keys(this.aidata)
            //         this.aidataValue=Object.values(this.aidata)
            // },
            // Error=>{
            //     console.log('axios aipreparams error',Error.message)
            // });
        },
    },
}
</script>

<style>
.ai-show-copy{
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
    font-size: 0.7rem;
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
    padding:0
}
.display-value{
    font-size: 0.8rem;
    font-weight: 800;
}
</style>