<template>
  <router-view/>
  <FooterMusic/>
</template>

<script>
import FooterMusic from './components/item/FooterMusic.vue';

export default{
  name: '',
  components:{
    FooterMusic,
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: .5rem;
  
}
a {
  color:black;
}

@keyframes cyberpunkGlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; } /* 在中间达到最大变化 */
  100% { background-position: 0% 50%; }  /* 循环回到起点 */
}


</style>
