<template>
    <div class="now-status">
        <div class="fwdNkt">
                <div class="now-fwqs">
                    <div class="now-fwq" v-for="n in 5" :key="n">
                        <micro-module :micronIdNum="n"></micro-module>
                     </div>   
                </div>
        </div>
    </div>
</template>

<script>
// import CarbinetFwq from '../components/CarbinetFwq.vue';
import BigNowStatus from './BigNowStatus.vue';
import MicroModule from '../components/MicroModule.vue'

export default {
    name: "NowStatus",
    data() {
        return {
            timer:"",
            JF:[],
        }
    },
    components:{
        // 'carbinetfwq':CarbinetFwq,
        'micro-module':MicroModule
    },
    created () {
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getktdata()
        this.getfwqall()
    },
    mounted(){
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.getktdata()
        this.getfwqall()
        this.timer=setInterval(()=>{
            this.changeJFinfo()
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.getktdata()
            this.getfwqall()
        },74769)
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
        goBigNowStatus(){
            this.$FModal.show(
                { 
                    component: BigNowStatus,
                    maxHeight: '100%',
                    width: '96%', 
                    height:'100%',
                    placement: 'center center'  
                },
            )
        },
        getktdata(){
            this.ktdataall=this.$store.state.ktdataall
        },
        getfwqall(){
            this.realtimefwqltdwdsmall=this.$store.state.realtimefwqltdwdsmall;
            this.realtimefwqltdwdbig=this.$store.state.realtimefwqltdwdbig;
            this.realtimefwqrtdwdsmall=this.$store.state.realtimefwqrtdwdsmall;
            this.realtimefwqrtdwdbig=this.$store.state.realtimefwqrtdwdbig;
            this.fwqltdwdDownMaxIndex=this.$store.state.fwqltdwdDownMaxIndex;
            this.fwqltdwdUpMaxIndex=this.$store.state.fwqltdwdUpMaxIndex;
            this.realtimefwqpower=this.$store.state.realtimefwqpower;
    },
    }
}
</script>

<style>
.now-status{
    width:100%;
    height:100%;
    display: flex;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
.fwdNkt{
    width: 100%;
    height: 100%;
}
.go-big-view{
    margin:0.1rem;
    height:1.3rem;
    width:1.3rem;
    padding:0.2rem;
}
.now-fwqs{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100%;
}
.now-fwq{
    display: flex;
    justify-content: center;
    align-items: center;
    width:20%;
    height: 100%;
}
.now-contents{
    width:100%;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.one-content-now{
    margin: 0.5%;
    width:20%;
    height:80%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content-pic-now{
    height:1rem;
    width:1rem;
    margin-right:0.5rem;
    border-radius: 20%;
}
.content-text-now{
    font-size: 0.6rem;
    font-weight: 900;
}
.extend-fwqNkt{
    width:3%;
    height: 99%;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}
.label-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 22vw;
  margin-right: 22vw;
  margin-bottom: -2vw;
}
.label {
  color: #788dcb;
  font-weight: 600;
  font-size: 2rem;
  margin: 0 9.5vw 0 9.5vw;
  text-shadow: 1px 1px 0 #2c3e50;
}
</style>