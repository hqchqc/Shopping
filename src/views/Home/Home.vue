<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    
    <tab-control class="tab-control" @clickTab="clickTab" 
                :text="['流行','新款','精选']" ref='getOffsetTop1'
                 v-show="isFixed"></tab-control>

    <scroll class="scroll" ref="scroll" @scrollPosition='scrollPosition' :probe-type='3' :pull-up='true' @LoadMore='LoadMore'>
      <home-swiper :banners="banners" @LoadImg='LoadImg'></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control class="tab-control" @clickTab="clickTab" 
                  :text="['流行','新款','精选']" ref='getOffsetTop2'
                  :class="{fixed:isFixed}"></tab-control>
      <goods-list :goodsItem="showGoods"/>
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
import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin.js'

export default {
    name: 'home',
    mixins:[itemListenerMixin],
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
        isShow: false,
        offsetTop: 0,
        isFixed:false,
        position:0,
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
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
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
        this.$refs.getOffsetTop1.currentIndex = index
        this.$refs.getOffsetTop2.currentIndex = index
      },

      backTop(){
        this.$refs.scroll.scrollTo(0,0,1000);
      },

      scrollPosition(position){ 
        // 1. 判断 回到顶部的箭头 是否显示
        this.isShow = -(position.y) > 1000

        // 2. 决定 tabControl 是否吸顶
        this.isFixed = -(position.y) > this.offsetTop

      },

      LoadMore(){
        this.getHomeGoods(this.currentType);  
      },

      LoadImg(){
        this.offsetTop = this.$refs.getOffsetTop2.$el.offsetTop
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
    mounted() {
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.position,0)
    },
    deactivated() {
      // 保存Y值
      this.position = this.$refs.scroll.getY()
      // 取消全局事件的监听
      this.$bus.$off('FinishLoad',this.ItemImgListener)
    }
    
}
</script>

<style >
  #home{
    height: 100vh;
    position: relative;
  }
  
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;
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