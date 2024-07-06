<template>
    <el-table
        class="unstable-kt" :style="styleVar" :data="faultdata"
        size="mini" height="100%" border stripe style="width: 100%" header-align="center">
        <el-table-column
            prop="kt"
            label="空调名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="detail"
            label="不稳定原因"
            width="">
        </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            faultdata:[],
            ktList:[],
        }
    },
    props:{
        'fontSize':{
            type:Number,
            default:0.55,
        }
    },
    computed:{
        styleVar(){
            return{
                '--kt-stb-fontSize':this.fontSize+'rem',
            }
        }
    },
    created(){
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
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
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/realdata/kt_stable",{
            }).then(
                Response=>{
                    // console.log('axios kt_stable',Response.data)
                    this.faultdata=[]
                    for(var i=0;i<Response.data.length;i++){
                        var temp = Response.data[i]
                        var tempTabledata = {}
                        tempTabledata['kt']=temp['kt'].slice(2,3)
                        tempTabledata['detail']=temp['detail']
                        this.faultdata.push(tempTabledata)
                    }
                },
                Error=>{
                    console.log('axios kt_stable error',Error)
                }
            );
        },
        uniqArr(arr) {
            var newArr = new Set(arr)
            return Array.from(newArr)
        },
    }

}
</script>

<style>
.unstable-kt{
    font-size:var(--kt-stb-fontSize);
}
</style>