<template>
    <div id="changeColor" v-if="!KEY.includes('开关') && !KEY.includes('设定')" :style="styleVar">
        {{ KEY }} : {{ VALUE }}
    </div>
</template>

<script>
export default {
    data(){
        return{
            ktcolorList: ['#FF0000','#4382E0','#000000'],
        }
    },
    props:{
        'index':{
            type:Number
        },
        'KEY':{
            type:String,
        },
        'VALUE':{
            //type:String,
            type: Number, // 将类型设置为数字
        }
    },
    computed:{
        styleVar(){
            return{
                '--kt-params-color':
                    this.KEY.includes('送风温度') ? 
                        (this.VALUE>26 ? this.ktcolorList[0] : this.VALUE<22 ? this.ktcolorList[1] : this.ktcolorList[2])
                    : (this.KEY.includes('回风温度') ?
                            (this.VALUE>38 ? this.ktcolorList[0] : this.VALUE<33 ?this.ktcolorList[1] : this.ktcolorList[2])
                        :  (this.KEY.includes('机') ?
                            (this.VALUE>100 ? this.ktcolorList[0] : this.VALUE<33 ? this.ktcolorList[1] : this.ktcolorList[2])
                            : this.ktcolorList[2]))
            }
        }
    },
}
</script>

<style>
#changeColor{
    font-size:0.8rem;
    font-weight:100;
    color:var(--kt-params-color);
    zoom:0.84;
}
</style>