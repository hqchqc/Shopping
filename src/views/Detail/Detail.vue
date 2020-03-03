<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @clickDetailNavBar='clickDetailNavBar' ref="detailNav"/>
        <scroll class="content" ref="scroll" @scrollPosition="detailScroll" :probeType='2' :pull-up='true'>
            <detail-swiper :TopImage='TopImage'/>
            <detail-base-info :GoodsInfo='GoodsInfo'/>
            <detail-shop-info :ShopInfo='ShopInfo'/>
            <detail-goods-info :detailInfo='DetailInfo' @imageLoad="imageLoad"/>
            <detail-param :goodsParam='GoodsParam' ref="options"/>
            <detail-commonent-info :CommonentInfo='CommonentInfo' ref="comment"/>
            <goods-list :goodsItem='recommends' ref="goodsForYou"/>
        </scroll>  

        <detail-button-bar @addToCart='addToCart'/>  
        <back-top @click.native="backTop" v-show="isShow"/>    
        <!-- <toast :message='message' :ToastShow='ToastShow'/>  -->
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParam from './childComps/DetailParam'
import DetailCommonentInfo from './childComps/DetailCommonentInfo'
import DetailButtonBar from './childComps/DetailButtonBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/Goods/GoodsList'

import {getDetail,getRecommend} from 'network/detail'
import {GoodsInfo,ShopInfo,GoodsParam} from 'network/detail'

import {debounce} from 'common/utils.js'
import {itemListenerMixin,backTop} from 'common/mixin.js'

import {mapActions} from 'vuex'

import Toast from 'components/common/Toast/index.js'


export default {
    name: 'Detail',
    mixins:[itemListenerMixin,backTop],
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParam,
        DetailCommonentInfo,
        DetailButtonBar,
        Scroll,
        GoodsList,
        // Toast
    },
    data() {
        return {
            iid:null,
            TopImage:[],
            GoodsInfo:{},
            ShopInfo:{},
            DetailInfo:{},
            GoodsParam:{},
            CommonentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:{},
            currentIndex:0,
            // message:'',
            // ToastShow:false
        }
    },
    created() {
        this.iid = this.$route.params.iid;

        getDetail(this.iid).then(res=>{
            const data = res.data.result;
            //获取轮播图数据
            this.TopImage = data.itemInfo.topImages;
            //获取商品信息
            this.GoodsInfo = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo);
            //获取店铺信息
            this.ShopInfo = new ShopInfo(data.shopInfo);
            //获取详情信息
            this.DetailInfo = data.detailInfo;
            //获取商品参数
            this.GoodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule);
            //获取用户评价
            if(data.rate.cRate !== 0){
                this.CommonentInfo = data.rate.list[0]
            }
        });
        getRecommend().then(res=>{
            this.recommends = res.data.data.list
        })

        this.getThemeTopY = debounce(()=>{
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.options.$el.offsetTop-50)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.goodsForYou.$el.offsetTop-50)   
            this.themeTopYs.push(Number.MAX_VALUE)         
        },500)
    },
    methods: {
        // 第一种写法
        // ...mapActions(['addCart']),
        // 第二种写法  键 => 你起的名字  值 => 调用的函数
        ...mapActions({
            AddCart: 'addCart'
        }),
        imageLoad(){
            this.$refs.scroll.refresh();

            this.getThemeTopY()
        },
        clickDetailNavBar(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        },
        detailScroll(position){
            // 1. 判断 回到顶部的箭头 是否显示
            this.backLinster(position)

            // 2. 导航跟随移动
            let detailPosition = -this.$refs.scroll.getY()
            let length = this.themeTopYs.length
            // for(let attr = 0; attr<length;attr++){
            //     //  0<position<this.themeTopYs[1]
            //     //  this.themeTopYs[0] < position < this.themeTopYs[1]
            //     //  this.themeTopYs[1] < position < this.themeTopYs[2]
            //     //  this.themeTopYs[2] < position < this.themeTopYs[3]
            //     //  this.themeTopYs[3] < position
            //     if((this.currentIndex !== attr) && ((attr<length-1 && detailPosition >= this.themeTopYs[attr] && detailPosition<this.themeTopYs[attr+1]) ||
            //     (attr === length - 1 && detailPosition >= this.themeTopYs[attr]))){
            //         this.currentIndex = attr
            //         this.$refs.detailNav.currentIndex = this.currentIndex;
            //     }
            // }
            for(let attr = 0; attr<length-1;attr++){
                //  0<position<this.themeTopYs[1]
                //  this.themeTopYs[0] < position < this.themeTopYs[1]
                //  this.themeTopYs[1] < position < this.themeTopYs[2]
                //  this.themeTopYs[2] < position < this.themeTopYs[3]
                //  this.themeTopYs[3] < position
                if((this.currentIndex !== attr) && (detailPosition >= this.themeTopYs[attr] && detailPosition<this.themeTopYs[attr+1])){
                    this.currentIndex = attr
                    this.$refs.detailNav.currentIndex = this.currentIndex;
                }
            }
        },
        addToCart(){
            const product = {};
            product.image = this.TopImage[0];
            product.title = this.GoodsInfo.title;
            product.discript = this.GoodsInfo.desc;
            product.price = this.GoodsInfo.lowNowPrice;
            product.iid = this.iid;
            // 记录数量 dispatch方法返回的是一个promise  
            // 第一种写法
            // this.$store.dispatch('addCart',product).then((res)=>{
            //     console.log(res)
            // })
            // 第二种写法 类似mapGetters
            this.AddCart(product).then((res)=>{

                // 第一种手动写成组件
                // this.ToastShow = true;
                // this.message = res;

                // setTimeout(() => {
                //     this.ToastShow = false;
                //     this.message = '';
                // }, 1500);
                // console.log(res)

                // 第二种封装成插件的toast
                this.$toast.show(res)
            })


        }
    },
    mounted() {
       
    },
    destroyed() {
        this.$bus.$off('FinishLoad',this.ItemImgListener)    
    },
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height: calc(100% - 43px - 49px);
    }
</style>