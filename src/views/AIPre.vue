<template>
  <div class="ai-pre">
    <title-top name="AI 预测"
      content="机房服务器空调各项参数 真实值与 AI预测10时刻后 的对比曲线">
    </title-top>
    <div class="ai-pre-detail">
      <div class="choise-area">
        <el-tabs tabPosition='left' style="height: 100%;width:100%" 
          v-model="type" @tab-click="handleClick">
          <el-tab-pane label="机房功率" name="powerJF">
            <aiprechart :content="type" v-if='type=="powerJF"'/>
          </el-tab-pane>
          <el-tab-pane label="室外温度" name="tempOUT" type="tempOUT">
            <aiprechart :content="type" v-if='type=="tempOUT"'/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { THEME_KEY } from "vue-echarts";
import TitleTop from '@/components/TitleTop.vue';
import BigAIPre from './BigAIPre.vue'
import AIPreCharts from '../components/AIPreCharts.vue'

export default { 
  components: {
    'title-top':TitleTop,
    'aiprechart':AIPreCharts,
  },
  provide: {
    [THEME_KEY]: "light"
  },
  data() {
    return {
      type:'powerJF',
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
    };
  },
  methods:{
    goBigAIPre(){
      this.$FModal.show(
        { 
            component: BigAIPre,
            maxHeight: '100%',
            width: '96%', 
            height:'100%',
            placement: 'center center'  
        },
      )
    },
    handleClick: function(event) {
      // console.log('aipre click',event);
      this.type=event.target.id.split('-')[1]
      // console.log('this.content aipre click',this.type);

    }
  },
}

</script>

<style>
.ai-pre{
  margin:1.6vh 0;
  width: 100%;
  height: 98%;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 1rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.ai-pre-detail{
  display:flex;
  width:100%;
  align-items: center;
  justify-content: center;
}
.choise-area{
  padding:0 0.5rem;
  height: 100%;
  width:100%;
  display: flex;
  justify-content: center;
}
.el-tab-pane{
  height:100%;
  width:100%;
}
.el-tabs{
  width:98%;
}
.pre-chart{
  background-color: aqua;
  height:100%;
  width:100%;
}
.choose-data{
  margin:1rem;
}
.el-tabs__item{
  font-size:0.8rem;
  height:2.1rem;
}
.el-select{
  margin:0 2rem;
}
.ai-pre-extend-fwqNkt{
  text-align:right;
  width:2%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>