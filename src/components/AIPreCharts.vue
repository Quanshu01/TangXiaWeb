<template>
    <div id="aipre-chart">
        <div class="choice-kt-fwq">
            <!-- 选择的tab是服务器参数 -->
            <div class="switch-fwq" v-if='Content.includes(content)'>
                <div style="margin-left:2vw">
                    <el-date-picker
                        v-model="chosenTime"
                        size="mini"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        @change="changeTime()">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div ref="chart" id="main" style="width: 100%; height: 100%; background-color: rgb(247, 247, 247);"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props:{
        'content':{
            type:String,
            default:'powerJF',
        }
    },
    data() {
        return {
            chosenTime:["-1","-1"],
            prealltime:[],
            Content:["powerJF","tempOUT"],
        }
    },
    created(){
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))

        var postAIpreParams=[]
        if(this.Content.includes(this.content)){
            postAIpreParams = [this.chosenTime.slice(0,2)]
        }
        // console.log('created aipre postAIpreParams',postAIpreParams)
        axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/preshownew",postAIpreParams,
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")//
                },
            }).then(res=>{
                // console.log('axios preshownew post',res);
                this.getAIpreData(res)
                this.drawAIpreChart()
            })
            .catch(function (error) {
                console.log('axios preshownew post error',error)
            });
    },
    mounted(){
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        },73805)
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
        changeTime(){
            var postAIpreParams = [this.chosenTime.slice(0,2)]
            this.postAIpreParams(postAIpreParams)
        },
        getAIpreData(Response){
            this.prealltime = Response.data['timeline']
            if(this.content=='powerJF'){
                this.predata = Response.data['future_power']
                this.realdata = Response.data['now_power']
            }
            else{
                if(this.content=='tempOUT'){
                    this.predata = Response.data['future_temperature']
                    this.realdata = Response.data['now_temperature']
                }
            }
        },
        postAIpreParams(postAIpreParams){
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/preshownew",postAIpreParams,
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(res=>{
                // console.log('axios preshownew post',res);
                this.getAIpreData(res)
                this.drawAIpreChart()
            })
            .catch(function (error) {
                console.log('axios preshownew post',error);
            });
        },
        drawAIpreChart(){
            var myChart = this.$echarts.init(this.$refs.chart);
            myChart.setOption({
                title: {
                    textStyle: {
                        fontSize: '0.6rem',
                        color:'#888888'
                    },
                    x:'center',
                },
                legend: {
                    data: ['15分钟后预测值', '真实值'],
                    right: '5%',//图例距离整个容器底部的距离
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.prealltime,
                        axisLabel: {
                            textStyle: {
                                // fontSize: "0.5rem",
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                    axisLabel:{
                        formatter:function(value){
                            return value.toFixed(2)
                        },
                        textStyle: {
                            fontSize: "0.5rem",
                        },
                    },
                    type: 'value',
                    min: function (value) {
                        if(value.min>100)
                            return value.min - 10;
                        else
                            return value.min - 2;
                    },
                    max: function (value) {
                        if(value.min>100)
                            return value.max + 10;
                        else
                            return value.max + 2;
                    },
                    },
                ],
                series: [
                    {
                        data: this.predata,
                        name:'15分钟后预测值',
                        type: 'line',
                        lineStyle: {
                            color:'#3097FF',
                        },
                        color:'#3097FF',
                    },
                    {
                        data: this.realdata.slice(9,-1),
                        name:'真实值',
                        type: 'line',
                        lineStyle: {
                            color:'#AFAFAF',
                        },
                        color:'#AFAFAF',
                    },
                ],
                dataZoom: {
                    textStyle: {
                        fontSize: '0.6rem',
                        color:'#888888'
                    },
                    type: 'slider',
                    show: true,
                    start: 0,
                    height: 5,
                    bottom: 12,
                },
                tooltip: {
                    trigger: 'axis',
                    confine: false,
                    appendToBody: true,
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#283b56'
                        }
                    }
                },
                grid: {
                    left:'6%',
                    right:'8%',
                    top:'25%',
                    bottom:'30%',
                    borderWidth: 1,
                },
            });
        },
    },
}
</script>

<style>
.choice-kt-fwq{
    width:100%;
    height:3vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.switch-kt,.switch-fwq{
    display: flex;
    justify-content: center;
    align-items: center;
    zoom:0.8
}
.choose-date{
    background-color: antiquewhite;
}
.click2FWQ,.click2KT{
    width:2.6vw;
    font-size:0.6rem;
    padding:0.3rem;
}
</style>