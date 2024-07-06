<template>
    <el-table class="aicommand-table" :data="cmddata" size="mini" height="100%"
        border stripe style="width: 100%" header-align="center" ref="filterTable">
        <!-- <el-table-column
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
        </el-table-column> -->
        <el-table-column
            prop="kt"
            label="空调"
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
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aicmd",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios aicmd',Response.data)

                    this.cmddata=[]
                    for(var i=0;i<Response.data.length;i++){
                        var temp={ command:Response.data[i].CommandType,
                                    kt:Response.data[i].Equipment,
                                    detail:Response.data[i].CommandContent+Response.data[i].ChangedValue+"°C",
                                    time:Response.data[i].time }
                        // 保底指令修改获取频率
                        if(Response.data[i].CommandType=="保底控制"){
                            this.ifHotPoint = true
                            // this.frequence = 3003 试图控制频率保底指令失败
                        }
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