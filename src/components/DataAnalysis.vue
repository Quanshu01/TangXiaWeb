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
            dataAnalysis : {
                "时间": [
                    "2024-05-01 12:00:00", "2024-05-01 12:05:00", "2024-05-01 12:10:00", "2024-05-01 12:15:00", "2024-05-01 12:20:00",
                    "2024-05-01 12:25:00", "2024-05-01 12:30:00", "2024-05-01 12:35:00", "2024-05-01 12:40:00", "2024-05-01 12:45:00"
                ],
                "制冷能耗": [
                    300.0, 310.0, 305.0, 320.0, 315.0, 330.0, 325.0, 340.0, 335.0, 350.0
                ],
                "it能耗": [
                    200.0, 210.0, 205.0, 220.0, 215.0, 230.0, 225.0, 240.0, 235.0, 250.0
                ],
                "PUE": [
                    1.5, 1.6, 1.55, 1.7, 1.65, 1.8, 1.75, 1.9, 1.85, 2.0
                ]
            }
        };
    },
    methods: {
        drawChartInit() {
            this.drawChart(this.dataAnalysis);
        },
        drawChart(analysisData) {
            var myChart = this.$echarts.init(this.$refs.chart);

            const xDataArr = analysisData["时间"];
            const ktPowerArr = analysisData["制冷能耗"];
            const itPowerArr = analysisData["it能耗"];
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
