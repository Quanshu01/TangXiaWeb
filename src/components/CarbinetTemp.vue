<template>
    <div class="carbinet-temperature">
        <!--左列温度-->
        <div v-if="ifleft" class="single-temp">
            <img src="@/assets/icons/cold_thermometer.svg" class="carbinet-temp-icon"/>
            <div class="carbinet-tem-num" >{{ carbinetdData }}°C </div>
        </div>
        <!--右列温度-->
        <div v-else class="single-temp">
            <div class="carbinet-tem-num" >{{ carbinetdData }}°C </div>
            <img src="@/assets/icons/cold_thermometer.svg" class="carbinet-temp-icon"/>
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
    color:#8698d0;
    font-weight: 600;
    zoom: 0.8;
    font-size: 1.3rem; 
    font-weight: 600; 

}
.carbinet-temp-icon{
    width:2vw;
    height:2.5vh;
}
</style>