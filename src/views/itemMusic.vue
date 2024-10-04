<template>
    <ItemMusicTop v-if="Object.keys(state.playList).length>0" :playlist="state.playList" :itemList="state.itemList"/>
    <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playList.subscribedCount"/>
</template>

<script>
import { onMounted,reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getMusicItemList,getItemList } from '@/request/api/item';
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue';
export default{
    setup(){
        const state = reactive({
            playList:{}, //歌单详情页数据
            itemList:[] //歌单的歌曲
        });
        onMounted(async ()=>{
            let id=useRoute().query.id  //通过路由获取id，是一种捷径呢
            console.log(useRoute());
            console.log(id)
            //获取歌单详情
            let res=await getMusicItemList(id)
            console.log(res)
            state.playList=res.data.playlist
            //获取歌单歌曲
            let res_1=await getItemList(id);
            console.log(res_1);
            state.itemList=res_1.data.songs;
        });
        return {state};
    },
    components:{
        ItemMusicTop,ItemMusicList
    }

};
</script>