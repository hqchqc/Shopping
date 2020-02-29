<template>
  <div>
      <div v-if="Object.keys(GoodsInfo).length !== 0" class="base-info">
          <div class="title">{{GoodsInfo.title}}</div>
          <div class="price">
              <span class="n-price">{{GoodsInfo.newPrice}}</span>
              <span class="o-price">{{GoodsInfo.oldPrice}}</span>
              <span v-if="GoodsInfo.discount" class="discount">{{GoodsInfo.discount}}</span>
          </div>
          <div class="other">
              <span>{{GoodsInfo.columns[0]}}</span>
              <span>{{GoodsInfo.columns[1]}}</span>
              <span>{{GoodsInfo.services[GoodsInfo.services.length-1].name}}</span>
          </div>
          <div class="service">
              <span class="item" v-for="index in GoodsInfo.services.length-1" :key="index">
                  <img :src="GoodsInfo.services[index].icon">
                  <span>{{GoodsInfo.services[index-1].name}}</span>
              </span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DetailBaseInfo',
    props:{
        GoodsInfo:{
            type:Object,
            defaults(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
    .base-info{
        margin-top: 15px;
        padding: 0 8px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }
    .title{
        color: #222;
    }
    .price{
        margin-top: 15px;
    }
    .n-price{
        color: var(--color-tint);
        font-size: 18px;
        margin-right: 5px;
    }
    .o-price{
        font-size: 13px;
        text-decoration:line-through;
    }
    .discount{
        background-color: var(--color-tint);
        border-radius: 6px;
        color: #fff;
        font-size: 12px;
        vertical-align: super; 
        margin-left: 5px;
        padding: 1px;
    }
    .other{
        margin-top: 15px;
        line-height: 30px;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    }
    .service{
        display: flex;
        height: 60px;
        line-height: 60px;
        justify-content: space-between;
        /* 超出部分显示... 文字不换行 */ 
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .service img{
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
    }
    .service span{
        font-size: 13px;
        color: #333;
    }
</style>