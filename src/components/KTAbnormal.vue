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
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getfaultdata()
        setTimeout(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.getfaultdata()
        },100000)
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