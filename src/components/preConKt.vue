<template>
    <div id="precon-fwq-kt" :style="styleVar">
        <div class="precon-kt-name">
            <span v-if="changedSFValue" class="precon-changed-value">
                {{changedSFValue}}
            </span>
            空调{{ ktId }}
        </div>
        <div v-if="values" class="precon-kt-params">
            <div v-for="(value,key) in values" :key='key'>
                {{ key }} : {{ value }}
            </div>
        </div>
    </div>
</template>

<script>
import { number } from 'echarts/core'
export default {
    props:{
        ktId:number,
        values:{},
        color:number,
        // changedValue:number,
        // changedSFValue:number,
    },
    data() {
        return {
            selectPath: "/",
            kt_num:1,
            ktcolorList: ['#E7E6E6','#9FCEFF','#53A8FF'],
        }
    },
    computed:{
        styleVar(){
            return{
                '--kt-Color':this.changedValue==-1 ? this.ktcolorList[1] : (this.changedValue==-2 ? this.ktcolorList[2] : this.ktcolorList[0]),
            }
        }
    },
}
</script>

<style>
#precon-fwq-kt{
    margin:0 1% 0 1%;
    background-color: var(--kt-Color);
    width:50%;
    height:90%;
    border-radius: 0.2rem;
    border-style: solid;
    border-width: 1px;
    border-color: #d6d6d6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.precon-kt-name{
    height:25%;
    text-align: center;
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
}
.precon-changed-value{
    padding:0.2rem;
    color:rgb(255, 179, 0);
    font-size:0.6rem;
    margin-left: 0.6rem;
}
.precon-kt-params{
    margin:1% 0;
    height:68%;
    text-align: center;
    font-size: 0.8rem;
    zoom:0.8;
    font-weight: 200;
    scrollbar-width: none;
    overflow-y: scroll;
}
</style>