<template>
    <div id="micromodule">
       <div class="micromodule-main">
            <!-- 左侧空调-->
            <div class="carbinet-left-temps">
                <div class="carbinet-left-temp" v-for="n in carbinetserverdata.length/2" :key="n.index">
                    <keep-alive>
                        <carbinet-temp :carbinetdData=carbinetserverdata[0][n-1] :ifleft=true></carbinet-temp>
                    </keep-alive>
                </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[0][0] :ktId=ktId[0]></carbinet-kt>         
                </div>
                <div class="carbinet-left-temp" v-for="n in carbinetserverdata.length/2" :key="n.index">
                    <keep-alive>
                        <carbinet-temp :carbinetdData=carbinetserverdata[1][n-1] :ifleft=true></carbinet-temp>
                    </keep-alive>
                </div>
            </div>
            <div class="carbinetNkt">
                <div class="carbinet-name-left">A</div>

                <div class="carbinet-serve" v-for="n in 5" :key="n.index">
                    <keep-alive>
                        <carbinet :carbinetId=carbinetName[n-1] :carbinetInfo=carbinetktdata[0][2] :ktId=ktId[0]></carbinet>
                    </keep-alive>
                </div>
            </div>
            <div class="carbinet-left-temps">
                <div class="carbinet-left-temp" v-for="n in carbinetserverdata.length/2" :key="n.index">
                    <keep-alive>
                        <carbinet-temp :carbinetdData=carbinetserverdata[0][n-1] :ifleft=true></carbinet-temp>
                    </keep-alive>
                </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[0][1] :ktId=ktId[0]></carbinet-kt>         
                </div>
                <div class="carbinet-left-temp" v-for="n in carbinetserverdata.length/2" :key="n.index">
                    <keep-alive>
                        <carbinet-temp :carbinetdData=carbinetserverdata[1][n-1] :ifleft=true></carbinet-temp>
                    </keep-alive>
                </div>
            </div>
            <div class="micromoduleLTD">
            </div>

            <!--右侧空调-->
            <div class="carbinet-right-temps">
                <div class="carbinet-left-temp" v-for="n in carbinetserverdata.length/2" :key="n.index">
                    <keep-alive>
                        <carbinet-temp :carbinetdData=carbinetserverdata[2][n-1] :ifleft=true></carbinet-temp>
                    </keep-alive>
                </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[1][1] :ktId=ktId[1]></carbinet-kt>         
                </div>
                <div class="carbinet-left-temp" v-for="n in carbinetserverdata.length/2" :key="n.index">
                    <keep-alive>ifleft
                        <carbinet-temp :carbinetdData=carbinetserverdata[3][n-1] :ifleft=true></carbinet-temp>
                    </keep-alive>
                </div>
            </div>
            <div class="carbinetNkt">
                <div class="carbinet-name-left">B</div>
                <div class="carbinet-serve" v-for="n in 5" :key="n.index">
                    <keep-alive>
                        <carbinet :carbinetId=carbinetName[n-1] :carbinetInfo=carbinetktdata[1][2] :ktId=ktId[0]></carbinet>
                    </keep-alive>
                </div>
            </div>
            <div class="carbinet-right-temps">
                <div class="carbinet-left-temp" v-for="n in carbinetserverdata.length/2" :key="n.index">
                    <keep-alive>
                        <carbinet-temp :carbinetdData=carbinetserverdata[2][n-1] :ifleft=true></carbinet-temp>
                    </keep-alive>
                </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[1][0] :ktId=ktId[1]></carbinet-kt>         
                </div>
                <div class="carbinet-left-temp" v-for="n in carbinetserverdata.length/2" :key="n.index">
                    <keep-alive>
                        <carbinet-temp :carbinetdData=carbinetserverdata[3][n-1] :ifleft=true></carbinet-temp>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import carbinet from './Carbinet.vue'
import CarbinetTemp from '../components/CarbinetTemp.vue'
import CarbinetKt from '../components/CarbinetKt'

export default{
    data() {
        return {
            tempNum:2,
            carbinetNum:2,
            ktId:["A","B"],
            carbinetName:["1","2","空调","3","4"],
            carbinetktdata:[],
            carbintserverdataValues:[],
        }
    },
    components:{
        'carbinet':carbinet,
        'carbinet-temp':CarbinetTemp,
        'carbinet-kt':CarbinetKt,
    },
    created () {
        this.getcarbinetktdata()
        this.getcarbintserverdata()
    },
    mounted(){
        this.getcarbinetktdata()
        this.getcarbintserverdata()
    },
    methods:{
        getcarbinetktdata(){
            this.carbinetktdata= [
                [
                    {
                        '回风温度设定':22.50,
                        '回风温度': 23.00,
                    },
                    {
                        '送风温度设定': 22.50,
                        '送风温度': 23.00,
                    },
                    {
                        '风机1转速':50,
                        '风机2转速':95.8,
                        '压缩机1容量':52,
                        '压缩机2容量':53
                    }
                ],
                [
                    {
                        '回风温度设定': 22.50,
                        '回风温度': 23.00,
                    },
                    {
                        '送风温度设定': 22.50,
                        '送风温度': 23.00,
                    },
                    {
                        '风机1转速':50,
                        '风机2转速':95.8,
                        '压缩机1容量':52,
                        '压缩机2容量':53
                    }
                ]
            ]
        },
        getcarbintserverdata() {
            this.carbinetserverdata = [1,2,3,4,5,6]
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
}
.micromodule-main{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.carbinet-left-temps {
    display: flex;
    justify-content: center;
    background-color:  #b5c5dc ;
    width: 16%;
    height: 85%;
    margin-top: 3.76vw;
    flex-direction: column; 
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)

}
.carbinet-right-temps{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:  #b5c5dc ;
    width: 16%;
    height: 85%;
    margin-top: 3.76vw;
    flex-direction: column; 
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
}
.carbinet-left-temp{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 85%;
}
.carbinetNkt{
    margin: 0.1vw;
    width: 40%;
    height: 85%;
}
.carbinet-serve{
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.micromoduleLTD{
    background-color:  #b5c5dc ;
    width: 4%;
    height: 85%;
    margin-top: 3.76vw;
    z-index: 10;
}
.carbinet-kts{
    width: 80%;
    height: 90%;
    margin: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.1)
}
.carbinet-name-left {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    color: #4DBD65;
}
</style>
