<template>
  <div class="recommends">
      <div v-for="(attr,index) in recommends" :key="index" class="recommendItem">
          <a :href="attr.link">
            <img :src="attr.image">
            <div>{{attr.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name: 'RecommendView',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
    .recommends{
        display: flex;
        width: 100%;
        text-align: center;
        padding: 5px;
        border-bottom: 10px solid #eee
    }

    .recommendItem{
        flex:1
    }

    .recommendItem img{
        width: 70px;
        height: 65px;
        border-radius: 100%;
    }
</style>