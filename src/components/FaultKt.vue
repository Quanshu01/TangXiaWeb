<template>
    <div id="fault-fwq-kt" :style="styleVar">
        <div class="fault-kt-name">
            空调{{ ktId }} 
            <span v-if=changedValue class="fault-changed-value">
                {{changedValue}}
            </span>
        </div>
        <div v-if="values" class="fault-kt-params">
            <div v-for="(value,key) in values" :key='key'>
                <kt-param :KEY="key" :VALUE="value"></kt-param>
            </div>
        </div>
    </div>
</template>

<script>
import { number } from 'echarts/core'
import ChangeColor from './ChangeColor.vue'

export default {
    props:{
        ktId:number,
        values:{},
        color:number,
        changedValue:number,
        //unstbKT:[],
        unstbKT:Array
    },
    components:{
        'kt-param':ChangeColor
    },
    data() {
        return {
            selectPath: "/",
            kt_num:1,
            ktcolorList: ['#E7E6E6','#F3CA4F'],
            keysList:[],

        }
    },
    mounted(){
        // console.log('fault detection unstbKT',this.unstbKT)
        this.checkData()
        setTimeout(()=>{
            this.checkData()
        },100000)
    },
    methods:{
        checkData(){
            // console.log('fault detection values',this.values)
            this.keysList = Object.keys(this.values)
            // console.log('fault detection keysList',this.keysList)
        },
    },
    computed:{
        styleVar(){
            return{
                '--kt-Color':this.unstbKT.includes(this.ktId) ? this.ktcolorList[1] : this.ktcolorList[0]
            }
        }
    },
}
</script>

<style>
#fault-fwq-kt{
    margin:0 1% 0 1%;
    display: flex;
    background-color: var(--kt-Color);
    width:50%;
    height:90%;
    border-style: solid;
    border-width: 1px;
    border-color: #d6d6d6;
    border-radius: 0.3rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.fault-kt-name{
    width:13%;
    text-align: center;
    font-size: 0.4rem;
    font-weight: 600;
    display: grid;
    justify-content: center;
    align-items: center;
}
.fault-changed-value{
    padding:0.2rem;
    color:blue;
    font-size:0.8rem;
    margin-left: 0.6rem;
}
.fault-kt-params{
    margin:1% 0;
    height:98%;
    text-align: center;
    font-size: 0.8rem;
    zoom:0.8;
    font-weight: 300;
    scrollbar-width: none;
    overflow-y: scroll;
}
.if-abnormal{
    font-size: 0.5rem;
    color:var(--params-Color);
}
</style>