<template>
<img :src="musicList.al.picUrl" alt="" class="bg">
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon" aria-hidden="true" @click="updateDetailShow">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <div class="leftMarquee">
                <!-- <marquee class="Marquee">{{ musicList.name }}</marquee> -->
                <span v-for="item in musicList.ar" :key="item">
                    {{ item.name }}
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
<!-- <transition name="fade"> -->
    <div class="detailContent" v-show="!isLyricShow" @click="() => isLyricShow = !isLyricShow">
        <img src="../../assets/cizhen.png" alt="" class="img_cizhen" :class="{img_cizhen_active:!isbtnShow}">
        <img src="../../assets/cipan.png" alt="" class="img_cipan">
        <img :src="musicList.al.picUrl" alt="" class="img_bg"  :class="{img_bg_active:!isbtnShow,img_bg_pause:isbtnShow}">
    </div>
<!-- </transition> -->

<!-- <transition name="fade"> -->
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="() => isLyricShow = !isLyricShow">
        <p v-for="item in lyric" :key="item" :class="{active:currentTime*1000>=item.time && currentTime*1000<item.next}">
            {{ item.lrc }}
        </p>
    </div>
<!-- </transition> -->

    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixinD"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinle"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-comment"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>
        <div class="footerContent">
            <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
        </div>
        <div class="footerBottom">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-danxunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="ChangeSongs(-1)">
                <use xlink:href="#icon-xiayishou1"></use>
            </svg>
            <svg class="icon_play" aria-hidden="true" v-if="isbtnShow" @click="play">
                <use xlink:href="#icon-bofang31"></use>
            </svg>
            <svg class="icon_pause" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-bofang8"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="ChangeSongs(1)">
                <use xlink:href="#icon-xiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofangliebiao"></use>
            </svg>
        </div>
    </div>
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee';
import { mapMutations,mapState } from 'vuex';
export default{
    data(){
        return{
            isLyricShow:false
        }
    },
    computed:{
        ...mapState(["lyricList","currentTime","playListIndex","playList",'duration']),      //这里vuex中的数据，通过computed就可以直接拿出来用了
        lyric:function () {
            let arr;
            if (this.lyricList.lyric) {  // 判空
                // 使用正则表达式匹配时间戳和歌词内容
                const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
                
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let match = item.match(timeRegex);
                    if (match) {
                        let min = match[1];  // 分钟
                        let sec = match[2];  // 秒
                        let mill = match[3]; // 毫秒
                        let lrc = match[4];  // 歌词内容

                        // 将时间转为毫秒数
                        let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + (mill.length === 2 ? parseInt(mill) * 10 : parseInt(mill));

                        return { min, sec, mill, lrc, time };
                    }
                }).filter(item => item !== undefined);  // 过滤掉无效的匹配结果

                arr.forEach((item, i) => {
                    if (i === arr.length - 1) {
                        item.next = 0;  // 最后一行歌词没有下一个时间
                    } else {
                        item.next = arr[i + 1].time;  // 当前时间和下一行歌词时间的间隔
                    }
                });
            }
            console.log(arr);
            return arr;
        }
    },
    mounted(){
        console.log(this.musicList);
        this.addDuration()
    },
    props:['musicList','play','isbtnShow','addDuration'],
    methods:{
        ...mapMutations(['updateDetailShow','updatePlayListIndex']),
        ChangeSongs:function(num){
            let index=this.playListIndex+num
            if(index<0){
                index=this.playList.length-1
            }else if(index==this.playList.length){
                index=0
            }
            this.updatePlayListIndex(index) //茵蒂克丝
        }
    },
    watch:{
        currentTime:function(newValue){
            let p = document.querySelector("p.active")
            //console.log([p])
            if(p&&p.offsetTop>250){
                this.$refs.musicLyric.scrollTop=p.offsetTop-250
            }
            if(newValue==this.duration){
                
                if(this.playListIndex==this.playList.length){
                    this.updatePlayListIndex(0)
                    this.play()
                }else{
                    this.updatePlayListIndex(this.playListIndex+1)
                }
            }
        }
    },
    components:{
        Vue3Marquee
    }
}
</script>

<style lang="less" scoped>
.bg{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(50px); //虚化
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 0.6rem;
      .Marquee {
        width: 1rem;
        }   
      .span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}
.detailContent {
    width: 100%;
    height: 8rem;  // 增加容器高度
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_cizhen {
        width: 2.8rem;
        height: 2.8rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%) rotate(-30deg);  // 保证水平居中
        bottom: 5rem;  // 调整位置，使其靠下
        transition: all 2s;
    }
    .img_cizhen_active {
        width: 2.8rem;
        height: 2.8rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%) rotate(-10deg);  // 保证水平居中
        bottom: 5rem;  // 调整位置，使其靠下
        transition: all 2s;
    }

    .img_cipan {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 1.5rem;  // 增加 bottom 值使其靠下
        z-index: -1;
    }

    .img_bg {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 2.4rem;  // 调整图片位置，使其靠下
        z-index: -1;
        animation: rotate_bg 10s linear infinite;
    }

    .img_bg_active{
        animation-play-state: running;
    }
    .img_bg_pause{
        animation-play-state: paused;
    }

    @keyframes rotate_bg {
            0%{
                transform: rotateZ(0deg);
            }
            100%{
                transform: rotateZ(360deg);
            }
        }
}
.musicLyric{
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .2rem;
    overflow: scroll;   //溢出部分卷轴滚动
    scroll-behavior: smooth;
    p{
        color:rgb(125, 135, 135);
        margin-bottom: .4rem;
        
    }
    .active{
        color: #d3b67a; // 淡暗金色 
        font-size: 0.45rem;
        transition: color 0.3s ease; // 平滑过渡效果 
    }
}
.detailFooter {
    width: 100%;
    height: 4.35rem;
    border-radius: 0.2rem;
    position: absolute;  // 设置为绝对定位
    bottom: 0;  // 使其固定在容器底部
    left: 0;  // 确保左侧对齐
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footerTop {
        width: 100%;
        height: 5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .range{
        width: 100%;
        height: 0.06rem;
    }

    .footerBottom {
        width: 100%;
        height: 5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon_play {
            width: 1.5rem;
            height: 1.5rem;
        }

        .icon_pause {
            width: 1.5rem;
            height: 1.5rem;
            transform: scale(0.94); // 主要是pause不写这个transform会比play的图标稍微小一圈，看得我特别难受
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease; /* 过渡时间和效果 */
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0; /* 初始状态为透明 */
}
</style>