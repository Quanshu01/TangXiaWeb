<template>
    <div class="ltd-temperature" :style="styleVar">
        <div v-if="ifpre">
            <img v-if="ifsmall==true" class="ltd-tem-pic" :style="styleVar" src="@/assets/icons/cold_thermometer.svg" />
        </div>
        <div v-else>
            <img v-if="ifsmall==true" class="ltd-tem-pic" :style="styleVar" src="@/assets/icons/cold_thermometer.svg" />
            <div class="ltd-tem-num" :style="styleVar" v-if="ltdData!=0 && ltdData!=-1">{{ ltdData }}<span v-if="ifsmall">°C </span></div>
            <div class="ltd-tem-num" :style="styleVar" v-if="ltdData==-1"><span v-if="ifsmall">°C</span></div>
            <div class="ltd-tem-num" :style="styleVar" v-if="ltdData==0"><span v-if="ifsmall">°C</span></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ltdbackColor:['','#23282E','','#000000','#94290D','#A3700F'],
            ltdcolorList: ['#B4D8FF','#FF0000','#040505','#4A4A4A','#60CFFF'],
        }
    },
    props: {
        'ltdData':{},
        'fontSize':{
            type:Number,
            default: 1,
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
        },
        maxNsub:{
            default(){
                return [0,[[1],[1]]]
            }
        },
        index:{
            type:Boolean,
            default:false,
        },
        ifAvg:{
            type:Boolean,
            default:false,
        },
        ifpre:{
            type:Boolean,
            default:false,
        }
    },
    computed:{
        styleVar(){
            return{
                '--ltd-fontSize':this.fontSize+'vw',
                '--ltd-picSize':this.pic+'vw',
                '--ltd-layout':this.ifsmall ? '' : 'flex',
                '--ltd-height':this.ifsmall ? '2.2rem' : '0.58rem',
                '--ltd-fontColor':this.ifAvg ? this.ltdcolorList[4] : this.index ? this.ltdcolorList[3] :(this.ltdData==0 ? this.ltdcolorList[2] : (this.ltdData<27 ? this.ltdcolorList[0] : this.ltdcolorList[1])),
                '--ltd-backColor':this.maxNsub[1][0].includes(this.maxNsub[0]) ? this.ltdbackColor[4] 
                                    : this.maxNsub[1][1].includes(this.maxNsub[0]) ? this.ltdbackColor[5] 
                                        : (this.ifsmall&&this.realtime) ? this.ltdbackColor[0] 
                                            : (this.realtime==0 ? this.ltdbackColor[2] 
                                                : (this.ltdData==-1 ? this.ltdbackColor[3] : this.ltdbackColor[1]))
            }
        }
    },
}
</script>

<style>
.ltd-temperature{
    padding:0.05rem;
    height: var(--ltd-height);
    display: var(--ltd-layout);
    align-items: center;
    justify-content: center;
    background-color: var(--ltd-backColor);
    margin:0.05rem;
}
.ltd-tem-pic{
    height:var(--ltd-picSize);
    width:var(--ltd-picSize);
}
.ltd-tem-num{
    font-size: var(--ltd-fontSize);
    color:var(--ltd-fontColor);
    font-weight: 600;
    zoom: 0.8;
}
.ltdcite{
    color:var(--ltd-fontColor);
    line-height:var(--ltd-picSize);
    height:0.1rem;
    width:0.1rem;
    text-align: center;
    align-items: center;
    justify-content: center;
}
</style>