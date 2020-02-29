<template>
  <div>
      <swiper class="detailSwiper">
          <swiper-item  v-for="(attr,index) in TopImage" :key="index">
              <img :src="attr">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
    name: 'DetailSwiper',
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        TopImage:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
    .detailSwiper{
        height: 300px;
        overflow: hidden;
    }
</style>