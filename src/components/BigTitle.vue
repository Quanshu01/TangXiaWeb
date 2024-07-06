<template>
    <el-card id="big-title" shadow="hover">
        <div class="big-title-name" v-if="bigname">{{ bigname }}</div>
        <div class="big-title-note" v-if="bigcontent">{{ bigcontent }}</div>
    </el-card>
</template>

<script>
export default {
    props:[
        'bigname',
        'bigcontent'
    ],
}
</script>

<style>
#big-title{
    width:20vw;
    height:5vh;
    padding: 1vh 0;
    margin-left: 1vw;
    background-color: #d9d9d9;
    border-radius: 1rem;
    text-align: center;
    align-items: center;
}
.big-title-name{
    font-size: 1.2rem;
    font-weight: 800;
}
.big-title-note{
    font-size: 0.75rem;
    font-weight:300;
    color:#757575;
}
</style>