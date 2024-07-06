<template>
    <div id="carbinet" :style="computedColor">
        <div class="carbinetId-text" >
            {{carbinetId }}
        </div>
        <div class="carbinet-temp-pos">  
            <el-tooltip class="item" effect="light" placement="top" >
                <div slot="content">
                    <!--标号，测点A B 1 2-->
                    {{ ifLeft ? JF[carbinetpos-1].carbinetLeft : JF[carbinetpos-1].carbinetRight }}{{ carbinettemp == 0 || carbinettemp == 1 ? 2 : 1 }}
                     - 
                     <!--上/下-->
                    {{ carbinettemp == 0 || carbinettemp == 3 ? upORdown[0] : upORdown[1] }}
                </div>     

                <!--不区分测点位置 MicroModule的margin-right: 0.5vw;-->
                <!-- <carbinet-temp :carbinetdData="carbinetserverdata[carbinettemppos][carbinettemp]" :ifleft=1></carbinet-temp> -->

                <!--区分测点位置,启用这一版 MicroModule的margin-right: 2vw;-->
                <carbinet-temp v-if="ifLeft === 1 && (carbinettemp === 0 || carbinettemp === 3)" :style="{ margin: '2rem 0 0 0.3rem' }" :carbinetdData="carbinetserverdata[carbinettemppos][carbinettemp]" :ifleft=1></carbinet-temp>
                <carbinet-temp v-if="ifLeft === 1 && (carbinettemp === 1 || carbinettemp === 4)" :style="{ margin: '0 0 2rem 0.3rem' }" :carbinetdData="carbinetserverdata[carbinettemppos][carbinettemp]" :ifleft=1></carbinet-temp>
                
                <carbinet-temp v-if="ifLeft == 0 && (carbinettemp === 0 || carbinettemp === 3)" :style="{ margin: '2rem 5.2rem 0 0' }" :carbinetdData="carbinetserverdata[carbinettemppos][carbinettemp]" :ifleft=1></carbinet-temp>
                <carbinet-temp v-if="ifLeft == 0 && (carbinettemp === 1 || carbinettemp === 4)" :style="{ margin: '0 5.2rem 2rem 0' }" :carbinetdData="carbinetserverdata[carbinettemppos][carbinettemp]" :ifleft=1></carbinet-temp>
            
            </el-tooltip>
        </div>
    </div>
</template>
  
<script>
import CarbinetTemp from '../components/CarbinetTemp.vue'
  export default {
    props: {
      carbinetId: {},
      carbinettemp: {},
      carbinettemppos:{},
      carbinetpos:{},
      ifLeft:{}
    },
    components:{
        'carbinet-temp':CarbinetTemp,
    },
    data(){
        return{
            colorList: [ '#303840','#bec3c1'],
            textcolorList: [ '#d7da9a','#2c3e50'],
            textsizeList:['1.6rem','1.4rem'],
            upORdown:['上','下'],
            JF:[],
        }
    },
    created () {
        this.getcarbintserverdata()
        this.JF=this.global.JF703
    },
    mounted(){
        this.getcarbintserverdata()
    },
    methods:{
        getcarbintserverdata() {
            this.carbinetserverdata = this.$store.state.carbinetserverdata;
        },        
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
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  }
  

  .carbinetId-text {
    position: absolute;
    font-size: var(--carbinet-color-text-size); 
    font-weight: 600; 
    padding: 1rem;
    font-size: 1.4rem;
    color: var(--carbinet-color-text);
    text-shadow: 0 2px 12px 0 rgba(0.2, 0.2, 0.2, 0.2);
}

.carbinet-temp-pos {
  position: relative;
  margin: 0 0 0 2.6rem;
}
  </style>