<template>
    <el-table
        class="fwq-abnormal" :style="styleVar" :data="faultdata"
        size="mini" height="98%" border stripe style="width: 100%"
        header-align="center" ref="filterTable">
        <el-table-column
            prop="params"
            label="异常项"
            width="125"
            :filters="[{ text: '冷通道温度', value: '冷通道温度' }, { text: '热通道温度', value: '热通道温度' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                    :type="scope.row.params === '冷通道温度' ? 'primary' : '热通道温度' ? 'danger' : 'success'"
                    disable-transitions effect="light"> {{scope.row.params}}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column
            prop="fwq"
            label="服务器名"
            width="90"
            :filters=fwqList
            :filter-method="filterTag2">
        </el-table-column>
        <el-table-column
            prop="detail"
            label="异常值"
            width="">
        </el-table-column>
        <el-table-column
            prop="cite"
            label="测点位置"
            width="100">
        </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            faultdata:[],
            fwqlist:[],
            fwqList:[],
        }
    },
    props:{
        'fontSize':{
            type:Number,
            default:0.5,
        }
    },
    computed:{
        styleVar(){
            return{
                '--fwq-ab-fontSize':this.fontSize+'rem',
            }
        }
    },
    created () {
        this.getfaultdata()
        this.setfwqList()
    },
    mounted(){
        this.getfaultdata()
        this.setfwqList()
        this.timer=setInterval(()=>{
            this.getfaultdata()
            this.setfwqList()
        },83789)
    },
    methods:{
        filterTag(value, row) {
            return row.params === value;
        },
        filterTag2(value, row) {
            return row.fwq === value;
        },
        setfwqList(){
            this.fwqList=[]
            for(var i=0;i<this.fwqlist.length;i++){
                // console.log('setfwqList',this.fwqlist[i])
                var singleFWQ={}
                singleFWQ['text'] = this.fwqlist[i]
                singleFWQ['value'] = this.fwqlist[i]
                this.fwqList.push(singleFWQ)
            }
        },
        getfaultdata(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/server_diagnosis",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios server_diagnosis',Response.data)
                    this.faultdata=[]
                    for(var i=0;i<Response.data.length;i++){
                        var temp = Response.data[i]
                        var tempTabledata = {}
                        tempTabledata['params']=temp['PointName']
                        tempTabledata['fwq']=temp['Equipment'].slice(3,4)
                        tempTabledata['detail']=temp['Value0']
                        tempTabledata['cite']=temp['SiteName']
                        this.faultdata.push(tempTabledata)
                    }
                },
                Error=>{
                    console.log('axios server_diagnosis error',Error)
                }
            );
        },
    },
}
</script>

<style>
.fwq-abnormal{
    font-size:var(--fwq-ab-fontSize);
}
</style>