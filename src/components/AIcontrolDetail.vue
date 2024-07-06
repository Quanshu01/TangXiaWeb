<template>
    <div id="aicontrol-detail">
        <el-table size="mini" class="aicontrol-table" :data="aiparamsall" 
                height="90%"  style="width: 100%">
            <el-table-column fixed prop="key" label="算法参数" width=""></el-table-column>
            <el-table-column prop="value" label="数据" width="100"></el-table-column>
            <el-table-column label="修改" width="50">
                <template slot-scope="scope">
                    <el-button class="click2edit" size="mini" icon="el-icon-edit"
                        @click="handleEdit(scope.row.id)"
                        ></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            append-to-body
            title="修改AI控制参数" width="40%"
            :visible.sync="dialogFormVisible"
            :before-close="handleClose">
            <el-form :model="form1">
                <el-form-item v-if="changeId=='1'" :label=jsondataKey[0] prop="data" :label-width="120">
                    <el-input v-model="form1[0]" autocomplete="off">
                        <i slot="suffix" style="margin-right: 10px;">°C</i>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="changeId=='2'" :label=jsondataKey[1] prop="data" :label-width="120">
                    <el-input v-model="form1[1]" autocomplete="off">
                        <i slot="suffix" style="margin-right: 10px;">°C</i>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="changeId=='3'" :label=jsondataKey[2] prop="data" :label-width="120">
                    <el-input v-model="form1[2]" autocomplete="off">
                        <i slot="suffix" style="margin-right: 10px;">分钟</i>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="changeId=='4'" :label=jsondataKey[3] prop="data" :label-width="120">
                    <el-input v-model="form1[3]" autocomplete="off">
                        <i slot="suffix" style="margin-right: 10px;">°C</i>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="changeId=='5'" :label=jsondataKey[4] prop="data" :label-width="120">
                    <el-input v-model="form1[4]" autocomplete="off">
                        <i slot="suffix" style="margin-right: 10px;">°C</i>
                    </el-input>
                </el-form-item>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="toComfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            timer:"",
            changeId:'',
            aiparams:{},
            dialogFormVisible:false,
            aiparamsall: [],
            form1:[],
            role:"",
            jsondataKey:['热点检查阈值', 'AI群控控制范围', 'AI群控控制周期', '送风上阈值', '送风下阈值'],
        }
    },
    created () {
        this.role = this.global.roles[(JSON.parse(window.sessionStorage.getItem("user")))['role']]
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getaiparams()
    },
    mounted(){
        this.role = this.global.roles[(JSON.parse(window.sessionStorage.getItem("user")))['role']]
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getaiparams()
    },
    methods: {
        handleEdit(rowId) {
            if(this.role=="超管员"){
                this.dialogFormVisible = true
                this.changeId = rowId;
            }
            else{
                this.$notify({
                    title: '无权限修改AI参数',
                    message: ('您是'+this.role+' 无权限修改AI控制参数')
                });
            }
        },
        toComfirm() {
            this.saveTempAiParams()
            this.dialogFormVisible = false;
        },
        handleClose() {
            this.dialogFormVisible = false;
        },
        getaiparams(){
            axios.get(this.global.apiURL+this.global.ports[this.JFname]+"/getData/"+this.JFname+"/aiparams",{
                headers:{
                    'token':window.sessionStorage.getItem("token")
                },
            }).then(
                Response=>{
                    this.$store.commit('SET_AIPARAMS', Response.data); // 将AI参数保存到 Vuex
                    this.form1=Object.values(Response.data)
                    this.jsondataKey=Object.keys(Response.data)
                    this.aiparamsall=[]
                    for(var i=0;i<this.form1.length;i++){
                        var aiparam={}
                        aiparam['id']=i+1
                        aiparam['key']=this.jsondataKey[i]
                        aiparam['value']=this.form1[i]
                        this.aiparamsall.push(aiparam)
                    }
                    // console.log('AICTL ',this.form1)

                }
            )
        },
        saveTempAiParams() {
            // console.log('AICTL close edit dialog this.form1',this.form1)

            var postdata={}
            for(var i=0;i<this.form1.length;i++){
                postdata[this.jsondataKey[i]]=this.form1[i]
            }
            this.$store.commit('SET_AITEMPPARAMS', postdata); // 将暂时修改AI参数保存到 Vuex
            // console.log('AICTL close edit dialog save temp aipaams',postdata)

            this.aiparamsall=[]
            for(i=0;i<this.form1.length;i++){
                var aiparam={}
                aiparam['id']=i+1
                aiparam['key']=this.jsondataKey[i]
                aiparam['value']=this.form1[i]
                this.aiparamsall.push(aiparam)
            }
            // console.log('AICTL close edit dialog table aipaams',this.aiparamsall)
            
        }
    },
}
</script>

<style>
#aicontrol-detail{
    height:35vh;
    width:100%;
}
.aicontrol-params-card{
    font-size: 0.8rem;
    overflow-y: scroll;
    height:18vh;
    text-align: center;
    padding:0 1rem;
}
.aicontrol-params-keys{
    font-size: 0.8rem;
    font-weight: 500;
    zoom:0.8;
}
.aicontrol-params-values{
    font-size: 0.6rem;
    font-weight: 300;
    zoom:0.8;
}
.aicontrol-table{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size:0.7rem;
}
.click2edit{
    margin:0.1rem;
    padding:0.2rem;
    border-radius: 0.5rem;
}
.sfArea{
    margin:2%;
}
</style>