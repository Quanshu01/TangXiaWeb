<template>
    <div id="risk-block" :style="styleVar">
        <span v-if=iftext class="riskdata">{{ riskData }}</span>
    </div>
</template>

<script>
export default {
    props: {
        riskData:{
            type:Number,
            default: 0,
        },
        color:{
            type:Number,
            default:0,
        },
        riskDataHeight:{
            type:Number,
            default: 0.8,
        },
        riskDataWidth:{
            type:Number,
            default: 0.8,
        },
        iftext:{
            type:Boolean,
            default:true,
        }
    },
    data() {
        return {
            colorList: ['#67C23A','#E6A23C','#F56C6C','#0F1114'],
        }
    },
    computed:{
        styleVar(){
            return{
                '--rsk-riskData':this.riskData,
                '--rsk-riskDataHeight':this.riskDataHeight+'vh',
                '--rsk-riskDataWidth':this.riskDataWidth+'vw',
                '--rsk-riskColor':this.riskData==-1 ? this.colorList[3] : 
                    (this.riskData<=30 ? this.colorList[0] : 
                    (this.riskData<=60 ? this.colorList[1] : this.colorList[2])),
            }
        },
        
    },
}

</script>

<style>
#risk-block{
    background-color: var(--rsk-riskColor);
    height:var(--rsk-riskDataHeight);
    width: var(--rsk-riskDataWidth);
    margin: 0.1rem;
    border-radius: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.riskdata{
    font-size: 0.6rem;
    font-weight: 600;
    color:#4d4d4d,
}
</style>