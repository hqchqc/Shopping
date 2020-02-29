<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="content" ref="scrolls">
            <detail-swiper :TopImage='TopImage'/>
            <detail-base-info :GoodsInfo='GoodsInfo'/>
            <detail-shop-info :ShopInfo='ShopInfo'/>
            <detail-goods-info :detailInfo='DetailInfo' @imageLoad="imageLoad"/>
            <detail-param :goodsParam='GoodsParam'/>
        </scroll>    
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParam from './childComps/DetailParam'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail} from 'network/detail'
import {GoodsInfo,ShopInfo,GoodsParam} from 'network/detail'


export default {
    name: 'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParam,
        Scroll
    },
    data() {
        return {
            iid:null,
            TopImage:[],
            GoodsInfo:{},
            ShopInfo:{},
            DetailInfo:{},
            GoodsParam:{}
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
        })
    },
    methods: {
        imageLoad(){
            this.$refs.scrolls.refresh();
        },
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
        height: calc(100% - 44px);
    }
</style>