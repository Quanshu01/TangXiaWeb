<template>
    <div id="big-ai-pre">
        <div class="close">
            <big-title bigname="AI 预测" bigcontent="服务器空调各参数真实值与AI预测值对比曲线"></big-title>
            <el-tooltip class="close-button" effect="light" content="关闭大图" placement="top">
                <i @click="closeModal" class="el-icon-circle-close"></i>
            </el-tooltip>
        </div>
        <!-- <div class="big-aipre-choice-data">
            <el-date-picker
            v-model="value2"
            size="mini"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
            </el-date-picker>
        </div> -->
        <div class="big-aipre">
            <aiprechart />
        </div>

    </div>
</template>

<script>
import BigTitle from '@/components/BigTitle.vue';
import AIPreBigChart from '../components/AIPreBigChart.vue'
export default {
    data() {
        return {
            activeName: 'first',

            pickerOptions: {
                shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
                }, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
                }, {
                text: '最近三个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
                }]
            },
            value2: '',
        }
    },
    components:{
        'aiprechart':AIPreBigChart,
        'big-title':BigTitle
    },
    methods: {
        closeModal: function () {
            this.$FModal.hide();
        },
    }
}
</script>

<style>
#big-ai-pre{
    min-width:90vw;
    padding:1rem 2rem 1rem 0;
    height: 94vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    justify-content: center;
    align-items: center;
}
.big-aipre{
    width:100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
.big-aipre-close-title{
    background-color: #d9d9d9;
    border-radius: 1.2rem;
    padding: 0.8vh 0.4vw;
    text-align: center;
    align-items: center;
}
.big-aipre-choice-data{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>