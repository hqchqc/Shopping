<template>
  <div class="Cart">
    <cart-nav-bar/>
    <scroll class="CartScroll" ref="CartScroll">
      <cart-list-item v-for="(itemInfo,index) of $store.state.cartList" :key="index" :itemInfo='itemInfo'/>
    </scroll>
  </div>
</template>

<script>
import CartNavBar from './childComps/CartNavBar'
import CartListItem from './childComps/CartListItem'
import Scroll from 'components/common/scroll/Scroll'

export default {
    name: 'cart',
    components:{
      CartNavBar,
      CartListItem,
      Scroll
    },
    data() {
      return {
        itemInfo:{}
      }
    },
    activated() {
      this.$refs.CartScroll.refresh()
    },
}
</script>

<style>
  .Cart{
    height: 100vh;
  }
  .CartScroll{
    height: calc(100% - 43px - 49px);
    overflow: hidden;
  }
</style>