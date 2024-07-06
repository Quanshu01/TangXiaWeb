<template>
    <div class="power-Data">
        <img class="pow-tem-pic" :style="styleVar" src="@/assets/icons/power.svg" />
        <div class="power-num" :style="styleVar">{{powerData}}kW</div>
    </div>
</template>

<script>
export default {
    props: {
        'powerData':{
            type:Number,
            default: 88,
        },
        'fontSize':{
            type:Number,
            default: 0.8,
        },
        'hover':{
            type:String,
            default:"服务器功率",
        },
        'pic':{
            type:Number,
            default:0.8,
        },
        // ifsmall:{
        //     type:Boolean,
        //     default:true
        // }
    },
    computed:{
        styleVar(){
            return{
                '--pwr-fontSize':this.fontSize+'vw',
                '--pwr-picSize':this.pic+'vw',
            }
        }
    },
}
</script>

<style>
.power-Data{
    height:2rem;
}
.pow-tem-pic{
    width:var(--pwr-picSize);
    height:var(--pwr-picSize)
}
.power-num{
    font-size: var(--pwr-fontSize);
    color:#FFC335;
    zoom: 0.8;
    font-weight: 600;
}
</style>