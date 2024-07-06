<template>
    <div class="carbinet-temperature">
        <!--左列温度-->
        <div v-if="ifleft" class="single-temp">
            <div class="carbinet-tem-num" >{{ carbinetdData }}°C </div>
        </div>
        <!--右列温度-->
        <div v-else class="single-temp">
            <div class="carbinet-tem-num" >{{ carbinetdData }}°C </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        carbinetdData:{},

        ifleft:{
            type:Boolean,
            default:false,
        }
    },
}
</script>

<style>
.carbinet-temperature{
    display: flex;
    align-items: center;
    justify-content: center;
}
.single-temp{
    display: flex;
    align-items: center;
    justify-content: center;
}
.carbinet-tem-num{
    /* color:#3b5298; */
    color:#8698d0;
    font-weight: 600;
    zoom: 0.8;
    font-size: 0.75rem; 
    font-weight: 600; 

}
.carbinet-temp-icon{
    width:1.6vw;
    height:2.2vh;
}
</style>