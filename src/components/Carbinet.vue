<template>
    <div id="carbinet" :style="computedColor">
        <div v-if="carbinetId !== '空调'" class="carbinetId-text" >
            {{carbinetId }}
        </div>  
        <div v-if="carbinetId === '空调'" class="carbinetInfo">
            <carbinet-kt :values=carbinetInfo :ktId=ktId></carbinet-kt>
        </div>
    </div>
  </template>
  
  <script>
import CarbinetKt from '../components/CarbinetKt'

  export default {
    props: {
      carbinetId: {},
      carbinetInfo:{},
      ktId:{}
    },
    components:{
        'carbinet-kt':CarbinetKt,
    },
    data(){
        return{
          colorList: [ '#303840','#E7E6E6'],
            textcolorList: [ '#d7da9a','#2c3e50'],
            textsizeList:['1.6rem','1.4rem'],
        }
    },
    computed: {
        computedColor() {
            return{
                '--carbinet-color':this.carbinetId=="空调" ? this.colorList[1]: this.colorList[0],
                '--carbinet-color-text':this.carbinetId=="空调" ? this.textcolorList[1]: this.textcolorList[0],
                '--carbinet-color-text-size':this.carbinetId=="空调" ? this.textsizeList[1]: this.textsizeList[0],
            }
        },
    },
  };
  </script>
  
  <style scoped>
  #carbinet {
    background-color: var(--carbinet-color);
    width: 75%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  }
  

  .carbinetId-text{
    font-size: var(--carbinet-color-text-size); 
    font-weight: 600; 
    /* color: rgb(77, 189, 101);  */
    padding: 1rem;
    color: var(--carbinet-color-text);
  }

  .carbinetInfo{
    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.1)
  }
  
  </style>