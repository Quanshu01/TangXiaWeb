<template>
    <div id="title-top">
        <div>
            <span v-if="ifcontent==true">
                <el-tooltip placement="top" effect="light">
                    <div slot="content">
                    {{ content }}
                    </div>
                    <i class="el-icon-warning-outline TitleTopContent"></i>
                </el-tooltip>
            </span>
            <span class="title-name" :style="styleVar">
                {{name}}
            </span>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        name: String,
        fontSize:{
            type:Number,
            default:1,
        },
        content:{
            type:String,
        },
        ifcontent:{
            type:Boolean,
            default:true
        },
    },
    computed:{
        styleVar(){
            return{
                '--title-fontSize':this.fontSize+'rem',
            }
        }
    },

}
</script>

<style>
#title-top{
    height:3vh;
    justify-content: space-between;
    display: flex;
    align-items: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin:0 1vh 0 1vh;
}
.title-name{
    margin: 0 0 0 0;
    font-size: var(--title-fontSize);
    font-weight: 800;
    color:balck;
    align-items: flex-start;
}
.TitleTopContent{
    margin:0 0vw 0 0vw;
    padding:0.2rem;
    border-radius: 0.5rem;
}
</style>