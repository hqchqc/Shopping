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

        })
    },
}
</script>

<style scoped>

</style>