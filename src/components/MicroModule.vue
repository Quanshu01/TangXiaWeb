<template>
    <div id="micromodule">
        <div class="micromodule-main">
            <!-- 左侧空调-->
            <div class="carbinet-left-temps">
                <div class="carbinet-left-temp" v-for="(index, n) in displayOrderA" :key="n">
                    <keep-alive>
                        <!--后门上-->
                        <el-tooltip class="item" effect="light" content="后门上" placement="top-start">
                            <carbinet-temp class="carbinet-temps-up" v-if="index!==-1"
                                :carbinetdData="filteredData(displayOrderA[n])[0]" :ifleft="true"></carbinet-temp>
                        </el-tooltip>
                    </keep-alive>
                    <keep-alive>
                        <!--后门中-->
                        <el-tooltip class="item" effect="light" content="后门中" placement="top-start">
                            <carbinet-temp class="carbinet-temps-mid" v-if="index!==-1"
                                :carbinetdData="filteredData(displayOrderA[n])[1]" :ifleft="true"></carbinet-temp>
                        </el-tooltip>
                    </keep-alive>
                </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[0][1] :ktId=ktId[0]></carbinet-kt>
                </div>
            </div>
            <div class="carbinetNkt">
                <!-- <div class="carbinet-name-left">A</div> -->
                <div class="carbinet-serve" v-for="(index, n) in displayOrderA" :key="n">
                    <keep-alive>
                        <carbinet :carbinetId="index === -1 ? '空调' : carbinetserverdata[index].name"
                            :carbinetInfo=carbinetktdata[0][3] :ktId=ktId[0]></carbinet>
                    </keep-alive>
                </div>
            </div>
            <div class="carbinet-left-temps">
                <div class="carbinet-left-temp" v-for="(index, n) in displayOrderA" :key="n">
                    <keep-alive>
                        <el-tooltip effect="light" content="前门下" placement="top-start">
                            <carbinet-temp v-if="index!==-1" :carbinetdData="filteredDataFront(displayOrderA[n])"
                                :ifleft="true"></carbinet-temp>
                        </el-tooltip>
                    </keep-alive>
                </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[0][2] :ktId=ktId[0]></carbinet-kt>
                </div>
            </div>

            <!-- 冷通道-->
            <div class="micromoduleLTD">
            </div>

            <!--右侧空调-->
            <div class="carbinet-right-temps">
                <div class="carbinet-left-temp" v-for="(index, n) in displayOrderB" :key="n">
                    <keep-alive>
                        <el-tooltip effect="light" content="前门下" placement="top-start">
                            <carbinet-temp v-if="index!==-1" :carbinetdData="filteredDataFront(displayOrderB[n])"
                                :ifleft="true"></carbinet-temp>
                        </el-tooltip>
                    </keep-alive>
                </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[1][2] :ktId=ktId[1]></carbinet-kt>
                </div>
            </div>
            <div class="carbinetNkt">
                <!-- <div class="carbinet-name-left">B</div> -->
                <div class="carbinet-serve" v-for="(index, n) in displayOrderB" :key="n">
                    <keep-alive>
                        <carbinet :carbinetId="index === -1 ? '空调' : carbinetserverdata[index].name"
                            :carbinetInfo=carbinetktdata[1][3] :ktId=ktId[1]></carbinet>
                    </keep-alive>
                </div>
            </div>
            <div class="carbinet-right-temps">
                <div class="carbinet-left-temp" v-for="(index, n) in displayOrderB" :key="n">
                    <keep-alive>
                        <!--后门上-->
                        <el-tooltip effect="light" content="后门上" placement="top-start">
                            <carbinet-temp class="carbinet-temps-up" v-if="index!==-1"
                                :carbinetdData="filteredData(displayOrderB[n])[0]" :ifleft="true"></carbinet-temp>
                        </el-tooltip>
                    </keep-alive>
                    <keep-alive>
                        <!--后门中-->
                        <el-tooltip effect="light" content="后门中" placement="top-start">
                            <carbinet-temp class="carbinet-temps-mid" v-if="index!==-1"
                                :carbinetdData="filteredData(displayOrderB[n])[1]" :ifleft="true"></carbinet-temp>
                        </el-tooltip>
                    </keep-alive>
                </div>
                <div class="carbinet-kts">
                    <carbinet-kt :values=carbinetktdata[1][1] :ktId=ktId[1]></carbinet-kt>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import carbinet from './Carbinet.vue'
import CarbinetTemp from '../components/CarbinetTemp.vue'
import CarbinetKt from '../components/CarbinetKt'
import axios from 'axios'
export default{
    data() {
        return {
            tempNum:2,
            carbinetNum:2,
            ktId: ["703-1","703-2"],
            carbinetktdata:[],
            carbinetserverdata:[],
            displayOrderA: [3, 2, -1, 1, 0],
            displayOrderB: [7, 6, -1, 5, 4]
        }
    },
    components:{
        'carbinet':carbinet,
        'carbinet-temp':CarbinetTemp,
        'carbinet-kt':CarbinetKt,
    },
    created () {
        this.getcarbinetktdata()
        this.getcarbinetserverdata()
    },
    mounted(){
        this.getcarbinetktdata()
        this.getcarbinetserverdata()
    },
    methods:{

        getcarbinetktdata(){
            axios.get(this.global.apiURL+"/703display/realtime_kt").then(
                Response=>{
                    this.carbinetktdata=Response.data
                },
                Error=>{
                    console.log('axios realtime_kt error',Error.message)
                });
        },
        getcarbinetserverdata() {
            axios.get(this.global.apiURL+"/703display/realtime_server").then(
                Response=>{
                    this.carbinetserverdata=Response.data
                },
                Error=>{
                    console.log('axios carbinetserverdata error',Error.message)
                });
        }, 
        filteredData(index) {
            if (index !== -1) {
                const data = this.carbinetserverdata[index].temperatures;
                const filtered = data
                    .filter(item => item.position === '后门上' || item.position === '后门中')
                    .map(item => item.value); 
                return filtered;
            }
            return [];
        },       
        filteredDataFront(index) {
            if (index !== -1) {
                const data = this.carbinetserverdata[index].temperatures;
                const filtered = data.filter(item => item.position === '前门下');
                return filtered[0].value;
            }
        }
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
    margin-top: 40%;
}
.carbinet-temps-mid{
    position:absolute;
    margin-bottom: 40%;
}
</style>
