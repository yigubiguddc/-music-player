<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>

            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe 
                :loop="false" 
                :width="150" 
                class="my-swipe" 
                :show-indicators="false"
            >
                <van-swipe-item v-for="item in state.musicList" :key='item'>
                    <router-link :to="{path:'/itemMusic', query:{id:item.id}}">
                    <img :src="item.picUrl" alt="" />
                    <span class="playCount">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang1"></use>
                        </svg>
                        {{ changePlayCount(item.playCount) }}
                    </span>
                    <span class="name">{{ item.name }}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>


<script>
import { getMusicList } from '@/request/api/home.js';
import { reactive,onMounted } from 'vue';
export default{
    //vue2写法
    // data(){
    //     return{
    //         musicList:[],
    //     };
    // },
    // methods:{
    //     async getGedan(){
    //         let res=await getMusicList();
    //         console.log(res);
    //         this.musicList=res.data.result
    //     },
    //     changePlayCount:function(num){
    //         if(num>=100000000){
    //             return (num/100000000).toFixed(2) +"亿"
    //         }else if(num>=10000){
    //             return (num/10000).toFixed(2) +"万"
    //         }

    //     }
    // },
    // mounted(){
    //     this.getGedan();
    // }
    //vue3写法
    setup(){
        const state=reactive({
            musicList: [],
        });
        function changePlayCount(num){
            if(num>=100000000){
                return (num/100000000).toFixed(2) +"亿"
            }else if(num>=10000){
                return (num/10000).toFixed(2) +"万"
            }

        }
        onMounted(async ()=>{
            let res = await getMusicList()
            console.log(res)
            state.musicList = res.data.result
        });
        return { state,changePlayCount }
    },
};
</script>


<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;    //为元素的左右两边添加 0.2rem 的内边距，上下内边距为 0，这使得元素内容不会紧贴左右边框，从而增加了内部内容的可读性和视觉效果。
      border-radius: 0.4rem;    //设置圆角，半径为0.4rem（20px）
    }
  }
  .musicContent {
    width: 100%;
    height: 3.6rem;

    .van-swipe-item {
      //   margin-right: 0.14rem;
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
      img {
        width: 100%;
        height: 2.9rem;
        border-radius: 0.2rem;
        //   position: absolute;
      }
      .playCount {
        position: absolute; //这里设置相对位置
        z-index: 100;   //图层高
        right: 0.3rem;  //距离右侧父元素
        color: transparent;
        background-image: linear-gradient(90deg, #00f5ff, #ff00ff, #ff8800, #00f5ff);
        background-size: 200%; /* 背景尺寸适中 */
        background-clip: text;
        -webkit-background-clip: text;
        animation: cyberpunkGlow 6s ease-in-out infinite; /* 更自然的过渡 */
        margin-top: 0.06rem;
        
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
      }
    }
  }
}
</style>