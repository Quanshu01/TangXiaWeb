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
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getfaultdata()
        this.setfwqList()
    },
    mounted(){
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getfaultdata()
        this.setfwqList()
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.getfaultdata()
            this.setfwqList()
        },83789)
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
            this.faultdata=this.$store.state.faultdata;
        },
    },
}
</script>

<style>
.fwq-abnormal{
    font-size:var(--fwq-ab-fontSize);
}
</style>