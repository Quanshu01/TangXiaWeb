<template>
    <div class="pre-control">
        <div class="pre-con-fwdNkt">
            <div class="pre-con-fwq" v-for="n in JF.length" :key="n.index">
                <KeepAlive>
                    <precon-fwq :fwqId="n" :ifbig="false"></precon-fwq>
                </KeepAlive>
            </div>
        </div>
        <div class="big-btm">
            <el-tooltip class="item" effect="light" content="查看大图" placement="top-start">
                <el-button size="mini" class="go-big-view" icon="el-icon-zoom-in" @click="goBigPreControl"></el-button>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
import PreConFwq from '../components/PreConFwq.vue';
import BigPreControl from './BigPreControl.vue';

export default {
    name: "PreControl",
    data() {
        return {
            timer:"",
            JF:[],
            ktdataall:[],
            ktChangedValue:[],
            preltdmax:[],
        }
    },
    components:{
        'precon-fwq':PreConFwq,
    },
    created () {
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getktdata()
        this.getpreConltdwd()
    },
    mounted(){
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getktdata()
        this.getpreConltdwd()
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.getktdata()
            this.getpreConltdwd()
        },88654)
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
        getktdata() {
            this.ktdataall=this.$store.state.ktdataall
        },
        getpreConltdwd(){
            this.ktChangedValue=this.$store.state.ktChangedValue;
            this.ktChangedSFValue=this.$store.state.ktChangedSFValue;
            this.preltdmax=this.$store.state.preltdmax;
            this.ifprecmd=this.$store.state.ifprecmd;
        },
        goBigPreControl(){
            this.$FModal.show(
                { 
                    component: BigPreControl,
                    maxHeight: '100%',
                    width: '96%', 
                    height:'100%',
                    placement: 'center center'  
                },
            )
        },
    },
    computed: {
    },
}
</script>

<style>
.pre-control{
    width:100%;
    height:100%;
    display: block;
}
.pre-con-fwdNkt{
    width:97%;
    height: 96%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.pre-con-fwq{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width:100%;
    height: 90%;
}
.extend-fwqNkt{
    width:5%;
    height: 99%;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>