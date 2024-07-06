<template>
    <div id="fwq-kt">
        <div class="kt-name">
            空调 {{ ktId }}
        </div>
        <div class="kt-params">
            <div v-for="(value,key) in values" :key='key'>
                {{ key }} : {{ value }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        ktId:{},
        values:{},
        color:{},
        changedValue:{},
    },
    mounted(){
        // console.log('空调实时开关情况',this.values['空调开关'])
    },
    data() {
        return {
            kt_num:1,
            backColor:['#B4D8FF','#E7E6E6','#2d2d2d']
        }
    },
}
</script>

<style>
#fwq-kt{
    margin:0 1% 0 1%;
    background-color: #E7E6E6;
    width:50%;
    height:90%;
    border-radius: 0.3rem;
    border-style: solid;
    border-width: 1px;
    border-color: #d6d6d6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)
}
.kt-name{
    height:25%;
    text-align: center;
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
}
.changed-value{
    padding:0.2rem;
    color:blue;
    font-size:0.8rem;
}
.kt-params{
    margin:1% 0;
    height:68%;
    text-align: center;
    font-size: 0.8rem;
    zoom: 0.8;
    font-weight: 200;
    overflow-y: scroll;
    scrollbar-width: none;

}
</style>