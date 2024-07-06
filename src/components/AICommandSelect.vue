<template>
    <div class="select-aicmd">
        <!-- <div class="chosentime-aicmd">
            <el-date-picker
                v-model="value1"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="changeDate()">
            </el-date-picker>
        </div>
        <div class="chosenkt-aicmd">
            <div>
                <el-button-group  v-for="n in JFktNum" :key="n.index">
                    <el-button class="click2KT" size="mini" @click="chooseKT($event)">空调 {{n}}</el-button>
                </el-button-group>
            </div>
        </div> -->
        <div class="aicmd-data">
            <el-table class="aicommand-table" :data="cmddata" size="mini" height="100%"
            border stripe style="width: 100%" header-align="center" ref="filterTable">
            <el-table-column
                prop="command"
                label="指令"
                width="106"
                :filters="[{ text: '保底控制', value: '保底控制' }, { text: '群控控制', value: '群控控制' }, { text: '预控控制', value: '预控控制' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.command === '保底控制' ? 'success' : ('群控控制' ? 'warning' : 'primary')"
                        disable-transitions effect="light">{{scope.row.command}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="kt"
                label="空调"
                :filters=ktList
                :filter-method="filterKT"
                width="65">
            </el-table-column>
            <el-table-column
                prop="detail"
                label="详情"
                width="140">
            </el-table-column>
            <el-table-column
                prop="time"
                label="时间"
                width="">
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            JFktNum:10,
            chosenKT:'1',
            chosenTime:['-1','-1'],
            value1:'',
            cmddata:[],
            ktList:[]
        }
    },
    created () {
        this.setktList()
        this.getaicmdselectdata()
    },
    mounted(){
        this.timer=setInterval(()=>{
            this.setktList()
            this.getaicmdselectdata()
        },63055)
    },
    methods: {
        setktList(){
            this.ktList = []
            for(var i=1;i<this.JFktNum+1;i++){
                var singleKT={}
                singleKT['text'] = "空调"+JSON.stringify(i)
                singleKT['value'] = "空调"+JSON.stringify(i)
                this.ktList.push(singleKT)
            }
        },
        filterTag(value, row) {
            return row.command === value;
        },
        filterKT(value, row) {
            return row.kt === value;
        },
        chooseKT: function(e) {
            this.KT=Number.parseInt(e.target.innerText.slice(2,5))-1;
            // console.log('big aicmd',this.KT)
        },
        changeDate(){
            this.chosenTime = this.value1.slice(0,2) //['2023-03-06', '2023-03-09']
            // console.log('big aicmd',this.chosenTime)
            // console.log('big aicmd',[this.KT,this.chosenTime])
        },
        getaicmdselectdata(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aicmd_history",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios aicmd',Response.data)

                    this.cmddata=[]
                    for(var i=0;i<Response.data.length;i++){
                        var temp={command:Response.data[i].CommandType,kt:Response.data[i].Equipment,detail:Response.data[i].CommandContent+Response.data[i].ChangedValue+"°C",time:Response.data[i].time}
                        this.cmddata.push(temp)
                    }
                },
                Error=>{
                    console.log(this.JFname+' JF dont get! - aicmd',Response.message)
                    this.resbody = Error.message
                }
            );
        },
    },
}
</script>

<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
.aicommand-table{
    font-size:0.7rem;
}
.el-tag{
    padding:0 0.8rem;
    font-size: 0.65rem;
    height:1.6rem;
    line-height: 1.6rem;
}
.chosentime-aicmd{
    padding: 0.5rem 0;
}
.chosenkt-aicmd{
    padding: 0.5rem 0;
}
.click2KT{
    font-size:0.6vw;
    padding:0.6vh 0.5vw;
}
.aicmd-data{
    height:40vh;
}
</style>