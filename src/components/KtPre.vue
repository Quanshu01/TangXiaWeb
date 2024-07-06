<template>
    <div id="kt-pre">
        <div class="kt-pre-name">
            空调{{ ktId }}
        </div>
        <div class="kt-pre-params">
            <sf-temp :sfData=values[0]></sf-temp>
            <hf-temp :hfData=values[1]></hf-temp>
        </div>
    </div>
</template>

<script>
import { number } from 'echarts/core'
import SongFengTemp from './SongFengTemp.vue';
import HuiFengTemp from './HuiFengTemp.vue';

export default {
    props:{
        ktId:number,
        values:[],
    },
    components:{
        'sf-temp':SongFengTemp,
        'hf-temp':HuiFengTemp,
    },
    data() {
        return {
        selectPath: "/",
        kt_num:1,
        }
    },
}
</script>

<style>
#kt-pre{
    margin:0 2% 0 2%;
    background-color: #ecebeb;
    width:52%;
    height:88%;
}
.kt-pre-name{
    height:30%;
    text-align: center;
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
}
.kt-pre-params{
    margin:0% 0;
    height:70%;
    text-align: center;
    font-size: 0.6rem;
    font-weight: 200;
}
</style>