<template>
    <div class="carbinet-kt">
        <div class="carbinet-kt-name">空调{{ ifLeft ? JF[ktId-1].carbinetLeftIndex : JF[ktId-1].carbinetRightIndex }}
        </div>
        <div class="carbinet-kt-params">
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
        ifLeft:{},
    },
    created(){
        this.JF=this.global.JF703
        console.log('this.values',this.values)
    },
    data() {
        return {
            JF:[],
        }
    },
}
</script>


<style>
.carbinet-kt{
    background-color: #dedede;
    width: 100%;
    height:100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    align-items: center;
    flex-direction: column; 
}
.carbinet-kt-name{
    height:25%;
    text-align: center;
    font-size: 0.7rem;
    padding: 0 0 0.1rem 0rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0 0.2rem 0rem;
}
.carbinet-kt-params{
    height:90%;
    width: 90%;
    text-align: center;
    font-size: 0.7rem;
    zoom: 0.8;
    font-weight: 400;
    padding: 0 0 0.2rem 0rem;
    color: #2c3e50;
    overflow-y: scroll;
}
</style>