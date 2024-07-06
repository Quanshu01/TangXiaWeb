<template>
    <div class="hotpoint-risk">
        <div class="hot-fwdNkt">
            <div class="hot-fwqs">
                <div class="hot-fwq" v-for="n in JF.length" :key="n.index">
                    <KeepAlive>
                        <hot-fwq :fwqId="n" :ifBig="false" :hotpointriskall="hotpointriskall"></hot-fwq>
                    </KeepAlive>
                </div>
            </div>
            <div class="hot-contents">
                <div class="one-content-hot-s">
                    <div class="content-pic-hot-s" style="background-color:#67C23A;"></div>
                    <div class="content-text-hot-s" style="color:#67C23A;">热点低风险区</div>
                </div>
                <div class="one-content-hot-s">
                    <div class="content-pic-hot-s" style="background-color:#E6A23C;"></div>
                    <div class="content-text-hot-s" style="color:#E6A23C;">热点中风险区</div>
                </div>
                <div class="one-content-hot-s">
                    <div class="content-pic-hot-s" style="background-color:#F56C6C;"></div>
                    <div class="content-text-hot-s" style="color:#F56C6C;">热点高风险区</div>
                </div>
                <div class="one-content-hot-s">
                    <div class="content-pic-hot-s" style="background-color:#0F1114;"></div>
                    <div class="content-text-hot-s" style="color:#0F1114;">弃用冷通道测点</div>
                </div>
                <div class="one-content-hot-s">
                    <el-tooltip class="item" effect="light" content="查看大图" placement="top-start">
                        <el-button size="mini" class="go-big-view" icon="el-icon-zoom-in" @click="goBigHotPointRisk"></el-button>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HotFwq from '@/components/HotFwq.vue';
import BigHotPointRisk from './BigHotPointRisk.vue';
export default {
    name: "HotPointRisk",
    data() {
        return {
            timer:"",
            JF:[],
            hotpointriskall:[],
        }
    },
    components:{
        'hot-fwq':HotFwq
    },
    created () {
        this.changeJFinfo()
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.gethotpointrisk()
    },
    mounted(){
        this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
        this.changeJFinfo()
        this.gethotpointrisk()

        this.timer=setInterval(()=>{
            this.JFname = parseInt((window.sessionStorage.getItem("room")).replace(/"/g, ""))
            this.changeJFinfo()
            this.gethotpointrisk()
        },70743)
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
        gethotpointrisk(){
            this.hotpointriskall=this.$store.state.hotpointriskalldata;
        },
        goBigHotPointRisk(){
            this.$FModal.show(
                { 
                    component: BigHotPointRisk,
                    maxHeight: '100%',
                    width: '96%', 
                    height:'100%',
                    placement: 'center center'  
                },
            )
        },
        
    },
}
</script>

<style>
.hotpoint-risk{
    width:100%;
    height:98%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hot-fwdNkt{
    width:100%;
    height: 96%;
    display: flex;
}
.hot-fwqs{
    padding:0.5rem;
    width:86%;
    height: 96%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hot-fwq{
    padding:0.5rem;
    width:12%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hot-contents{
    width:10%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
.extend-fwqNkt{
    width:5%;
    height: 100%;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}
.one-content-hot-s{
    margin: 0.5%;
    width:100%;
    height:20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content-pic-hot-s{
    height:0.8rem;
    width:0.8rem;
    margin-right:0.5rem;
    border-radius: 20%;
    justify-content: center;
    align-items: center;
}
.content-text-hot-s{
    font-size: 0.6rem;
    font-weight: 900;
}
</style>