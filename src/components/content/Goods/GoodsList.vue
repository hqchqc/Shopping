<template>
    <div class="good-list">
        <goods-list-item :goodsList='attr' 
            v-for="(attr,index) in goodsItem" :key="index"/>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
    name: 'GoodsList',
    props:{
        goodsItem:{
            type:Array,
            defaults(){
                return []
            }
        }
    },
    components:{
        GoodsListItem
    }
}
</script>

<style>
  .good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);

    padding: 2px;
  }
</style>