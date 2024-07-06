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
    },
    methods:{
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