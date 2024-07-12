<template>
    <div id="micromodule">
        <div class="micromodule-main">
            <!-- 左侧空调-->
            <div class="carbinet-left-temps">
            <div class="carbinet-left-temp" v-for="(key, index) in carbinetBackNum / 4" :key="index">
                <keep-alive>
                <!-- 后门上 -->
                <el-tooltip effect="light" :content="Object.keys(carbinetBack)[carbinetBackNum/2-(key)*2]" placement="top-start">
                    <carbinet-temp class="carbinet-temps-up"  :carbinetdData="Object.values(carbinetBack)[carbinetBackNum/2-(key)*2]" :ifleft="true"></carbinet-temp>
                </el-tooltip>
                </keep-alive>
                <keep-alive>
                <!-- 后门中 -->
                <el-tooltip effect="light" :content="Object.keys(carbinetBack)[carbinetBackNum/2-(key)*2+1]" placement="top-start">
                    <carbinet-temp class="carbinet-temps-mid" :carbinetdData="Object.values(carbinetBack)[carbinetBackNum/2-(key)*2+1]" :ifleft="true"></carbinet-temp>
                </el-tooltip>
                </keep-alive>
            </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[0][0] :ktId=ktId[0]></carbinet-kt>
                </div>
            </div>
            <div class="carbinetNkt">
                <!-- <div class="carbinet-name-left">A</div> -->
                <div class="carbinet-serve" v-for="(index, n) in carbinetName1" :key="n">
                    <keep-alive>
                        <carbinet :carbinetId="carbinetName1[n]"
                            :carbinetInfo=carbinetktdata[1][2] :ktId=ktId[0]></carbinet>
                    </keep-alive>
                </div>
            </div>
            <div class="carbinet-left-temps">
                <div class="carbinet-left-temp" v-for="(key, index) in carbinetFrontNum /2" :key="index">
                    <keep-alive>
                        <el-tooltip effect="light" :content="Object.keys(carbinetFront)[4-key]" placement="top-start">
                            <carbinet-temp :carbinetdData="Object.values(carbinetFront)[4-key]"
                                :ifleft="true"></carbinet-temp>
                        </el-tooltip>
                    </keep-alive>
                </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[0][1] :ktId=ktId[0]></carbinet-kt>
                </div>
            </div>

            <!-- 冷通道-->
            <div class="micromoduleLTD">
            </div>

            <!--右侧空调-->
            <div class="carbinet-right-temps">
                <div class="carbinet-left-temp" v-for="(key, index) in carbinetFrontNum /2" :key="index">
                    <keep-alive>
                        <el-tooltip effect="light" :content="Object.keys(carbinetFront)[8-key]" placement="top-start">
                            <carbinet-temp :carbinetdData="Object.values(carbinetFront)[8-key]"
                                :ifleft="true"></carbinet-temp>
                        </el-tooltip>
                    </keep-alive>
                </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[1][1] :ktId=ktId[1]></carbinet-kt>
                </div>
            </div>
            <div class="carbinetNkt">
                <!-- <div class="carbinet-name-left">B</div> -->
                <div class="carbinet-serve" v-for="(index, n) in carbinetName2" :key="n">
                    <keep-alive>
                        <carbinet :carbinetId="carbinetName2[n]"
                            :carbinetInfo=carbinetktdata[1][2] :ktId=ktId[1]></carbinet>
                    </keep-alive>
                </div>
            </div>
            <div class="carbinet-right-temps">
            <div class="carbinet-left-temp" v-for="(key, index) in carbinetBackNum / 4" :key="index">
                <keep-alive>
                <!-- 后门上 -->
                <el-tooltip effect="light" :content="Object.keys(carbinetBack)[carbinetBackNum-(key)*2]" placement="top-start">
                    <carbinet-temp class="carbinet-temps-up"  :carbinetdData="Object.values(carbinetBack)[carbinetBackNum-(key)*2]" :ifleft="true"></carbinet-temp>
                </el-tooltip>
                </keep-alive>
                <keep-alive>
                <!-- 后门中 -->
                <el-tooltip effect="light" :content="Object.keys(carbinetBack)[carbinetBackNum-(key)*2-1]" placement="top-start">
                    <carbinet-temp class="carbinet-temps-mid" :carbinetdData="Object.values(carbinetBack)[carbinetBackNum-(key)*2-1]" :ifleft="true"></carbinet-temp>
                </el-tooltip>
                </keep-alive>
            </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[1][0] :ktId=ktId[1]></carbinet-kt>
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
            ktId: ["703-1","703-2"],
            carbinetktdata:[],
            carbintserverdataValues:[],
            carbinetBack:{},
            carbinetFront:{},
            carbinetBackNum:0,
            carbinetFrontNum:0,
            carbinetName1:["A04","A03","空调","A02","A01"],
            carbinetName2:["A08","A07","空调","A06","A05"]
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
                {
                        '回风温度设定':22.50,
                        '回风温度': 23.00,
                        '送风温度设定': 22.50,
                        '送风温度': 23.00,
                        '风机1转速':50,
                        '风机2转速':95.8,
                        '压缩机1容量':52,
                        '压缩机2容量':53
                },
                {
                        '回风温度设定': 22.50,
                        '回风温度': 23.00,
                        '送风温度设定': 22.50,
                        '送风温度': 23.00,
                        '风机1转速':50,
                        '风机2转速':95.8,
                        '压缩机1容量':52,
                        '压缩机2容量':53
                }
            ]
        },
        getcarbintserverdata() {
            this.carbinetserverdata = {
                "A01机柜后门上": 23.3,
                "A01机柜后门中": 23.5,
                "A01机柜前门下": 23.7,
                "A02机柜后门上": 23.9,
                "A02机柜后门中": 24.1,
                "A02机柜前门下": 24.3,
                "A03机柜后门上": 24.5,
                "A03机柜后门中": 24.7,
                "A03机柜前门下": 24.9,
                "A04机柜后门上": 25.1,
                "A04机柜后门中": 25.3,
                "A04机柜前门下": 23.7,
                "A05机柜后门上": 23.9,
                "A05机柜后门中": 24.1,
                "A05机柜前门下": 23.3,
                "A06机柜后门上": 23.9,
                "A06机柜后门中": 24.9,
                "A06机柜前门下": 23.9,
                "A07机柜后门上": 23.3,
                "A07机柜后门中": 24.1,
                "A07机柜前门下": 24.7,
                "A08机柜后门上": 23.3,
                "A08机柜后门中": 23.9,
                "A08机柜前门下": 24.9
            };


            for (const key in this.carbinetserverdata) {
                if (key.includes("后门")) {
                this.carbinetBack[key] = this.carbinetserverdata[key];
                } else {
                this.carbinetFront[key] = this.carbinetserverdata[key];
                }
            }
            this.carbinetBackNum = Object.keys(this.carbinetBack).length;
            this.carbinetFrontNum = Object.keys(this.carbinetFront).length;

            console.log(11111111,this.carbinetBack);
        }, 
    },

}
</script>

<style>
#micromodule{
    display: flex;
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
    width: 55rem;
    height: 100%;
    margin-left: 1vw;
}
.carbinet-left-temps {
    position: relative;
    display: flex;
    justify-content: center;
    background-color:  #b5c5dc ;
    width: 13rem;
    height: 85%;
    margin-top: 3.76vw;
    flex-direction: column; 
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)

}
.carbinet-right-temps{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:  #b5c5dc ;
    width: 13rem;
    height: 85%;
    margin-top: 3.76vw;
    flex-direction: column; 
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
}
.carbinet-left-temp{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 85%;
}
.carbinetNkt{
    margin: 0.1vw -1vw;
    width: 40%;
    height: 86%;
    margin-top: 3.76vw;
}
.carbinet-serve{
    width: 15rem;
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
    position: absolute; /* 绝对定位的子元素 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.1);
    background-color: white; /* 背景色以便示例展示 */
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
.carbinet-temps-up{
    position:absolute;
    margin-top: 30%;
}
.carbinet-temps-mid{
    position:absolute;
    margin-bottom: 30%;
}
</style>
