<template>
    <div id="fault-temp" :style="styleVar">
        <i class="el-icon-warning"> 
            <span class="textSize" :style="styleVar"> {{ tempCnt }}</span>
        </i> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            ktcolorList: ['#4382E0','#FF0000','#000000'],
        }
    },
    props:{
        'colorIndex':{
            type:Number,
            default:0
        },
        'tempSize':{
            type:Number,
            default:2
        },
        'tempCnt':{
            type:Number,
            default:1
        },
        'tempNum':{
            type:Number,
            default:25
        },
        'ifBig':{
            type:Number,
            default:0
        }
    },
    computed:{
        styleVar(){
            return{
                '--temp-color':this.ktcolorList[this.colorIndex],
                '--temp-size':this.tempSize+'rem',
            }
        }
    },
}
</script>

<style>

.el-icon-warning{
    font-size: 1rem;
    font-weight: 400;
    color:var(--temp-color);
    width:var(--temp-size)
}
.el-icon-info{
    font-size: 1rem;
    font-weight: 400;
    color:var(--temp-color);
    width:var(--temp-size)
}
.textSize{
    font-size: 0.65rem;
}
.textSize1{
    font-size: 0.35rem;
    color:var(--temp-color);
}
</style>