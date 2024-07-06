<template>
    <div class="huifeng-temperature">
        <img class="huifeng-tem-pic" src="@/assets/icons/huifeng.svg" />
        <div class="huifeng-tem-num">{{ hfData }}°C</div>
    </div>
</template>

<script>
export default {
    props: {
        'hfData':{
            type:Number,
            default:30,
        }
    },
}
</script>

<style>
.huifeng-temperature{
    height:1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.huifeng-tem-pic{
    height:1rem;
    width:1rem;
    -webkit-transform:rotate(180deg);
}
.huifeng-tem-num{
    font-size: 0.6rem;
    color:#B77FE3;
    font-weight: 800;
}
</style>