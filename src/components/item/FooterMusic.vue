<template>
    <div class="FooterMusic">
        <div class="FooterLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="" />
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑切换歌曲desu~</span>
            </div>
        </div>
        <div class="FooterRight">
            <svg class="icon" aria-hidden="true"  @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-bofang3"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  @click="play" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-gengduo1"></use>
            </svg>
        </div>
        <audio 
            ref="audio" 
            :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`">
        </audio>
        <van-popup v-model:show="detailShow"  position="right"  :style="{ height: '100%', width: '100%' }">
            <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"/>
        </van-popup>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MusicDetail from './MusicDetail.vue';
export default{
    data(){
        return{
            interVal:0
        }
    },
    computed:{
        ...mapState(['playList', 'playListIndex','isbtnShow','detailShow']),
    },
    mounted(){
        console.log(this.$refs);
        console.log(this.$refs.audio);
    },
    updated(){  //歌词获取用
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
        this.addDuration();
    },
    methods:{
        play:function(){
            if(this.$refs.audio.paused){
                this.$refs.audio.play();
                this.updateIsbtnShow(false)
                this.updateTime()
            }else{
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
                clearInterval(this.interVal)        //暂停时清除定时器
            }
        },
        addDuration:function(){
            this.updateDuration(this.$refs.audio.duration)
        },
        updateTime:function(){
            //定时器，出发函数
            this.interVal=setInterval(()=>{
                this.updateCurrentTime(this.$refs.audio.currentTime)
            },500)
        },
        ...mapMutations(['updateIsbtnShow','updateDetailShow','updateCurrentTime','updateDuration'])
    },
    watch:{
        //watch事件监听下标改变，如果该改变了下标就自动播放
        playListIndex:function(){  
            this.$refs.audio.autoplay=true;
            if(this.$refs.audio.paused){
                this.play()
            }
        },
        playList:function(){
            if(this.isbtnShow){//isbtnShow为true，处于暂停状态，此时开始播放音乐，更新图标状态
                this.$refs.audio.autoplay=true;
                this.updateIsbtnShow(false)
            }
            
        }
    },
    components:{
        MusicDetail
    }
};
</script>

<style>
.FooterMusic{
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    .FooterLeft{
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    }
    .FooterRight{
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: .2rem;

        .icon{
            width: .6rem;
            height: .6rem;
        }
    }
}
</style>
