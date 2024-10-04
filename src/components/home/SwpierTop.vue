<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" alt=""/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>

import {getBanner} from '@/request/api/home.js'
import { reactive,onMounted } from 'vue';
//组合式API
export default {
  setup() {
    //添加轮播图url,使用响应式数组属性可以修改，方便从每日的网易云轮播图获取数据 
    const state = reactive({
      images:[
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]});
    onMounted(async ()=>{
      // axios.get('http://localhost:3000/banner?type=2').then((res)=>{
      //   console.log(res)
      //   state.images=res.data.banners
      //   console.log(state.images);
      // })
      let res = await getBanner();  //异步请求
      state.images=res.data.banners
      console.log(res);
    });
    return { state };
  },
};
</script>

<style lang="less">
#swiperTop{
  .van-swipe{
  width: 100%;
  height:3rem;
  .van-swipe-item{
    padding: 0 0.2rem;
    img{
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
    }
  }
  .van-swipe__indicator--active{
    background-color: rgb(219,130,130);
  }
}
}
</style>