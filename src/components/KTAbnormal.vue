<template>
    <el-table
        class="kt-abnormal" :style="styleVar" :data="faultdata"
        size="mini" border stripe height="98%" header-align="center">
        <el-table-column
            prop="kt"
            label="空调"
            width="50">
        </el-table-column>
        <el-table-column
            prop="params"
            label="异常项"
            width="">
        </el-table-column>
        <el-table-column
            prop="detail"
            label="异常值"
            width="60">
        </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            faultdata:[],
            tableData: [
                {
                    params: '送风温度',
                    kt: '1',
                    detail:'28',
                },
                {
                    params: '回风温度',
                    kt: '10',
                    detail:'18',
                },
                {
                    params: '风机转速',
                    kt: '1',
                    detail:'0',
                },
            ]
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
                '--kt-ab-fontSize':this.fontSize+'rem',
            }
        }
    },
    mounted(){
        this.getfaultdata()
        setTimeout(()=>{
            this.getfaultdata()
        },100000)
    },
    methods:{
        getfaultdata(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/kt_diagnosis",
            {
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    // console.log('axios kt_diagnosis',Response.data)
                    this.faultdata=[]
                    for(var i=0;i<Response.data.length;i++){
                        var temp = Response.data[i]
                        var tempTabledata = {}
                        tempTabledata['params']=temp['PointName']
                        tempTabledata['kt']=temp['Equipment'].slice(2,4)
                        tempTabledata['detail']=temp['Value0']
                        this.faultdata.push(tempTabledata)
                    }
                },
                Error=>{
                    console.log('axios kt_diagnosis error',Error)
                }
            );
        },
    },

}
</script>

<style>
.kt-abnormal{
    font-size:var(--kt-ab-fontSize);
}
</style>