<template>
  <div class="wrapper" ref="wrapper">
      <div class="container">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

export default {
    name:'Scroll',
    props:{
        probeType:{
            type: Number,
            default: 0
        },
        pullUp:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            Bscroll:{
                defaults(){
                    return null
                }
            }
        }
    },
    mounted() {
        this.Bscroll = new Bscroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUp
        });
        this.Bscroll.on('scroll',(position)=>{
            this.$emit('scrollPosition',position)
        });
        this.Bscroll.on('pullingUp',()=>{
            this.$emit('LoadMore')
        });
    },
    methods: {
        scrollTo(x,y,time=500){
            this.Bscroll.scrollTo(x,y,time);
        },
        finishPullUp(){
            this.Bscroll.finishPullUp();
        }
    },

}
</script>

<style scoped>

</style>