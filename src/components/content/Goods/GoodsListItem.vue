<template>
  <div class="goods-item" @click="clickItem">
      <img v-lazy='showImage' @load="LoadFinish">
      <div class="goods-info">
        <p>{{goodsList.title}}</p>
        <span class="price">{{goodsList.price}}</span>
        <span class="collect">{{goodsList.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'GoodsListItem',
    props:{
        goodsList:{
            type: Object,
            defaults(){
                return {}
            }
        }
    },
    computed: {
      showImage(){
        return this.goodsList.image || this.goodsList.show.img
      }
    },
    methods: {
      // LoadFinish(){
      //   if(this.$route.path.indexOf('/home')){
      //     this.$bus.$emit('detailFinishLoad')
      //   }else if(this.$route.path.indexOf('/detail')){
      //     this.$bus.$emit('homeFinishLoad')
      //   }
      // },
      LoadFinish(){
          this.$bus.$emit('FinishLoad')
      },
      clickItem(){
        this.$router.push('/detail/' + this.goodsList.iid)
      }
    },
}
</script>

<style>
.goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/image/common/collect.svg') 0 0/14px 14px;
  }
</style>