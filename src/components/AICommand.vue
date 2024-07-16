<template>
  <div class="ai-command">
    <div class="ai-command-top">
        <title-top name="AI 指令"
          content="AI指令详细信息表格">
        </title-top>
    </div>
    <div class="ai-command-detail">
      <aicommand-detail></aicommand-detail>
    </div>

  </div>
</template>

<script>
import TitleTop from '@/components/TitleTop.vue';
import AICommandDetail from './AICommandDetail.vue';

export default {
  name: "AICommand",
    components: {
      'title-top':TitleTop,
      'aicommand-detail':AICommandDetail,
    },
    data(){
      return{
        moreAIcmd:false,
      }
    }
}
</script>

<style>
.ai-command {
  width: 100%;
  height: 62vh;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 1rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.ai-command-top{
  width: 65vw;
  display: flex;
  justify-content: space-between;
}
.ai-command-detail{
  padding: 0.3vh 0.5vw;
  height: 83%;
}
.big-ai-command-detail{
  width:96%;
  display: flex;
  justify-content: flex-end;
}
.el-dialog-div{
  height:50vh;
}
</style>