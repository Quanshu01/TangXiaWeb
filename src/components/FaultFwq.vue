<template>
    <div id="pre-fwq">
        <!-- 故障检测 服务器上方空调 -->
        <div class="fault-top-kt">
            <fault-fwq-kt v-if=JF[fwqId-1].ktTop[0] :ktId=JF[fwqId-1].ktTop[0] :values=ktdataall[JF[fwqId-1].ktTop[0]] :unstbKT=ktList></fault-fwq-kt>
            <fault-fwq-kt v-if=JF[fwqId-1].ktTop[1] :ktId=JF[fwqId-1].ktTop[1] :values=ktdataall[JF[fwqId-1].ktTop[1]] :unstbKT=ktList></fault-fwq-kt>
        </div>

        <!-- 故障检测 服务器主体 -->
        <div class="fault-fwq-body">
            <!-- 故障检测 服务器名 -->
            <div class="fault-fwqname">
                <div class="fault-fwq-rtd"></div>
                
                <div class="fault-left-fwq">
                    <div style="font-size: 1rem;font-weight: 800;color:#4DBD65;">{{JF[fwqId-1].fwqLeft}}</div>
                </div>
                <div class="fault-mid-fwq"></div>
                <div class="fault-right-fwq">
                    <div style="font-size: 1rem;font-weight: 800;color:#4DBD65;">{{ JF[fwqId-1].fwqRight }}</div>
                </div>

                <div class="fault-fwq-rtd"></div>
            </div>
            <!-- 故障检测 服务器数据体 -->
            <div class="fault-fwqbody">
                <div class="fault-fwq-rtd" v-if="Big=='0'"></div>
                <!-- 故障检测 大图 服务器左 热通道 -->
                <el-tooltip class="item" effect="dark" content="热通道" placement="top" v-if="Big=='1'">
                    <div class="fault-fwq-rtd" v-if="Big=='1'">
                        <div class="mid-fwq-fault">
                            <div v-for="n in fwqfaultrtdwdbig[JF[fwqId-1].fwdLeftindex].length" :key="n.index">
                                <fault-block :faultData=fwqfaultrtdwdbig[JF[fwqId-1].fwdLeftindex][n-1]></fault-block>
                            </div>
                        </div>
                    </div>
                </el-tooltip>

                <!-- 故障检测 小图 服务器左 冷热通道异常数 -->
                <div class="fault-left-fwq2" v-if="Big=='0'">
                    <fault-temp :colorIndex="0" v-if=fwqltdwdsmall[JF[fwqId-1].fwdLeftindex][0] :tempCnt=fwqltdwdsmall[JF[fwqId-1].fwdLeftindex][0]></fault-temp>
                    <fault-temp :colorIndex="1" v-if=fwqrtdwdsmall[JF[fwqId-1].fwdLeftindex] :tempCnt=fwqrtdwdsmall[JF[fwqId-1].fwdLeftindex]></fault-temp>
                    <fault-temp :colorIndex="0" v-if=fwqltdwdsmall[JF[fwqId-1].fwdLeftindex][1] :tempCnt=fwqltdwdsmall[JF[fwqId-1].fwdLeftindex][1]></fault-temp>
                </div>

                <!-- 故障检测 大图 服务器左 冷通道 上下 异常数 -->
                <el-tooltip class="item" effect="dark" content="冷通道" placement="top" v-if="Big=='1'">
                    <div class="fault-left-fwq" v-if="Big=='1'">
                        <div class="top-fwq-fault">
                            <div v-for="n in fwqfaultltdwdbig[JF[fwqId-1].fwdLeftindex][0].length" :key="n.index">
                                <fault-block :faultData=fwqfaultltdwdbig[JF[fwqId-1].fwdLeftindex][0][n-1]></fault-block>
                            </div>
                        </div>
                        <div class="btm-fwq-fault">
                            <div v-for="n in fwqfaultltdwdbig[JF[fwqId-1].fwdLeftindex][1].length" :key="n.index">
                                <fault-block :faultData=fwqfaultltdwdbig[JF[fwqId-1].fwdLeftindex][1][n-1]></fault-block>
                            </div>
                        </div>
                    </div>
                </el-tooltip>


                <div class="fault-mid-fwq"></div>

                <!-- 故障检测 小图 服务器右 冷热通道异常数 -->
                <div class="fault-right-fwq2"  v-if="Big=='0'">
                    <fault-temp :colorIndex="0" v-if=fwqltdwdsmall[JF[fwqId-1].fwdrightindex][0] :tempCnt=fwqltdwdsmall[JF[fwqId-1].fwdrightindex][0]></fault-temp>
                    <fault-temp :colorIndex="1" v-if=fwqrtdwdsmall[JF[fwqId-1].fwdrightindex] :tempCnt=fwqrtdwdsmall[JF[fwqId-1].fwdrightindex]></fault-temp>
                    <fault-temp :colorIndex="0" v-if=fwqltdwdsmall[JF[fwqId-1].fwdrightindex][1] :tempCnt=fwqltdwdsmall[JF[fwqId-1].fwdrightindex][1]></fault-temp>
                </div>
                <!-- 故障检测 大图 服务器右 冷通道 上下 异常数 -->
                <el-tooltip class="item" effect="dark" content="冷通道" placement="top">
                    <div class="fault-right-fwq"  v-if="Big=='1'">
                        <div class="top-fwq-fault">
                            <div v-for="n in fwqfaultltdwdbig[JF[fwqId-1].fwdrightindex][0].length" :key="n.index">
                                <fault-block :faultData=fwqfaultltdwdbig[JF[fwqId-1].fwdrightindex][0][n-1]></fault-block>
                            </div>
                        </div>
                        <div class="btm-fwq-fault">
                            <div v-for="n in fwqfaultltdwdbig[JF[fwqId-1].fwdrightindex][1].length" :key="n.index">
                                <fault-block :faultData=fwqfaultltdwdbig[JF[fwqId-1].fwdrightindex][1][n-1]></fault-block>
                            </div>
                        </div>
                    </div>
                </el-tooltip>

                <!-- 故障检测 大图 服务器右 热通道 -->
                <el-tooltip class="item" effect="dark" content="热通道" placement="top" v-if="Big=='1'">
                    <div class="fault-fwq-rtd" v-if="Big=='1'">
                        <div class="mid-fwq-fault">
                            <div v-for="n in fwqfaultrtdwdbig[JF[fwqId-1].fwdrightindex].length" :key="n.index">
                                <fault-block :faultData=fwqfaultrtdwdbig[JF[fwqId-1].fwdrightindex][n-1]></fault-block>
                            </div>
                        </div>
                    </div>
                </el-tooltip>
                <div class="fault-fwq-rtd"  v-if="Big=='0'"></div>
            </div>
        </div>

        <!-- 故障检测 服务器下方空调 -->
        <div class="fault-bottom-kt">
            <fault-fwq-kt v-if=JF[fwqId-1].ktBottom[0] :ktId=JF[fwqId-1].ktBottom[0] :values=ktdataall[JF[fwqId-1].ktBottom[0]] :unstbKT=ktList></fault-fwq-kt>
            <fault-fwq-kt v-if=JF[fwqId-1].ktBottom[1] :ktId=JF[fwqId-1].ktBottom[1] :values=ktdataall[JF[fwqId-1].ktBottom[1]] :unstbKT=ktList></fault-fwq-kt>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FaultKt from './FaultKt.vue';
import FaultTemp from './FaultTemp.vue';
import FaultBlock from './FaultBlock.vue'

export default {
    name: "FaultFwq",
    props: {
        'fwqId':{
            type:Number,
            default:0,
        },
        'Big':{
            type:Number,
            default:0,
        },
    },
    data() {
        return {
            timer:"",
            JF:[],
            ktList:[],
            fwqlist:[],
            ktdataall:[],
            faultdata:[],
            fwqltdwdsmall:[],
            fwqrtdwdsmall:[],
            fwqfaultltdwdbig:[],
            fwqfaultrtdwdbig:[],
        }
    },
    components:{
        'fault-fwq-kt':FaultKt,
        'fault-temp':FaultTemp,
        'fault-block':FaultBlock
    },
    methods:{
        changeJFinfo(){
            if(this.JFname=="201"){
                this.JF=this.global.JF201
                this.fwqlist=this.global.JF201FWQlist
                this.fwqdoublelist=this.global.JF201FWQ
                this.JFktNum=this.global.JF201KTnum
            }
            if(this.JFname=="202"){
                this.JF=this.global.JF202
                this.fwqlist=this.global.JF202FWQlist
                this.fwqdoublelist=this.global.JF202FWQ
                this.JFktNum=this.global.JF202KTnum
            }
            if(this.JFname=="203"){
                this.JF=this.global.JF203
                this.fwqlist=this.global.JF203FWQlist
                this.fwqdoublelist=this.global.JF203FWQ
                this.JFktNum=this.global.JF203KTnum
            }
            if(this.JFname=="204"){
                this.JF=this.global.JF204
                this.fwqlist=this.global.JF204FWQlist
                this.fwqdoublelist=this.global.JF204FWQ
                this.JFktNum=this.global.JF204KTnum
            }
            if(this.JFname=="205"){
                this.JF=this.global.JF205
                this.fwqlist=this.global.JF205FWQlist
                this.fwqdoublelist=this.global.JF205FWQ
                this.JFktNum=this.global.JF205KTnum
            }
        },
        uniqArr(arr) { //去重
            var newArr = new Set(arr)
            return Array.from(newArr)
        },
        sum(arr) { // 求和
            var sum = 0;
            for (var i = 0; i < arr.length; i++) {
                if(arr[i]!=-1){
                    sum += arr[i];
                }
            }
            return sum;
        },
        countFre(list){ // 统计字典某一项出现次数
            var map = new Map();
            var entry = null;
            for(var item of list){
                if(!map.has(item['params']))
                    map.set(item['params'], {params: item['params']});

                entry = map.get(item['params']);

                if(Object.prototype.hasOwnProperty.call(entry, item['fwq']))
                    entry[item['fwq']] = entry[item['fwq']] + 1;
                else
                    entry[item['fwq']] = 1;
            }
            return Array.from(map.values());
        },
        getkt(){
            this.ktdataall=this.$store.state.ktdataall;
            console.log('this.ktdataall',this.ktdataall)
        },
        getserverfaulttable(){
            this.faultdata=this.$store.state.faultdata;
        },
        getUnstableKT(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/kt_stable",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios kt_stable',Response.data)
                    this.faultdata=[]
                    this.ktList=[]
                    for(var i=0;i<Response.data.length;i++){
                        var temp = Response.data[i]
                        var tempTabledata = {}
                        tempTabledata['kt']=temp['kt'].slice(2,3)
                        this.ktList.push(Number.parseInt(temp['kt'].slice(2,3)))
                        tempTabledata['detail']=temp['detail']
                        this.faultdata.push(tempTabledata)
                    }
                    this.ktList = this.uniqArr(this.ktList)
                },
                Error=>{
                    console.log('axios kt_stable error',Error)
                }
            );
        },
        getfwq(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/server_display",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios server_display',Response.data)

                    this.fwqltdwdsmall=[]
                    this.fwqrtdwdsmall=[]
                    this.fwqfaultltdwdbig=[]
                    this.fwqfaultrtdwdbig=[]
                    // 故障检测服务器 冷通道温度 大图小图数据获取
                    for(var j=0;j<(Object.keys(Response.data[0]['servercold']).length);j++){
                        var fwqltdwdbig=Response.data[0]['servercold'][this.fwqlist[j]]['sitedetail']
                        var fwqltdwdbigTop = Object.values(fwqltdwdbig['up'])
                        var fwqltdwdbigBottom = Object.values(fwqltdwdbig['down'])
                        this.fwqfaultltdwdbig.push([fwqltdwdbigTop,fwqltdwdbigBottom])

                        var fwqTop = this.sum(fwqltdwdbigTop)
                        var fwqBtm = this.sum(fwqltdwdbigBottom)
                        this.fwqltdwdsmall.push([fwqTop,fwqBtm])
                    }
                    // 故障检测服务器 热通道温度 大图小图数据获取
                    for(j=0;j<(Object.keys(Response.data[0]['serverhot']).length);j++){
                        var fwqrtdwdbig=Response.data[0]['serverhot'][this.fwqlist[j]]['sitedetail']
                        this.fwqfaultrtdwdbig.push(Object.values(fwqrtdwdbig))
                        this.fwqrtdwdsmall.push(this.sum(Object.values(fwqrtdwdbig)))
                    }
                },
                Error=>{
                    console.log('axios server_display',Error)
                }
            );
        },
    },
    mounted(){
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getkt()
        this.getfwq()
        this.getserverfaulttable()
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.getkt()
            this.getfwq()
            this.getserverfaulttable()
        },83291)
    },
    created () {
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getkt()
        this.getfwq()
        this.getserverfaulttable()
    }
}
</script>

<style>
#pre-fwq{
    margin:0.2rem;
    width:96%;
    height:100%;
}
.fault-top-kt,.fault-bottom-kt{
    width:100%;
    height:26%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fault-fwq-body{
    height:48%;
    justify-content: center;
    align-items: center;
}
.fault-fwqbody{
    height:80%;
    width: 96%;
    display:flex;
}
.fault-fwqname{
    height:20%;
    width: 96%;
    display:flex;
}
.fault-left-fwq,.fault-right-fwq{
    background-color: #303840;
    width:35%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
}
.fault-left-fwq2,.fault-right-fwq2{
    background-color: #303840;
    width:35%;
    height:100%;
    justify-content: center;
    align-items: center;
}
.top-fwq-fault,.btm-fwq-fault{
    width:40%;
    height:96%;
    margin:5%;
    background-color: #272E34;
    display:grid;
    justify-content: center;
    align-items: center;
}
.fault-mid-fwq{
    background-color: #93acbb;
    width:10%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fault-fwq-rtd{
    width:15%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fault-mid-fwq2{
    background-color: #93acbb;
    width:10%;
    height:100%;
    justify-content: center;
    align-items: center;
}
.mid-fwq-fault{
    width:40%;
    height:96%;
    margin:5%;
    background-color: #F3F3F3;
    display:grid;
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
</style>