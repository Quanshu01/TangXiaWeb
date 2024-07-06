<template>
    <div id="fault-block" :style="styleVar">
        <span v-if=iftext class="faultdata"></span>
    </div>
</template>

<script>
export default {
    props: {
        faultData:{
            type:Number,
            default: 0,
        },
        color:{
            type:Number,
            default:0,
        },
        faultDataHeight:{
            type:Number,
            default: 0.5,
        },
        faultDataWidth:{
            type:Number,
            default: 0.5,
        },
        iftext:{
            type:Boolean,
            default:true,
        }
    },
    data() {
        return {
            colorList: ['#B7B7B7','#F56C6C','','#67C23A'],
        }
    },
    computed:{
        styleVar(){
            return{
                '--flt-faultData':this.faultData,
                '--flt-faultDataHeight':this.faultDataHeight+'vh',
                '--flt-faultDataWidth':this.faultDataWidth+'vw',
                '--flt-faultColor':this.faultData=='0' ? this.colorList[0] : (this.faultData=='-1' ? this.colorList[2] : this.colorList[1])
            }
        },
        
    },
}
</script>

<style>
#fault-block{
    background-color: var(--flt-faultColor);
    height:var(--flt-faultDataHeight);
    width: var(--flt-faultDataWidth);
    margin: 0.08rem;
    border-radius: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.faultdata{
    font-size: 0.6rem;
    font-weight: 600;
    color:#4d4d4d,
}
</style>