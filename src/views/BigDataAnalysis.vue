<template>
    <div id="big-data-analysis">
        <div class="bigscreen-top">
            <div></div>
            <div class="bigscreen-title-info">
                <div class="bigscreen-title-name">
                    数据分析
                </div>
                <div class="bigscreen-title-text">
                    {{JFname}}机房 历史机组服务器空调状态
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
        <div class="choose-data-dy">
            <el-date-picker
                v-model="value1"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="changeDate()">
            </el-date-picker>
        </div>
        <div class="choose-kt">
            <div>
                <el-button-group  v-for="n in JFktNum" :key="n.index">
                    <el-button class="click2KT" size="mini" @click="chooseKT($event)">空调 {{n}}</el-button>
                </el-button-group>
            </div>
            <div>
                <el-button-group v-for="n in fwqdoublelist" :key="n.index">
                    <el-button class="click2KT" size="mini" @click="chooseFWQ($event)">{{n}}列</el-button>
                </el-button-group>
            </div>
        </div>
        <div class="kt-chart">
            <div ref="chart" id="main" style="width: 88vw; height: 68vh; background-color: aliceblue;"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    components:{
    },
    data(){
        return{
            fwqdoublelist:[],
            KT:0,
            FWQ:'A',
            JFktNum:0,
            value1: '',
            chosenTime:['-1','-1'],
            ktdata:[],
            datatime:[],
            pickerOptions: {
                onPick: ({ maxDate, minDate }) => {
                    this.curDate = minDate.getTime()
                    if (maxDate) {
                        this.curDate = ''
                    }
                },
                disabledDate: (time) => {
                    if (this.curDate) {
                        const one = 30 * 24 * 3600 * 1000
                        const minTime = this.curDate - one
                        const maxTime = this.curDate + one
                        return time.getTime() < minTime || time.getTime() > maxTime
                    }
                }
            }
        }
    },
    created(){
        this.getData()
    },
    mounted(){
        this.timer=setInterval(()=>{
        },76182)
    },
    methods:{
        closeModal: function () {
            this.$FModal.hide();
        },
        getData(){
            var postDAdata=[[['server',this.FWQ],this.chosenTime.slice(0,2)],
                                [['kt',this.KT+1],this.chosenTime.slice(0,2)]]
            for(var i=0;i<postDAdata.length;i++){
                this.postData(postDAdata[i],i)
            }
        },
        postData(postDAdata,i){
            // console.log('postData postDAdata',postDAdata)
            axios.post(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/dataanalysisnew0311",postDAdata,            
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(res=>{
                    console.log('axios dataanalysisnew0311 post',i,res);
                    this.alltime = res.data[0]['TimeLine']
                    if(postDAdata[0][0]=="kt"){
                        this.ktData=res.data[0]['KT'][0]
                    }
                    else{
                        this.fwqData=res.data[0]['Server']
                    }
                    // console.log('this.ktData this.fwqData',this.ktData,this.fwqData)
                    this.drawChart(this.ktData,this.fwqData,this.alltime)
                })
                .catch(function (error) {
                    console.log('axios dataanalysisnew0311 post error',error);
                });
        },

        drawChart(ktdata,fwqdata,datatime){
            var myChart = this.$echarts.init(this.$refs.chart); 
            myChart.setOption({
                title: {
                    text: '空调' +String(this.KT+1)+' 参数信息图',
                    textStyle: {
                        fontSize: '1rem',
                        color:'#888888'
                    },
                    x:'center',
                },
                legend: {
                    top: '4%',//图例距离整个容器底部的距离
                },
                grid: {
                    left: '7%',
                    right: '8%',
                    bottom: '6%',
                    top: '8%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: datatime
                },
                yAxis: {
                    type: 'value'
                },
                dataZoom: {
                    type: 'slider',
                    show: true,
                    start: 0,
                    end:100,
                    height: 12,
                    bottom: '2%',
                },
                series: [
                    {
                        name: '服务器'+String(this.FWQ)+'功率',
                        type: 'line',
                        data: fwqdata['server_power']
                    },
                    {
                        name: '空调功率',
                        type: 'line',
                        data: ktdata['power']
                    },
                    {
                        name: '风机1转速',
                        type: 'line',
                        data: ktdata['fj1']
                    },
                    {
                        name: '风机2转速',
                        type: 'line',
                        data: ktdata['fj2']
                    },
                    {
                        name: '压缩机1容量',
                        type: 'line',
                        data: ktdata['ysj1']
                    },
                    {
                        name: '压缩机2容量',
                        type: 'line',
                        data: ktdata['ysj2']
                    },
                    {
                        name: '送风温度1',
                        type: 'line',
                        data: ktdata['sf1']
                    },
                    {
                        name: '送风温度4',
                        type: 'line',
                        data: ktdata['sf4']
                    },
                    {
                        name: '送风温度设定',
                        type: 'line',
                        data: ktdata['sfd']
                    },
                    {
                        name: '回风温度1',
                        type: 'line',
                        data: ktdata['hf1']
                    },
                    {
                        name: '回风温度2',
                        type: 'line',
                        data: ktdata['hf2']
                    },
                    {
                        name: '回风温度3',
                        type: 'line',
                        data: ktdata['hf3']
                    },
                    {
                        name: '回风温度4',
                        type: 'line',
                        data: ktdata['hf4']
                    },
                    {
                        name: '回风温度设定',
                        type: 'line',
                        data: ktdata['hfd']
                    },
                ]
            })
        },
        chooseKT: function(e) {
            this.KT=Number.parseInt(e.target.innerText.slice(2,5))-1;
            this.getData()
        },
        chooseFWQ: function(e) {
            this.FWQ=e.target.innerText.slice(0,1);
            this.getData()
        },
        changeDate(){
            this.chosenTime = this.value1.slice(0,2) //['2023-03-06', '2023-03-09']
            this.getData()
        },
    },

}
</script>

<style>
#big-data-analysis{
    padding:1rem 2rem 1rem 0;
    height: 93vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    justify-content: center;
    text-align: center;
    align-items: center;
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
.close {
    padding:1rem 1rem 0 1rem;
    width:100%;
    height:10%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.choose-data-dy{
    height:5vh;
    width:90vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.choose-kt{
    display:grid;
    place-items: center;
    height:4vh;
    width:96vw;
}
.ana-click2kt{
    font-size:0.6vw;
    padding:0.5vh 0.5vw;
}
.kt-chart{
    display: flex;
    align-items: center;
    justify-content: center;
    height:72vh;
    width:100%;
    padding:0 1rem;
}
</style>