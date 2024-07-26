<template>
    <div class="ltd-changed">
        <div class="hot-contents">
            <div class="content-pic-hot-s" style="background-color:#67C23A;"></div>
            <div class="content-text-hot-s" style="color:#67C23A;">热点低风险区</div>
            <div class="content-pic-hot-s" style="background-color:#E6A23C;"></div>
            <div class="content-text-hot-s" style="color:#E6A23C;">热点中风险区</div>
            <div class="content-pic-hot-s" style="background-color:#F56C6C;"></div>
            <div class="content-text-hot-s" style="color:#F56C6C;">热点高风险区</div>
            <div class="content-pic-hot-s" style="background-color:#0F1114;"></div>
            <div class="content-text-hot-s" style="color:#0F1114;">弃用冷通道测点</div>
        </div>
        <div class="ltd-changed-inside">
            <div class="fwdNkt">
                <div class="now-fwqs">
                    <ltd-module />
                </div>
            </div>
        </div>
    </div>
</template>c

<script>
import LtdModule from '@/components/LtdModule.vue'

export default {
    data() {
        return {
        }
    },
    components:{
        'ltd-module':LtdModule
    },
    created () {
    },
    mounted(){
    },
    methods:{
    },
}
</script>

<style>
.ltd-changed{
    width:100%;
    height:98%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.hot-contents{
    position: absolute; /* 绝对定位的子元素 */
    top:2%;
    display:flex;
    justify-content: center;
    align-items: center;
}
.ltd-changed-inside{
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.change-value0{
    width:100%;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.change-value{
    width:100%;
    height: 10%;
    display: flex;
}
.windowTitle{
    width:2rem
}
.change-params{
    font-size: 0.8rem;
}
.hot-fwdNkt{
    width:100%;
    height: 90%;
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
    margin-right: 12px;
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
</style>