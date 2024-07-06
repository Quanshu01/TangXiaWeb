<template>
    <div id="micromodule">
        

        <div class="micromodule-main">

            <div class="carbinetNkt">

                 <div class="carbinet-name-left">{{JF[micronIdNum-1].carbinetLeft}}</div>
                 
                <div class="carbinet-serve" v-for="n in 5" :key="n.index">
                    <template v-if="n === 3">
                            <carbinet-kt :values="carbinetktdata[1]" :ktId="micronIdNum" :ifLeft="1"></carbinet-kt>
                        </template>
                        <template v-else>
                            <carbinet :carbinetId="carbinetName[n-1]" :carbinettemppos="0" :carbinettemp="n-1" :carbinetpos="micronIdNum" :ifLeft="1">
                            </carbinet>
                        </template>
                </div>
            </div>
            
            <div class="micromoduleLTD">
            </div>

            <div class="carbinetNkt">

                <div class="carbinet-name-left">{{JF[micronIdNum-1].carbinetRight}}</div>

                <div class="carbinet-serve" v-for="n in 5" :key="n.index">
                    <template v-if="n === 3">
                            <carbinet-kt :values="carbinetktdata[2]" :ktId="micronIdNum" :ifLeft="0"></carbinet-kt>
                        </template>
                        <template v-else>
                            <carbinet :carbinetId="carbinetName[n-1]" :carbinettemppos="1" :carbinettemp="n-1" :carbinetpos="micronIdNum" :ifLeft="0">
                            </carbinet>
                        </template>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import carbinet from './Carbinet.vue'
// import CarbinetTemp from '../components/CarbinetTemp.vue'
import CarbinetKt from '../components/CarbinetKt'

export default{
    props:{
        micronIdNum:{}
    },
    data() {
        return {
            tempNum:2,
            carbinetNum:2,
            upORdown:['上','下'],
            carbinetName:["4","3","空调","2","1"],
            carbinetktdata:[],
            carbintserverdataValues:[],
            carbinetCount: 0,
            JF:[],
        }
    },
    components:{
        'carbinet':carbinet,
        // 'carbinet-temp':CarbinetTemp,
        'carbinet-kt':CarbinetKt,
    },
    created () {
        this.getcarbinetktdata()
        this.getcarbintserverdata()
        this.JF=this.global.JF703
    },
    mounted(){
        this.getcarbinetktdata()
        this.getcarbintserverdata()
    },
    methods:{
        getcarbinetktdata(){
            this.carbinetktdata=this.$store.state.carbinetktdata;
            console.log('this.carbinetktdata',this.carbinetktdata)
        },
        getcarbintserverdata() {
            this.carbinetserverdata = this.$store.state.carbinetserverdata;
        },        
    },
}
</script>

<style>
#micromodule{
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-bottom: 2vw;
    margin-right: 2vw;
}
.micromodule-main{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.carbinet-name-left {
    /* position: absolute;
    top: 5.5rem;
    height: 8%; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    /* background-color:  #d2dce9 ; */
    color: #4DBD65;
    /* margin-left: 2vw; */
}
.carbinet-name-right {
    /* position: absolute;
    top: 5.5rem;
    height: 8%; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
    color: #4DBD65;
    /* background-color:  #d2dce9 ; */
    /* margin-left: 1.5vw; */
}
.carbinet-left-temps {
    display: flex;
    justify-content: center;
    background-color:  #b5c5dc ;
    width: 10%;
    height: 90%;
    flex-direction: column; 
    align-items: center;
    justify-content: flex-start;
}
.carbinet-right-temps{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:  #b5c5dc ;
    /* background-color:  #aac8da; */
    width: 12%;
    height: 85%;
    flex-direction: column; 
    align-items: center;
}
.carbinet-left-temp{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
    height: 20%;
}
.carbinetNkt{
    /* background-color: rgb(152, 150, 164); */
    width: 40%;
    height: 85%;
}
.carbinet-serve{
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)

}
.micromoduleLTD{
    background-color:  #b5c5dc ;
    width: 6%;
    height: 85%;
    margin-top: 3.76vw;
}
.carbinet-kts{
    width: 20%;
    height: 90%;
    margin: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
