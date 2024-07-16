<template>
    <el-table class="aicommand-table" :data="cmddata" size="mini" height="100%"
        border stripe style="width: 100%" header-align="center" ref="filterTable">
        <el-table-column
            prop="kt"
            label="空调"
            width="60">
        </el-table-column>
        <el-table-column
            prop="detail"
            label="指令"
            width="90">
        </el-table-column>
        <el-table-column
            prop="time"
            label="时间"
            width="">
        </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            cmddata:[],
            ifHotPoint:false,
        }
    },
    created () {
        this.getaicmddata()
    },
    mounted(){
        this.timer=setInterval(()=>{
            this.getaicmddata()
        },86977)
    },
    methods: {
        filterTag(value, row) {
            return row.command === value;
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
</style>