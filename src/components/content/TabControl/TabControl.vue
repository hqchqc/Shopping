<template>
  <div class="tabItem">
      <div class="tab-item" @click="clickItem(index)" v-for="(attr,index) in text" :key="index" 
       :class="{active: index===currentIndex}">
        <span>{{attr}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        text:{
            type:Array,
            defaults(){
                return []
            }
        }
    },
    data() {
        return {
            currentIndex:0
        }
    },
    methods: {
        clickItem(index){
            this.currentIndex = index;
            this.$emit('clickTab',index);
        }
    }
}
</script>

<style>
    .tabItem{
        height: 44px;
        line-height: 44px;
        display: flex;
        text-align: center;
        background-color: #fff;
    }
    .tab-item{
        flex:1;
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        border-bottom: 2px solid var(--color-tint);
        padding: 5px;
    }
</style>