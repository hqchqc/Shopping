<template>
  <div>
      <nav-bar>
        <div slot="left" class="detailBack" @click="goBack">
            <img src="~assets/image/common/back.svg">
        </div>
        <div slot="center" class="detail">
          <div v-for="(attr,index) in detailItem" :key="index" class="detailItem" 
               :class="{active: index===currentIndex}" @click="detailClick(index)">{{attr}}</div>
        </div>
      </nav-bar>     
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name: 'DetailNavBar',
    components:{
        NavBar
    },
    data() {
        return {
            detailItem:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods: {
        detailClick(index){
            this.currentIndex = index;
        },
        goBack(){
            this.$router.back();
        }
    },
}
</script>

<style scoped>
    .detail{
        display: flex;
    }
    .detailItem{
        flex: 1;
        font-size: var(--font-size);
    }
    .active{
        color: var(--color-high-text);
    }
    .detailBack img{
        margin-top: 13px;
        width: 18px;
        height: 18px;
    }
</style>