<template>
    <div id="pre-fwq" v-if="ifprecmd">
        <div class="precon-top-kt">
            <precon-fwq-kt v-if=JF[fwqId-1].ktTop[0] :ktId=JF[fwqId-1].ktTop[0] :values=ktdataall[JF[fwqId-1].ktTop[0]]></precon-fwq-kt>
            <precon-fwq-kt v-if=JF[fwqId-1].ktTop[1] :ktId=JF[fwqId-1].ktTop[1] :values=ktdataall[JF[fwqId-1].ktTop[1]]></precon-fwq-kt>
        </div>
        <div class="precon-center-fwq">
            <div class="precon-left-fwq">
                <div class="temperature" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;padding:1rem">{{JF[fwqId-1].fwqLeft}}</div>
                </div>
                <div class="precon-mid-fwq">
                    <el-tooltip effect="dark" content="预测15分钟后的 冷通道最大温度" placement="top">
                    </el-tooltip>
                </div>
            <div class="precon-right-fwq">
                <div class="temperature" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;padding:1rem">{{ JF[fwqId-1].fwqRight }}</div>
            </div>
        </div>
        <div class="precon-bottom-kt">
            <precon-fwq-kt v-if=JF[fwqId-1].ktBottom[0] :ktId=JF[fwqId-1].ktBottom[0] :values=ktdataall[JF[fwqId-1].ktBottom[0]]></precon-fwq-kt>
            <precon-fwq-kt v-if=JF[fwqId-1].ktBottom[1] :ktId=JF[fwqId-1].ktBottom[1] :values=ktdataall[JF[fwqId-1].ktBottom[1]]></precon-fwq-kt>
        </div>
    </div>
    <div id="pre-fwq" v-else>
        <div class="precon-top-kt">
            <precon-fwq-kt v-if=JF[fwqId-1].ktTop[0] :ktId=JF[fwqId-1].ktTop[0] :values=ktdataall[JF[fwqId-1].ktTop[0]] :changedValue=ktChangedValue[JF[fwqId-1].ktTop[0]-1] :changedSFValue=ktChangedSFValue[JF[fwqId-1].ktTop[0]-1]></precon-fwq-kt>
            <precon-fwq-kt v-if=JF[fwqId-1].ktTop[1] :ktId=JF[fwqId-1].ktTop[1] :values=ktdataall[JF[fwqId-1].ktTop[1]] :changedValue=ktChangedValue[JF[fwqId-1].ktTop[1]-1] :changedSFValue=ktChangedSFValue[JF[fwqId-1].ktTop[1]-1]></precon-fwq-kt>
        </div>
        <div class="precon-center-fwq">
            <div class="precon-left-fwq">
                <div class="temperature" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;padding:1rem">{{JF[fwqId-1].fwqLeft}}</div>
                </div>
                <div class="precon-mid-fwq">
                    <ltd-temp v-if="ifbig===false" :ifpre=true :font-size="0.75" :pic="0.8" :realtime="0"></ltd-temp>
                    <el-tooltip effect="dark" content="预测15分钟后的 冷通道最大温度" placement="top">
                        <ltd-temp v-if="ifbig===true" :ifpre=true :font-size="1" :pic="1" :realtime="0"></ltd-temp>
                    </el-tooltip>
                </div>
            <div class="precon-right-fwq">
                <div class="temperature" style="font-size: 1.6rem;font-weight: 600;color:#4DBD65;padding:1rem">{{ JF[fwqId-1].fwqRight }}</div>
            </div>
        </div>
        <div class="precon-bottom-kt">
            <precon-fwq-kt v-if=JF[fwqId-1].ktBottom[0] :ktId=JF[fwqId-1].ktBottom[0] :values=ktdataall[JF[fwqId-1].ktBottom[0]] :changedValue=ktChangedValue[JF[fwqId-1].ktBottom[0]-1] :changedSFValue=ktChangedSFValue[JF[fwqId-1].ktBottom[0]-1]></precon-fwq-kt>
            <precon-fwq-kt v-if=JF[fwqId-1].ktBottom[1] :ktId=JF[fwqId-1].ktBottom[1] :values=ktdataall[JF[fwqId-1].ktBottom[1]] :changedValue=ktChangedValue[JF[fwqId-1].ktBottom[1]-1] :changedSFValue=ktChangedSFValue[JF[fwqId-1].ktBottom[1]-1]></precon-fwq-kt>
        </div>
    </div>
</template>

<script>
import preConKt from './preConKt.vue';
import LtdTemp from '../components/LtdTemp.vue'
export default {
    name: "PreConFwq",
    props: ['fwqId','ifbig'],
    data() {
        return {
            timer:"",
            JF:[],
            ktdataall:[],
            ktChangedValue:[],
            preltdmax:[],
            ifprecmd:true,
        }
    },
    components:{
        'precon-fwq-kt':preConKt,
        'ltd-temp':LtdTemp,
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
        getpreConltdwd(){
            this.ktChangedValue=this.$store.state.ktChangedValue;
            this.ktChangedSFValue=this.$store.state.ktChangedSFValue;
            this.preltdmax=this.$store.state.preltdmax;
            this.ifprecmd=this.$store.state.ifprecmd;
        },
        getktdata() {
            this.ktdataall=this.$store.state.ktdataall;
        }
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
        },87184)
    },
}
</script>

<style>
#pre-fwq{
    margin:0.1rem;
    width:96%;
    height:100%;
}
.precon-top-kt,.precon-bottom-kt{
    width:100%;
    height:24%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.precon-center-fwq{
    height:50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.precon-left-fwq,.precon-right-fwq{
    background-color: #303840;
    width:22%;
    height:96%;
    display:grid;
    justify-content: center;
    align-items: center;
}
.precon-mid-fwq{
    background-color: #566472;
    width:35%;
    height:96%;
    display: grid;
    justify-content: center;
    align-items: center;
}
.tem-pic{
    height:1.2rem;
    width:1.2rem;
}
.tem-num{
    font-size: 0.7rem;
    color:#73A8E8;
    font-weight: 900;
}
.temperature{
    height:2rem;
    display:flex;
    align-items: center;
}
</style>