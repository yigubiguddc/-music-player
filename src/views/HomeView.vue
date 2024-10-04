<template>
  <div class="home">
      <TopNav/>
      <SwpierTop/>
      <ListIcon/>
      <MusicList/>
  </div>
</template>

<script>
import TopNav from '@/components/home/TopNav.vue';
import SwpierTop from '@/components/home/SwpierTop.vue';
import ListIcon from '@/components/home/ListIcon.vue';
import MusicList from '@/components/home/MusicList.vue';
// @ is an alias to /src


//在这个里边注册
export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwpierTop,
    ListIcon,
    MusicList,
  }
}
</script>
