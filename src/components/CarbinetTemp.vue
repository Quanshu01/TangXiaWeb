<template>
    <div class="carbinet-temperature">
        <div v-if="type==0" class="single-temp">
            <img src="@/assets/icons/cold_thermometer.svg" class="carbinet-temp-icon"/>
            <div class="carbinet-tem-num" >{{ carbinetdData }}°C </div>
        </div>
        <div v-if="type==1" class="single-temp">
            <div class="content-pic-hot-s" :style="styleVar" ></div>
            <div class="carbinet-tem-num_cold" :style="styleVar" >{{ carbinetdData }}°C </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            colorList: ['#8698d0','#79BCFF','#2D71CF','#0F1114'],
        }
    },
    props: {
        carbinetdData:{},
        type:{
            type:Number,
            default:false,
        }
    },
    computed:{
        styleVar(){
            return{
                '--rsk-carbinetdData':this.carbinetdData,
                '--rsk-riskColor':this.carbinetdData==-1 ? this.colorList[3] : 
                                    (Math.abs(this.carbinetdData)<0.1 ? this.colorList[0] : 
                                        (Math.abs(this.carbinetdData)<=1 ? this.colorList[1] : this.colorList[2])),
            }
        },
        
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
.carbinet-tem-num_cold {
    color: var(--rsk-riskColor);
    font-weight: 600;
    zoom: 0.8;
    font-size: 1.3rem; 
    font-weight: 600; 

}
.carbinet-temp-icon{
    width:2vw;
    height:2.5vh;
}
.content-pic-hot-s{
    background-color: var(--rsk-riskColor);
    height:0.8rem;
    width:0.8rem;
    margin-right:0.5rem;
    border-radius: 20%;
    justify-content: center;
    align-items: center;
}
</style>