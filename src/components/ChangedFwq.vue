<template>
    <div id="changed-fwq">
        <div class="fwq-title">
            <div class="left-hp">
                <div class="hotrisk-singlefwq" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;padding:1rem">{{ JF[fwqId-1].fwqLeft }}</div>
            </div>
            <div class="mid-hp">
            </div>
            <div class="right-hp">
                <div class="hotrisk-singlefwq" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;padding:1rem">{{ JF[fwqId-1].fwqRight }}</div>
            </div>
        </div>
        <div class="fwq-body">
            <div class="left-hp">
                <div class="fwq-risk">
                    <div class="top-risk">
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdLeftindex][0].length" :key="n.index">
                            <changed-block v-if=ifBig :riskData=hotpointriskall[JF[fwqId-1].fwdLeftindex][0][n-1] :riskDataHeight=1.6 :riskDataWidth=1.6></changed-block>
                        </div>
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdLeftindex][0].length" :key="n.index">
                            <changed-block v-if="ifBig===false" :iftext=false :riskData=hotpointriskall[JF[fwqId-1].fwdLeftindex][0][n-1]></changed-block>
                        </div>
                    </div>
                    <div class="bottom-risk">
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdLeftindex][1].length" :key="n.index">
                            <changed-block v-if=ifBig :riskData=hotpointriskall[JF[fwqId-1].fwdLeftindex][1][n-1] :riskDataHeight=1.6 :riskDataWidth=1.6></changed-block>
                        </div>
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdLeftindex][1].length" :key="n.index">
                            <changed-block v-if="ifBig===false" :iftext=false :riskData=hotpointriskall[JF[fwqId-1].fwdLeftindex][1][n-1]></changed-block>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mid-hp">
            </div>
            <div class="right-hp">
                <div class="fwq-risk">
                    <div class="top-risk">
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdrightindex][0].length" :key="n.index">
                            <changed-block v-if=ifBig :riskData=hotpointriskall[JF[fwqId-1].fwdrightindex][0][n-1] :riskDataHeight=1.6 :riskDataWidth=1.6></changed-block>
                        </div>
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdrightindex][0].length" :key="n.index">
                            <changed-block v-if="ifBig===false" :iftext=false :riskData=hotpointriskall[JF[fwqId-1].fwdrightindex][0][n-1]></changed-block>
                        </div>
                    </div>
                    <div class="bottom-risk">
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdrightindex][1].length" :key="n.index">
                            <changed-block v-if=ifBig :riskData=hotpointriskall[JF[fwqId-1].fwdrightindex][1][n-1] :riskDataHeight=1.6 :riskDataWidth=1.6></changed-block>
                        </div>
                        <div v-for="n in hotpointriskall[JF[fwqId-1].fwdrightindex][1].length" :key="n.index">
                            <changed-block v-if="ifBig===false" :iftext=false :riskData=hotpointriskall[JF[fwqId-1].fwdrightindex][1][n-1]></changed-block>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ChangedBlock from '../components/ChangedBlock.vue'

export default {
    props: ['fwqId','ifBig'],
    components:{
        'changed-block':ChangedBlock,
    },
    data() {
        return {
            JF:[],
            fwqlist:[],
            hotpointriskall:[],
            colorList: ['#67C23A','#E6A23C','#F56C6C'],
        }
    },
    mounted(){
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.gethotpointrisk()
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.gethotpointrisk()
        },72374)
    },
    created () {
        this.gethotpointrisk()
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.gethotpointrisk()
        
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
        gethotpointrisk() {
            this.hotpointriskall=this.$store.state.hotpointriskall;
        },


    },
}
</script>

<style>
#changed-fwq{
    margin:0.1rem;
    width:100%;
    height:100%;
}
.fwq-title{
    margin:0.2rem 1rem 0 0;
    width:98%;
    height:15%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fwq-body{
    margin:0 0 0 0;
    width:98%;
    height:82%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.left-hp,.right-hp{
    background-color: #303840;
    width:38%;
    height:100%;
    display:grid;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.6)
}
.mid-hp{
    background-color: #93acbb;
    width:20%;
    height:100%;
    display: grid;
    justify-content: center;
    align-items: center;
}
.hotrisk-singlefwq{
    height:1rem;
    display:flex;
    align-items: center;
}
.fwq-risk{
    display: flex;
    justify-content: center;
    align-items: center;
}
.top-risk,.bottom-risk{
    display: grid;
    padding:0.1rem;
}
</style>