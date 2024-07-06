<template>
    <div id="fwq">
        <!-- 服务器上方空调 -->
        <div class="top-kt">
            <fwq-kt v-if=JF[fwqId-1].ktTop[0] :ktId=JF[fwqId-1].ktTop[0] :values=ktdataall[JF[fwqId-1].ktTop[0]]></fwq-kt>
            <fwq-kt v-if=JF[fwqId-1].ktTop[1] :ktId=JF[fwqId-1].ktTop[1] :values=ktdataall[JF[fwqId-1].ktTop[1]]></fwq-kt>
        </div>

        <!-- 服务器 -->
        <!-- 服务器名和功率 -->
        <div class="center-fwq-FWQname">
            <div class="left-fwq">
                <div class="fwqName" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;">{{JF[fwqId-1].fwqLeft}}</div>
                <power :powerData=realtimefwqpower[JF[fwqId-1].fwdLeftindex]></power>
            </div>
            <div class="mid-fwq"></div>
            <div class="right-fwq">
                <div class="fwqName" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;">{{ JF[fwqId-1].fwqRight }}</div>
                <power :powerData=realtimefwqpower[JF[fwqId-1].fwdrightindex]></power>
            </div>
        </div>
        <!-- 服务器机身 -->
        <div class="center-fwq-body">
            <!-- 服务器左热通道 -->
            <div class="center-fwq-rtd">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <el-tooltip class="item" effect="dark" content="热通道温度" placement="top" v-if="ltdNum===2">
                    <div class="fwq-rtdwd">
                        <div class="top-rtd">
                            <div v-for="n in realtimefwqrtdwdbig[JF[fwqId-1].fwdLeftindex].length" :key="n.index">
                                <el-tooltip class="item" effect="light" placement="top" v-if="ltdNum===2">
                                    <div slot="content">{{JF[fwqId-1].fwqLeft}} {{n}}</div>
                                    <rtd-temp :rtdData=realtimefwqrtdwdbig[JF[fwqId-1].fwdLeftindex][n-1] :ifsmall="false" :fontSize=0.65 :pic="0.6"></rtd-temp>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                </el-tooltip>
            </div>

            <!-- 服务器左列冷通道 -->
            <div class="left-fwq">
                <!-- 小图 服务器左列 -->
                <ltd-temp v-if="ltdNum===1" :ltdData=realtimefwqltdwdsmall[JF[fwqId-1].fwdLeftindex][0] :fontSize=0.7></ltd-temp>
                <div></div>
                <rtd-temp v-if="ltdNum===1" :rtdData=realtimefwqrtdwdsmall[JF[fwqId-1].fwdLeftindex][0] :fontSize=0.7></rtd-temp>
                <div></div>
                <ltd-temp v-if="ltdNum===1" :ltdData=realtimefwqltdwdsmall[JF[fwqId-1].fwdLeftindex][1] :fontSize=0.7></ltd-temp>

                <!-- 大图 服务器左列 -->
                <el-tooltip class="item" effect="dark" content="冷通道温度" placement="top" v-if="ltdNum===2">
                    <div class="fwq-ltdwd">
                        <!-- <div class="top-ltd">
                            <div v-for="n in realtimefwqltdwdbig[JF[fwqId-1].fwdLeftindex][0].length" :key="n.index">
                                <ltd-temp :index=true :ltdData=n :fontSize=0.3 :ifsmall="false" :pic="0.3"></ltd-temp>
                            </div>
                        </div> -->

                        <!-- 大图 服务器左列 冷通道温度上列 -->
                        <div class="top-ltd">
                            <div v-for="n in realtimefwqltdwdbig[JF[fwqId-1].fwdLeftindex][0].length" :key="n.index">
                                <el-tooltip class="item" effect="light" placement="top" v-if="ltdNum===2">
                                    <div slot="content">{{JF[fwqId-1].fwqLeft}} {{n}} -上</div>
                                    <ltd-temp :ltdData=realtimefwqltdwdbig[JF[fwqId-1].fwdLeftindex][0][n-1] :fontSize=0.65 :ifsmall="false" :pic="0.6" :maxNsub=[n-1,fwqltdwdUpMaxIndex[JF[fwqId-1].fwdLeftindex]]></ltd-temp>
                                </el-tooltip>
                            </div>
                        </div>
                        <!-- 大图 服务器左列 冷通道温度下列 -->
                        <div class="bottom-ltd">
                            <div v-for="n in realtimefwqltdwdbig[JF[fwqId-1].fwdLeftindex][1].length" :key="n.index">
                                <el-tooltip class="item" effect="light" placement="top" v-if="ltdNum===2">
                                    <div slot="content">{{JF[fwqId-1].fwqLeft}} {{n}} -下</div>
                                    <ltd-temp :ltdData=realtimefwqltdwdbig[JF[fwqId-1].fwdLeftindex][1][n-1] :fontSize=0.65 :ifsmall="false" :pic="0.6" :maxNsub=[n-1,fwqltdwdDownMaxIndex[JF[fwqId-1].fwdLeftindex]]></ltd-temp>
                                </el-tooltip>
                            </div>
                        </div>

                        <!-- <div class="top-ltd">
                            <div v-for="n in realtimefwqltdwdbig[JF[fwqId-1].fwdLeftindex][0].length" :key="n.index">
                                <ltd-temp :index=true :ltdData=n :fontSize=0.3 :ifsmall="false" :pic="0.3"></ltd-temp>
                            </div>
                        </div> -->
                    </div>
                </el-tooltip>
            </div>

            <div class="mid-fwq"></div>

            <!-- 服务器右列冷通道 -->
            <div class="right-fwq">
                <!-- 小图 服务器右列 -->
                <ltd-temp v-if="ltdNum===1" :ltdData=realtimefwqltdwdsmall[JF[fwqId-1].fwdrightindex][0] :fontSize=0.7></ltd-temp>
                <div></div>
                <rtd-temp v-if="ltdNum===1" :rtdData=realtimefwqrtdwdsmall[JF[fwqId-1].fwdrightindex][0] :fontSize=0.7></rtd-temp>
                <div></div>
                <ltd-temp v-if="ltdNum===1" :ltdData=realtimefwqltdwdsmall[JF[fwqId-1].fwdrightindex][1] :fontSize=0.7></ltd-temp>
                <!-- 大图 服务器右列 -->
                <el-tooltip class="item" effect="dark" content="冷通道温度" placement="top" v-if="ltdNum===2">
                    <div class="fwq-ltdwd">
                        <!-- <div class="top-ltd">
                            <div v-for="n in realtimefwqltdwdbig[JF[fwqId-1].fwdrightindex][0].length" :key="n.index">
                                <ltd-temp :index=true :ltdData=n :fontSize=0.3 :ifsmall="false" :pic="0.3"></ltd-temp>
                            </div>
                        </div> -->
                        
                        <!-- 大图 服务器右列 冷通道温度上列 -->
                        <div class="top-ltd">
                            <div v-for="n in realtimefwqltdwdbig[JF[fwqId-1].fwdrightindex][0].length" :key="n.index">
                                <el-tooltip class="item" effect="light" placement="top" v-if="ltdNum===2">
                                    <div slot="content">{{JF[fwqId-1].fwqRight}} {{n}} -上</div>
                                    <ltd-temp :ltdData=realtimefwqltdwdbig[JF[fwqId-1].fwdrightindex][0][n-1] :fontSize=0.65 :ifsmall="false" :pic="0.6" :maxNsub=[n-1,fwqltdwdUpMaxIndex[JF[fwqId-1].fwdrightindex]]></ltd-temp>
                                </el-tooltip>
                            </div>
                        </div>
                        <!-- 大图 服务器右列 冷通道温度下列 -->
                        <div class="bottom-ltd">
                            <div v-for="n in realtimefwqltdwdbig[JF[fwqId-1].fwdrightindex][1].length" :key="n.index">
                                <el-tooltip class="item" effect="light" placement="top" v-if="ltdNum===2">
                                    <div slot="content">{{JF[fwqId-1].fwqRight}} {{n}} -下</div>
                                    <ltd-temp :ltdData=realtimefwqltdwdbig[JF[fwqId-1].fwdrightindex][1][n-1] :fontSize=0.65 :ifsmall="false" :pic="0.6" :maxNsub=[n-1,fwqltdwdDownMaxIndex[JF[fwqId-1].fwdrightindex]]></ltd-temp>
                                </el-tooltip>
                            </div>
                        </div>

                        <!-- <div class="top-ltd">
                            <div v-for="n in realtimefwqltdwdbig[JF[fwqId-1].fwdrightindex][0].length" :key="n.index">
                                <ltd-temp :index=true :ltdData=n :fontSize=0.3 :ifsmall="false" :pic="0.3"></ltd-temp>
                            </div>
                        </div> -->
                    </div>
                </el-tooltip>
            </div>

            <!-- 服务器右列热通道 -->
            <div class="center-fwq-rtd">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <el-tooltip class="item" effect="dark" content="热通道温度" placement="top" v-if="ltdNum===2">
                    <div class="fwq-rtdwd">
                        <div class="bottom-rtd">
                            <div v-for="n in realtimefwqrtdwdbig[JF[fwqId-1].fwdLeftindex].length" :key="n.index">
                                <el-tooltip class="item" effect="light" placement="top" v-if="ltdNum===2">
                                    <div slot="content">{{JF[fwqId-1].fwqRight}} {{n}}</div>
                                    <rtd-temp :rtdData=realtimefwqrtdwdbig[JF[fwqId-1].fwdrightindex][n-1] :ifsmall="false" :fontSize=0.65 :pic="0.6" ></rtd-temp>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                </el-tooltip>
            </div>
        </div>

        <!-- 服务器下方空调 -->
        <div class="bottom-kt">
            <fwq-kt v-if=JF[fwqId-1].ktBottom[0] :ktId=JF[fwqId-1].ktBottom[0] :values=ktdataall[JF[fwqId-1].ktBottom[0]]></fwq-kt>
            <fwq-kt v-if=JF[fwqId-1].ktBottom[1] :ktId=JF[fwqId-1].ktBottom[1] :values=ktdataall[JF[fwqId-1].ktBottom[1]]></fwq-kt>
        </div>
    </div>
</template>

<script>
import FwqKt from './FwqKt.vue'
import LtdTemp from '../components/LtdTemp.vue'
import RtdTemp from '../components/RtdTemp.vue'
import Power from '../components/PowerData.vue'
import axios from 'axios';

export default {
    name: "Fwq",
    props: ['fwqId','ltdNum'],
    data() {
        return {
            timer:"",
            JF:[],
            fwqlist:[],
            ktdataall:[],
            realtimefwqltdwdsmall:[],
            realtimefwqltdwdbig:[],
            realtimefwqrtdwdsmall:[],
            realtimefwqrtdwdbig:[],
            fwqltdwdDownMaxIndex:[],
            fwqltdwdUpMaxIndex:[],
            realtimefwqpower:[]
        }
    },
    components:{
        'fwq-kt':FwqKt,
        'ltd-temp':LtdTemp,
        'rtd-temp':RtdTemp,
        'power':Power,
    },
    mounted(){
        this.getktdata()
        this.getfwqall()
        this.timer=setInterval(()=>{
            this.getktdata()
            this.getfwqall()
        },84441)
    },
    created () {
        this.getktdata()
        this.getfwqall()
    },
    methods:{
        getktdata(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/ktnew",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    this.ktdataall=Response.data[0]['机房空调']
                    // 提交 mutation 将数据保存到 Vuex store
                    this.$store.commit('SET_KTDATAALL', this.ktdataall);
                },
                Error=>{
                    console.log('axios ktnew error',Error)
                }
            );
        },
        getfwqall(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/servernew",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios servernew',Response.data)
                    this.realtimefwqltdwdsmall=[]
                    this.realtimefwqltdwdbig=[]
                    this.realtimefwqrtdwdsmall=[]
                    this.realtimefwqrtdwdbig=[]
                    this.fwqltdwdDownMaxIndex=[]
                    this.fwqltdwdUpMaxIndex=[]
                    this.realtimefwqpower=[]

                    // 机组实时状态 冷通道温度/热通道温度 大图小图数据获取
                    for(var j=0;j<(Object.keys(Response.data[0]['servercold']).length);j++){
                        // 机组实时状态 冷通道温度 小图数据获取
                        this.realtimefwqltdwdsmall.push(Object.values(Response.data[0]['servercold'][this.fwqlist[j]]['avg']))
                        // 机组实时状态 热通道温度 小图数据获取
                        this.realtimefwqrtdwdsmall.push(Object.values(Response.data[0]['serverhot'][this.fwqlist[j]]['avg']))

                        // 机组实时状态 冷通道温度 大图数据获取
                        var realtimefwqltdwd=Response.data[0]['servercold'][this.fwqlist[j]]['sitedetail']
                        this.realtimefwqltdwdbig.push([Object.values(realtimefwqltdwd['up']),Object.values(realtimefwqltdwd['down'])])
                        // 机组实时状态 热通道温度 大图数据获取
                        this.realtimefwqrtdwdbig.push(Object.values(Response.data[0]['serverhot'][this.fwqlist[j]]['sitedetail']))

                        // 机组实时状态 冷通道温度 大图 最大次大值数据获取
                        this.fwqltdwdDownMaxIndex.push([realtimefwqltdwd['cold_down_max_index'],realtimefwqltdwd['cold_down_submax_index']])
                        this.fwqltdwdUpMaxIndex.push([realtimefwqltdwd['cold_up_max_index'],realtimefwqltdwd['cold_up_submax_index']])
                    }
                    // 机组实时状态 服务器功率 大小图数据获取
                    this.realtimefwqpower=Object.values(Response.data[0]['serverpower'])

                    // 提交 mutation 将数据保存到 Vuex store
                    this.$store.commit('SET_SERVERNEW', this.realtimefwqltdwdsmall,
                    this.realtimefwqltdwdbig, this.realtimefwqrtdwdsmall, this.realtimefwqrtdwdbig, 
                    this.fwqltdwdDownMaxIndex, this.fwqltdwdUpMaxIndex, this.realtimefwqpower);
                    
                },
                Error=>{
                    console.log('axios servernew error',Error)
                }
            );
        },
    },
}
</script>

<style>
#fwq{
    margin:0.1vh;
    width:98%;
    height:100%;
}
.top-kt,.bottom-kt{
    margin:1%;
    width:98%;
    height:11%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fwq-name{
    font-size: large;
    font-weight: 900;
    color:#4DBD65;
    height:1.2rem;
    display: grid;
    grid: 1.2rem 1.2rem;
    background-color: red;
}
.center-fwq-body{
    height:54%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.center-fwq-FWQname{
    height:22%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.left-fwq,.right-fwq{
    background-color: #303840;
    width:33%;
    height:100%;
    display:grid;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.6)
}
.fwq-ltdwd,.fwq-rtdwd{
    display: flex;
    justify-content: center;
    align-items: center;
}
.top-ltd{
    justify-content: start;
    display:grid;
    padding:0.2rem;
}
.bottom-ltd{
    display:grid;
    padding:0.2rem;
}
.top-rtd{
    display:grid;
}
.bottom-rtd{
    display:grid;
}
.mid-fwq{
    background-color: #b5c5dc;
    width:8%;
    height:100%;
    display: grid;
    justify-content: center;
    align-items: center;
}
.center-fwq-rtd{
    width:12%;
    height:100%;
    display: grid;
    justify-content: center;
    align-items: center;
}
.tem-pic{
    height:1.2rem;
    width:1.2rem;
}
.tem-num{
    font-size: 0.7rem;
    color:#73A8E8;
    font-weight: 900;
}
.fwqName{
    height:1rem;
    display:flex;
    align-items: center;
    justify-content: center;
}
</style>