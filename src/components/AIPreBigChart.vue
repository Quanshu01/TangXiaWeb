<template>
    <div id="aipre-big-chart">
        <div style="justify-content: right;">
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
        <div class="bigaipre-choose-fwq">
            <el-button-group v-for="n in fwqdoublelist" :key="n.index">
                <el-button class="click2KT" size="mini" @click="chooseFWQ($event)">{{n}}列</el-button>
            </el-button-group>
        </div>

        <div class="chart1">
            <div ref="chart" style="width:94vw; height: 14vh; background-color: white;"></div>
        </div>
        <div class="chart1">
            <div ref="chart1" style="width: 94vw; height: 14vh; background-color: white;"></div>
        </div>
        <div class="chart1">
            <div ref="chart5" style="width: 94vw; height: 14vh; background-color: white;"></div>
        </div>
        <div class="chart1">
            <div ref="chart3" style="width: 94vw; height: 14vh; background-color: white;"></div>
        </div>

        <div class="bigaipre-choose-fwq">
            <el-button-group v-for="n in JFktNum" :key="n.index">
                <el-button class="click2KT" size="mini" @click="chooseKT($event)">空调{{n}}</el-button>
            </el-button-group>
        </div>
        <div class="chart1">
            <div ref="chart2" style="width: 94vw; height: 14vh; background-color: white;"></div>
        </div>
        <div class="chart1">
            <div ref="chart4" style="width: 94vw; height: 14vh; background-color: white;"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; 

export default {
    prps:{
        precontent:{
            type:"",
            default:'power'
        }
    },
    mounted() {
        setTimeout(()=>{
            this.$echarts.init(this.$refs.chart)
            this.$echarts.init(this.$refs.chart1)
            this.$echarts.init(this.$refs.chart2)
            this.$echarts.init(this.$refs.chart3)
            this.$echarts.init(this.$refs.chart4)
            this.$echarts.init(this.$refs.chart5)
        },200000)
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        },68107)
        this.chart.dispatchAction({
            type: 'hideTip'
        })
        this.chart.dispatchAction({
            type: 'updateAxisPointer',
            currTrigger: 'leave'
        })
    },
    created(){
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))

        var postAIpreParams=[[['server','power',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','ltdwdmax',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','ltdwdavg',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','rtdwd',this.FWQ],this.chosenTime.slice(0,2)],
                                [['kt','sfwd',this.KT],this.chosenTime.slice(0,2)],
                                [['kt','hfwd',this.KT],this.chosenTime.slice(0,2)]]
        for(var i=0;i<postAIpreParams.length;i++){
            this.postData(postAIpreParams[i],2,i)
        }
    },
    data() {
        return {
            init:true,
            FWQ:"AB",
            KT:"1",
            FWQindex:0,
            fwqdouble:[],
            fwqdoublelist:[],
            JFktNum:0,
            kt:[],
            chosenTime:["-1","-1"],
            precontent:[],
            preParams:["power","ltdwdmax","ltdwdavg","rtdwd","sfwd","hfwd"],
            defaultDate:{},
        }
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
        postData(postAIpreParam,n,i){
            axios.
                post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/preshow",postAIpreParam,
                {
                    headers:{
                        'token':window.sessionStorage.getItem("token")//
                    },
                }).then(res=>{
                    // console.log('created bigaipre'+this.JFname+' JF post responce i',i,res);
                    var alltime = res.data['timeline']
                    this.defaultDate[this.preParams[i]]=[res.data['pre'],res.data['real']]
                    if(n==0){
                        this.drawAIpreFWQCharts(this.defaultDate,alltime)
                    }
                    else{
                        if(n==1){
                            this.drawAIpreKTCharts(this.defaultDate,alltime)
                        }
                        else{
                            this.drawAIpreFWQCharts(this.defaultDate,alltime)
                            this.drawAIpreKTCharts(this.defaultDate,alltime)
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        chooseFWQ: function(e) {
            this.FWQ=e.target.innerText.slice(0,2);
            var postAIpreParams=[[['server','power',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','ltdwdmax',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','ltdwdavg',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','rtdwd',this.FWQ],this.chosenTime.slice(0,2)],
                                [['kt','sfwd',this.KT],this.chosenTime.slice(0,2)],
                                [['kt','hfwd',this.KT],this.chosenTime.slice(0,2)]]
            for(var i=0;i<4;i++){
                this.postData(postAIpreParams[i],0,i)
            }
        },
        chooseKT: function(e) {
            this.KT=Number.parseInt(e.target.innerText.slice(2,4));
            var postAIpreParams=[[['server','power',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','ltdwdmax',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','ltdwdavg',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','rtdwd',this.FWQ],this.chosenTime.slice(0,2)],
                                [['kt','sfwd',this.KT],this.chosenTime.slice(0,2)],
                                [['kt','hfwd',this.KT],this.chosenTime.slice(0,2)]]
            for(var i=4;i<6;i++){
                this.postData(postAIpreParams[i],1,i)
            }
        },
        drawAIpreFWQCharts(DATA,TIME){
            // console.log('drawAIpreFWQCharts DATA',DATA)
            // console.log('drawAIpreFWQCharts TIME',TIME)
            var myChart = this.$echarts.init(this.$refs.chart); 
            var myChart1 = this.$echarts.init(this.$refs.chart1); 
            var myChart3 = this.$echarts.init(this.$refs.chart3); 
            var myChart5 = this.$echarts.init(this.$refs.chart5); 

            myChart.setOption({
                    title: {
                        text: '服务器' +String(this.FWQ)+' 功率',
                        textStyle: {
                            fontSize: '0.8rem',
                            color:'#888888'
                        },
                    },
                    legend: {
                        data: ['预测值', '真实值'],
                        right: '3%',//图例距离整个容器底部的距离
                    },
                    xAxis: [
                        {
                            type: 'category',                         
                            data: TIME,
                            axisLabel: {
                                textStyle: {
                                    fontSize: "0.5rem",
                                },
                            },
                        },
                    ],
                    yAxis: [
                        {
                            axisLabel: {
                                textStyle: {
                                    color:'#6B5812',
                                    fontSize: "0.4rem",
                                    fontWeight:'bolder'
                                },
                                formatter:function(value){
                                    return value.toFixed(2)
                                }
                            },
                            type: 'value',
                            // min:'dataMin', //最小值
                            min: function (value) {
                                return value.min - 5;
                            },

                            // max:'dataMax', //最大值
                            max: function (value) {
                                return value.max + 5;
                            },
                            minInterval: 1,
                        }
                    ],
                    series: [
                        {
                            // data: this.prefwqPower[this.FWQindex],
                            data: DATA['power'][0],
                            name:'预测值',
                            lineStyle: {
                                color:'#BA9820',
                            },
                            color:'#BA9820',
                            type: 'line'
                        },
                        {
                            // data: this.realfwqPower[this.FWQindex].slice(9,-1),
                            data: DATA['power'][1].slice(9,-1),
                            name:'真实值',
                            lineStyle: {
                                color:'#757575',
                            },
                            color:'#757575',
                            type: 'line'
                        },
                    ],
                    dataZoom: {
                        // type:'inside',
                        type: 'slider',
                        show: true,
                        start: 0,
                        height: 4,
                        bottom: '25%',
                        textStyle: {
                            fontSize: "0.6vw",
                        },
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
                        x: '10%',
                        y: '15%',
                        x2: '10%',
                        y2: '40%',
                        borderWidth: 1,
                    },
                });
            myChart1.setOption({
                title: {
                    text: '服务器' +String(this.FWQ)+' 冷通道最大温度',
                    textStyle: {
                        fontSize: '0.8rem',
                        color:'#888888'
                    },
                },
                legend: {
                    data: ['预测值', '真实值'],
                    right: '3%',//图例距离整个容器底部的距离
                },
                grid: {
                    x: '10%',
                    y: '20%',
                    x2: '10%',
                    y2: '40%',
                    borderWidth: 1,
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            textStyle: {
                                fontSize: "0.5rem",
                            },
                        },
                        data: TIME,
                    },
                ],
                yAxis: [
                    {
                        axisLabel: {
                            textStyle: {
                                color:'#567199',
                                fontSize: "0.4rem",
                                fontWeight:'bolder'
                            },
                            formatter:function(value){
                                return value.toFixed(2)
                            }
                        },
                        type: 'value',
                        // min:'dataMin', //最小值
                        min: function (value) {
                            return value.min - 2;
                        },

                        // max:'dataMax', //最大值
                        max: function (value) {
                            return value.max + 2;
                        },
                        minInterval: 1,
                    }
                ],
                series: [
                    {
                        // data: this.preltdTempMax[this.FWQindex],
                        data: DATA['ltdwdmax'][0],
                        name:'预测值',
                        lineStyle: {
                            color:'#7FA7E3',
                        },
                        color:'#7FA7E3',
                        type: 'line'
                    },
                    {
                        // data: this.realltdTempMax[this.FWQindex].slice(9,-1),
                        data: DATA['ltdwdmax'][1].slice(9,-1),
                        name:'真实值',
                        lineStyle: {
                            color:'#757575',
                        },
                        color:'#757575',
                        type: 'line'
                    },
                ],
                dataZoom: {
                        // type:'inside',
                        type: 'slider',
                        show: true,
                        start: 0,
                        height: 4,
                        bottom: '25%',
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
            });
            myChart3.setOption({
                title: {
                    text: '服务器' +String(this.FWQ)+' 热通道平均温度',
                    textStyle: {
                        fontSize: '0.8rem',
                        color:'#888888'
                    },
                },
                legend: {
                    data: ['预测值', '真实值'],
                    right: '3%',//图例距离整个容器底部的距离
                },
                grid: {
                    x: '10%',
                    y: '20%',
                    x2: '10%',
                    y2: '40%',
                    borderWidth: 1,
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            textStyle: {
                                fontSize: "0.5rem",
                            },
                        },
                        data: TIME,
                    },
                ],
                yAxis: [
                    {
                        axisLabel: {
                            textStyle: {
                                color:'#8C4E4E',
                                fontSize: "0.4rem",
                                fontWeight:'bolder'
                            },
                            formatter:function(value){
                                return value.toFixed(2)
                            }
                        },
                        type: 'value',
                        // min:'dataMin', //最小值
                        min: function (value) {
                            return value.min - 2;
                        },

                        // max:'dataMax', //最大值
                        max: function (value) {
                            return value.max + 2;
                        },
                        minInterval: 1,
                    }
                ],
                series: [
                    {
                        // data: this.prertdTempAvg[this.FWQindex],
                        data: DATA['rtdwd'][0],
                        name:'预测值',
                        lineStyle: {
                            color:'#E37F7F',
                        },
                        color:'#E37F7F',
                        type: 'line'
                    },
                    {
                        // data: this.realrtdTempAvg[this.FWQindex].slice(9,-1),
                        data: DATA['rtdwd'][1].slice(9,-1),
                        name:'真实值',
                        lineStyle: {
                            color:'#757575',
                        },
                        color:'#757575',
                        type: 'line'
                    },
                ],
                dataZoom: {
                        // type:'inside',
                        type: 'slider',
                        show: true,
                        start: 0,
                        height: 4,
                        bottom: '25%',
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
            });
            myChart5.setOption({
                title: {
                    text: '服务器' +String(this.FWQ)+' 冷通道平均温度',
                    textStyle: {
                        fontSize: '0.8rem',
                        color:'#888888'
                    },
                },
                legend: {
                    data: ['预测值', '真实值'],
                    right: '3%',//图例距离整个容器底部的距离
                },
                grid: {
                    x: '10%',
                    y: '20%',
                    x2: '10%',
                    y2: '40%',
                    borderWidth: 1,
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            textStyle: {
                                fontSize: "0.5rem",
                            },
                        },
                        data: TIME,
                    },
                ],
                yAxis: [
                    {
                        axisLabel: {
                            textStyle: {
                                color:'#567199',
                                fontSize: "0.4rem",
                                fontWeight:'bolder'
                            },
                            formatter:function(value){
                                return value.toFixed(2)
                            }
                        },
                        type: 'value',
                        // min:'dataMin', //最小值
                        min: function (value) {
                            return value.min - 2;
                        },

                        // max:'dataMax', //最大值
                        max: function (value) {
                            return value.max + 2;
                        },
                        minInterval: 1,
                    }
                ],
                series: [
                    {
                        // data: this.preltdTempAvg[this.FWQindex],
                        data: DATA['ltdwdavg'][0],
                        name:'预测值',
                        lineStyle: {
                            color:'#93ACBB',
                        },
                        color:'#93ACBB',
                        type: 'line'
                    },
                    {
                        // data: this.realltdTempAvg[this.FWQindex].slice(9,-1),
                        data: DATA['ltdwdavg'][1].slice(9,-1),
                        name:'真实值',
                        lineStyle: {
                            color:'#757575',
                        },
                        color:'#757575',
                        type: 'line'
                    },
                ],
                dataZoom: {
                        // type:'inside',
                        type: 'slider',
                        show: true,
                        start: 0,
                        height: 4,
                        bottom: '25%',
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
            });       
        },
        drawAIpreKTCharts(DATA,TIME){
            var myChart2 = this.$echarts.init(this.$refs.chart2); 
            var myChart4 = this.$echarts.init(this.$refs.chart4); 
            myChart4.setOption({
                    title: {
                        text: '空调' +String(this.KT)+' 回风温度',
                        textStyle: {
                            fontSize: '0.8rem',
                            color:'#888888'
                        },
                    },
                    legend: {
                        data: ['预测值', '真实值'],
                        right: '3%',//图例距离整个容器底部的距离
                    },
                    grid: {
                        x: '10%',
                        y: '20%',
                        x2: '10%',
                        y2: '40%',
                        borderWidth: 1,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                textStyle: {
                                    fontSize: "0.5rem",
                                },
                            },
                            data: TIME,
                        },
                    ],
                    yAxis: [
                        {
                            axisLabel: {
                                textStyle: {
                                    color:'#6D3F83',
                                    fontSize: "0.4rem",
                                    fontWeight:'bolder'
                                },
                                formatter:function(value){
                                    return value.toFixed(2)
                                }
                            },
                            type: 'value',
                            // min:'dataMin', //最小值
                            min: function (value) {
                                return value.min - 2;
                            },

                            // max:'dataMax', //最大值
                            max: function (value) {
                                return value.max + 2;
                            },
                            minInterval: 1,
                        }
                    ],
                    series: [
                        {
                            // data: this.prehfwd[this.FWQindex],
                            data: DATA['hfwd'][0],
                            name:'预测值',
                            lineStyle: {
                                color:'#C16FE8',
                            },
                            color:'#C16FE8',
                            type: 'line'
                        },
                        {
                            // data: this.realhfwd[this.FWQindex].slice(9,-1),
                            data: DATA['hfwd'][1].slice(9,-1),
                            name:'真实值',
                            lineStyle: {
                                color:'#757575',
                            },
                            color:'#757575',
                            type: 'line'
                        },
                    ],
                    dataZoom: {
                            // type:'inside',
                            type: 'slider',
                            show: true,
                            start: 0,
                            height: 4,
                            bottom: '25%',
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
                });
            myChart2.setOption({
                title: {
                    text: '空调' +String(this.KT)+' 送风温度',
                    textStyle: {
                        fontSize: '0.8rem',
                        color:'#888888'
                    },
                },
                legend: {
                    data: ['预测值', '真实值'],
                    right: '3%',//图例距离整个容器底部的距离
                },
                grid: {
                    x: '10%',
                    y: '20%',
                    x2: '10%',
                    y2: '40%',
                    borderWidth: 1,
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            textStyle: {
                                fontSize: "0.5rem",
                            },
                        },
                        data: TIME,
                    },
                ],
                yAxis: [
                    {
                        axisLabel: {
                            textStyle: {
                                color:'#3B6F3E',
                                fontSize: "0.4rem",
                                fontWeight:'bolder'
                            },
                            formatter:function(value){
                                return value.toFixed(2)
                            }
                        },
                        type: 'value',
                        // min:'dataMin', //最小值
                        min: function (value) {
                            return value.min - 2;
                        },

                        // max:'dataMax', //最大值
                        max: function (value) {
                            return value.max + 2;
                        },
                        minInterval: 1,
                    }
                ],
                series: [
                    {
                        data: DATA['sfwd'][0],
                        name:'预测值',
                        lineStyle: {
                            color:'#58A55C',
                        },
                        color:'#58A55C',
                        type: 'line'
                    },
                    {
                        // data: this.realsfwd[this.FWQindex].slice(9,-1),
                        data: DATA['sfwd'][0].slice(9,-1),
                        name:'真实值',
                        lineStyle: {
                            color:'#757575',
                        },
                        color:'#757575',
                        type: 'line'
                    },
                ],
                dataZoom: {
                        // type:'inside',
                        type: 'slider',
                        show: true,
                        start: 0,
                        height: 4,
                        bottom: '25%',
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
            });
        },
        changeTime(){
            var postAIpreParams=[[['server','power',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','ltdwdmax',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','ltdwdavg',this.FWQ],this.chosenTime.slice(0,2)],
                                [['server','rtdwd',this.FWQ],this.chosenTime.slice(0,2)],
                                [['kt','sfwd',this.KT],this.chosenTime.slice(0,2)],
                                [['kt','hfwd',this.KT],this.chosenTime.slice(0,2)]]
            for(var i=0;i<postAIpreParams.length;i++){
                this.postData(postAIpreParams[i],2,i)
            }
        },
    },
}
</script>

<style>
#aipre-big-chart{
    height:92vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
.JFname{
    font-size: 1.2rem;
    font-weight: 800;
}
.choice-data{
    width:92%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bigaipre-choose-fwq{
    margin:2vh 0 0 0;
    display: flex;
    justify-content: center;
}
.date-choose{
    margin-left:3rem;
}
.chart1{
    padding: 0.8vh;
    height:10vh;
    justify-content: center;
    align-items: center;
}
</style>