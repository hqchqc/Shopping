<template>
  <div>
      <div>
          <detail-nav-bar/>
          <detail-swiper :TopImage='TopImage'/>
          <detail-base-info :GoodsInfo='GoodsInfo'/>
          <detail-shop-info :ShopInfo='ShopInfo'/>
      </div>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import {getDetail} from 'network/detail'
import {GoodsInfo,ShopInfo} from 'network/detail'

export default {
    name: 'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo
    },
    data() {
        return {
            iid:null,
            TopImage:[],
            GoodsInfo:{},
            ShopInfo:{}
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
            this.ShopInfo = new ShopInfo(data.shopInfo)
            console.log(data.shopInfo)
        })
    },
}
</script>

<style scoped>

</style>