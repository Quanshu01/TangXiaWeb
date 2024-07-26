<template>
    <div class="now-status">
        <div class="fwdNkt">
            <div class="now-fwqs">
                <micro-module></micro-module>
            </div>
        </div>
    </div>
</template>

<script>
// import CarbinetFwq from '../components/CarbinetFwq.vue';
// import BigNowStatus from './BigNowStatus.vue';
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
        this.getktdata()
        this.getfwqall()
    },
    mounted(){
        this.getktdata()
        this.getfwqall()
        this.timer=setInterval(()=>{
            this.getktdata()
            this.getfwqall()
        },74769)
    },
    methods:{
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
    width:98%;
    height: 96%;
}
.now-fwq{
    display: flex;
    justify-content: center;
    align-items: center;
    width:14%;
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
</style>