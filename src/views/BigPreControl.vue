<template>
    <div id="big-pre-control">
        <div class="bigscreen-top">
            <div></div>
            <div class="bigscreen-title-info">
                <div class="bigscreen-title-name">
                    AI策略显示
                </div>
                <div class="bigscreen-title-text">
                    AI算法下发指令可视化显示
                </div>
            </div>
            <div>
                <div class="bigscreen-close">
                    <el-tooltip class="close-button" effect="light" content="关闭大图" placement="top">
                        <i @click="closeModal" class="el-icon-close"></i>
                    </el-tooltip>
                </div>
            </div>
        </div>
        
        <!-- 大图 服务器 -->
        <div class="big-prectl-fwqNkt">
            <div class="big-prectl-fwq" v-for="n in JF.length" :key="n.index">
                <fwq :fwqId="n" :ifbig="true"></fwq>
            </div>
        </div>
    </div>
</template>

<script>
import PreConFwq from '../components/PreConFwq.vue';

export default {
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
        'fwq':PreConFwq,
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
        },74518)
    },
    methods: {
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
        getpreConltdwd(){
            this.ktChangedValue=this.$store.state.ktChangedValue;
            this.ktChangedSFValue=this.$store.state.ktChangedSFValue;
            this.preltdmax=this.$store.state.preltdmax;
            this.ifprecmd=this.$store.state.ifprecmd;
        },
        closeModal: function () {
            this.$FModal.hide();
        },
        getktdata() {
            this.ktdataall=this.$store.state.ktdataall;
        }
    },
    computed: {
    },
}
</script>

<style>
#big-pre-control{
    min-width:90vw;
    padding:1rem;
    height: 91vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.bigscreen-top{
    width:97%;
    padding:0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.bigscreen-title-info{
    display: grid;
    align-items: center;
    justify-content: center;
    padding:0.6% 3%;
    border-radius: 1rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.bigscreen-title-name{
    font-size: 1.2rem;
    font-weight: 800;
}
.bigscreen-title-text{
    font-size: 0.8rem;
    font-weight: 300;
    color:grey;
}
.bigscreen-close{
    display: grid;
    align-items: center;
    justify-content: center;
    height:60%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    border-radius: 50%;
}
.big-prectl-fwqNkt{
    height:80vh;
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
}
.precon-big-fwqNkt{
    padding:0 2rem;
    width:95%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.big-prectl-fwq{
    height:76vh;
    width:100%;
    padding:0.2rem;
    display:flex;
    justify-content: center;
    align-items: center;
}
</style>