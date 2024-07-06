<template>
    <div class="songfeng-temperature">
        <img class="songfeng-tem-pic" src="@/assets/icons/songfeng.svg" />
        <div class="songfeng-tem-num">{{ sfData }}°C</div>
    </div>
</template>

<script>
export default {
    props: {
        'sfData':{
            type:Number,
            default:20,
        }
    },
}
</script>

<style>
.songfeng-temperature{
    height:1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.songfeng-tem-pic{
    height:1rem;
    width:1rem;
}
.songfeng-tem-num{
    font-size: 0.6rem;
    color:#85D389;
    font-weight: 800;
}
</style>