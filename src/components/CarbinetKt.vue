<template>
    <div class="carbinet-kt">
        <div class="carbinet-kt-name">空调{{ ktId }}
        </div>
        <div class="carbinet-kt-params">
            <div v-for="(value, key) in values" :key="key" class="carbinet-kt-param-item">
                {{ key }} : {{ value }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ktId: {},
        values: {},
    },
    mounted() {
        console.log('this.values', this.values);
    },
    data() {
        return {};
    },
}
</script>

<style>
.carbinet-kt {
    background-color: #dedede;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.carbinet-kt-name{
    height:25%;
    text-align: center;
    font-size: 0.8rem;
    padding: 0 0 0.1rem 0rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0 0.2rem 0rem;
}
.carbinet-kt-params {
    height: 100%;
    width: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    font-size: 0.8rem;
    zoom: 0.8;
    font-weight: 400;
    padding: 0 0 0.2rem 0rem;
    color: #2c3e50;
}

.carbinet-kt-param-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
