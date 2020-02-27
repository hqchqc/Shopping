<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    
    <scroll class="scroll" ref="scroll" @scrollPosition='scrollPosition' :probe-type='3' :pull-up='true' @LoadMore='LoadMore'>
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control class="tab-control" @clickTab="clickTab"  :text="['流行','新款','精选']"></tab-control>
      <goods-list :goodsItem="goods[currentType].list"/>
    </scroll>

    <back-top @click.native="backTop" v-show="isShow" />
    
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/Goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/BackTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home.js';

export default {
    name: 'home',
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType: 'pop',
        isShow: false
      }
    },
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    methods: {
      // 监听事件相关
      clickTab(index){
        switch(index){
          case 0: this.currentType = 'pop'
          break;
          case 1: this.currentType = 'new'
          break;
          case 2: this.currentType = 'sell'
          break;
        }
      },

      backTop(){
        this.$refs.scroll.scrollTo(0,0,1000);
      },

      scrollPosition(position){
        return this.isShow = -(position.y) > 1000
      },

      LoadMore(){
        this.getHomeGoods(this.currentType);
        
      },

      // 网络请求相关
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },

      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1   
          this.$refs.scroll.finishPullUp()
        });
      }
    },

    created() {
      // 获得轮播图数据
      this.getHomeMultidata()
      // 获得 流行/新款/精选 数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    
}
</script>

<style >
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9;
  }

  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .scroll{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>