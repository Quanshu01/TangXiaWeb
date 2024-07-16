<template>
    <div class="data-analysis">
        <title-top name="功率分析"
            content="功率历史波动曲线">
        </title-top>
        <div class="datapicNbig">
            <div ref="chart" class="data-pic"></div>
        </div>
    </div>
</template>

<script>
import TitleTop from '@/components/TitleTop.vue';
import axios from 'axios'
export default {
    name: "DataAnalysis",
    components: {
        'title-top': TitleTop,
    },
    mounted() {
        this.drawChartInit();
    },
    data() {
        return {
            dataAnalysis:{}
        };
    },
    methods: {
        drawChartInit() {
            axios.get(this.global.apiURL+"/703display/realdata").then(
                Response=>{
                    this.dataAnalysis={}
                    this.dataAnalysis=Response.data
                    this.drawChart(this.dataAnalysis);
                },
                Error=>{
                    console.log('axios realdata error',Error.message)
                });
        },
        drawChart(analysisData) {
            var myChart = this.$echarts.init(this.$refs.chart);

            const xDataArr = analysisData["时间"];
            const ktPowerArr = analysisData["制冷功率"];
            const itPowerArr = analysisData["it功率"];
            const pueArr = analysisData["PUE"];


            myChart.setOption({
                legend: {
                    top: '4%',
                },
                grid: {
                    left: '7%',
                    right: '8%',
                    bottom: '6%',
                    top: '18%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'cross' }
                },
                xAxis: {
                    type: 'category',
                    data: xDataArr,
                    boundaryGap: false,
                    axisTick: {
                        alignWithLabel: true
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        position: 'left',
                        axisLabel: {
                            formatter: '{value} kWh'
                        }
                    },
                    {
                        type: 'value',
                        position: 'right',
                        min: 0,
                        max: 5,
                        axisLabel: {
                            formatter: '{value} '
                        }
                    }
                ],
                dataZoom: {
                    type: 'slider',
                    show: true,
                    start: 0,
                    end: 100,
                    height: 12,
                    bottom: '2%',
                },
                series: [
                    {
                        name: '空调功率',
                        data: ktPowerArr,
                        type: 'line',
                        symbol: 'circle',
                        yAxisIndex: 0,
                        smooth: true,
                    },
                    {
                        name: 'IT功率',
                        data: itPowerArr,
                        type: 'line',
                        symbol: 'circle',
                        yAxisIndex: 0,
                        smooth: true
                    },
                    {
                        name: 'PUE变化',
                        data: pueArr,
                        type: 'line',
                        symbol: 'circle',
                        yAxisIndex: 1,
                        smooth: true
                    },
                ]
            });
        }
    }
}
</script>

<style>
.data-analysis {
    margin: 1vh 0 0 0;
    width: 100%;
    height: 38vh;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.85);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.datapicNbig {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.data-pic {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.pic-data {
    width: 100%;
    height: 80%;
}
.data-big {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
