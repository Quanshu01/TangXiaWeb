<template>
    <div class="select-aicmd">
        <div class="aicmd-data">
            <el-table class="aicommand-table" :data="cmddata" size="mini" height="100%"
            border stripe style="width: 100%" header-align="center" ref="filterTable">
            <el-table-column
                prop="kt"
                label="空调"
                width="65">
            </el-table-column>
            <el-table-column
                prop="detail"
                label="指令"
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
        getaicmddata(){
            axios.get(this.global.apiURL+"/703display/optimization_data").then(
                Response=>{
                    this.cmddata=[]
                    for(var i=0;i<Response.data.length;i++){
                        var temp={
                                    kt:Response.data[i].equipment,
                                    detail:Response.data[i].strat,
                                    time:Response.data[i].time}
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