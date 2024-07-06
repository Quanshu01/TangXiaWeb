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
        this.drawChartInit(analysisData);
    },
    data() {
        return {
            dataAnalysis: [
                { recordTime: '1月', ktPower: 310, ITPower: 280, PUE: 1 },
                { recordTime: '2月', ktPower: 300, ITPower: 270, PUE: 1.2 },
                { recordTime: '3月', ktPower: 290, ITPower: 260, PUE: 2 },
                { recordTime: '4月', ktPower: 280, ITPower: 250, PUE: 2.5 },
                { recordTime: '5月', ktPower: 250, ITPower: 220, PUE: 1.5 },
                { recordTime: '6月', ktPower: 260, ITPower: 210, PUE: 2 },
                { recordTime: '7月', ktPower: 270, ITPower: 200, PUE: 1 },
                { recordTime: '8月', ktPower: 280, ITPower: 180, PUE: 1.8 },
                { recordTime: '9月', ktPower: 290, ITPower: 150, PUE: 2.7 },
                { recordTime: '10月', ktPower: 270, ITPower: 160, PUE: 2.4 },
                { recordTime: '11月', ktPower: 260, ITPower: 110, PUE: 1.9 },
                { recordTime: '12月', ktPower: 220, ITPower: 120, PUE: 2 }
            ]
        };
    },
    mounted() {
        this.drawChartInit();
    },
    methods: {
        drawChartInit() {
            this.drawChart(this.dataAnalysis);
        },
        drawChart(analysisData) {
            var myChart = this.$echarts.init(this.$refs.chart);

            const xDataArr = analysisData.map(item => item.recordTime);
            const ktPowerArr = analysisData.map(item => item.ktPower);
            const itPowerArr = analysisData.map(item => item.ITPower);
            const pueArr = analysisData.map(item => item.PUE);

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
