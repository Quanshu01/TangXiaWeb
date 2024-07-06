<template>
        <div class="rtd-temperature" :style="styleVar">
            <img v-if="ifsmall==true" class="rtd-tem-pic" :style="styleVar" src="@/assets/icons/hot_thermometer.svg" />
            <div class="rtd-tem-num" :style="styleVar" v-if="rtdData!=0 && rtdData!=-1">{{ rtdData }}<span v-if="ifsmall">°C</span></div>
            <div class="rtd-tem-num" :style="styleVar" v-if="rtdData==-1"><span v-if="ifsmall">°C</span></div>
            <div class="rtd-tem-num" :style="styleVar" v-if="rtdData==0"><span v-if="ifsmall">°C</span></div>
        </div>
    </template>
<script>
export default {
    data() {
        return {
            rtdbackColor:['','#F3F3F3',''],
            rtdcolorList: ['#FF777C','#FF0000','#687985'],
        }
    },
    props: {
        'rtdData':{
        },
        'fontSize':{
            type:Number,
            default: 1,
        },
        'hover':{
            type:String,
            default:"热通道温度",
        },
        'pic':{
            type:Number,
            default:0.8,
        },   
        ifsmall:{
            type:Boolean,
            default:true,
        },
        realtime:{
            type:Number,
            default:1,
        }
    },
    computed:{
        styleVar(){
            return{
                '--rtd-fontSize':this.fontSize+'vw',
                '--rtd-picSize':this.pic+'vw',
                '--rtd-height':this.ifsmall ? '2.2rem' : '0.6rem',
                '--rtd-layout':this.ifsmall ? '' : 'flex',
                '--rtd-fontColor':this.rtdData==0 ? this.rtdcolorList[2] : this.rtdcolorList[0],
                '--rtd-backColor':this.ifsmall ? this.rtdbackColor[0] : (this.rtdData==-1 ? this.rtdbackColor[2] : this.rtdbackColor[1])
            }
        }
    },
}
</script>

<style>
.rtd-temperature{
    padding:0.05rem;
    height:var(--rtd-height);
    display: var(--rtd-layout);
    align-items: center;
    justify-content: center;
    background-color: var(--rtd-backColor);
    margin:0.05rem;
}
.rtd-tem-pic{
    height:var(--rtd-picSize);
    width:var(--rtd-picSize);
}
.rtd-tem-num{
    font-size: var(--rtd-fontSize);
    color:var(--rtd-fontColor);
    zoom: 0.8;
    font-weight: 600;
}
.el-icon-caret-left{
    color:var(--rtd-fontColor);
    height:var(--rtd-picSize);
    width:var(--rtd-picSize);
}
.rtdcite{
    color:var(--rtd-fontColor);
    line-height:var(--rtd-picSize);
    height:var(--rtd-picSize);
    width:var(--rtd-picSize);
    text-align: center;
    align-items: center;
    justify-content: center;
}
</style>