<template>
    <div class="ItemMusicTop">
        <img :src="playlist.coverImgUrl" alt="" class="bg">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>
    </div>
    <div class="itemTopContent">
        <div class="contentLeft">
            <img :src="playlist.coverImgUrl" alt="" />
            <div class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang2"></use>
                </svg>
                <span>{{ changeCount(playlist.playCount) }}</span>
            </div>
        </div>
        <div class="contentRight">
            <p class="rightP_one">{{ playlist.name }}</p>
            <div class="right_img">
                <img :src="playlist.creator.backgroundUrl" alt="" />
                <span>{{ playlist.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou_huaban"></use>
                </svg>
            </div>
            <p class="rightP_two">
                <span>{{ playlist.description }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou_huaban"></use>
                </svg>
            </p>
        </div>
    </div>
<div class="itemTopFooter">
    <div class="footerItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouye"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="footerItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="footerItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai1"></use>
        </svg>
        <span>下载</span>
    </div>
    <div class="footerItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xuanze-duoxuan"></use>
        </svg>
        <span>多选</span>
    </div>
</div>

</template>

<script>
export default{
    setup(props) {
        console.log(props)
        // if((props.playlist.creator="")){
        //     props.playlist.creator=JSON.parse(sessionStorage.getItem().playlist).creator
        // }

        function changeCount(num){
            if(num>=100000000){
                return (num/100000000).toFixed(2) +"亿";
            }else if(num>=10000){
                return (num/10000).toFixed(2)+"万";
            }
        }
        return {changeCount}
    },
    props:['itemList', 'playlist']
}
</script>

<style lang="less" scoped>
.ItemMusicTop{
    width: 100%;
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //padding: .2rem;
    position: relative;
    box-sizing: border-box;
    .itemLeft,.itemRight{
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.2rem;
        span{
            font-size: .4rem;
            color: #000;;
        }
    }
    .bg{
        width: 100%;
        height: 11rem;
        position:fixed;
        z-index: -1;
        filter: blur(10px);   //虚化背景
    }
}
.itemTopContent{
    width: 100%;
    height:3rem;
    padding: 0.2rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-between;
    .contentLeft{
        width: 36%;
        height: 2.6rem;
        position: relative;
        img{
            width: 2.6rem;
            height: 2.6rem;
            border-radius: 0.2rem;
            position: absolute;
            z-index: -1;
        }
        .playCount{
            position: absolute;
            right: 0.1rem;
            margin-top: 0.1rem;
            .icon{
                width: 0.4rem;
                height:0.4rem;
                vertical-align: middle;
            }
            span{
                font-size: 0.26rem;
                color:#fff;
            }
        }
    }
    .contentRight{
        width: 60%;
        height: 2.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .rightP_one{
            font-size: 0.3rem;
            font-weight: 900;
            color: transparent;
            background-image: linear-gradient(90deg, #00f5ff, #ff00ff, #ff8800, #00f5ff);
            background-size: 200%; /* 背景尺寸适中 */
            background-clip: text;
            -webkit-background-clip: text;
            animation: cyberpunkGlow 6s ease-in-out infinite; /* 更自然的过渡 */
                font-family: "微软雅黑";
            }
        .right_img{
            width: 100%;
            height: 0.6rem;
            line-height: 0.6rem;
            color:#ccc;
            img{
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                vertical-align: middle;
            }
            span{
                margin-left: 0.1rem;
            }
            .icon{
                width: 0.26rem;
                height: 0.26rem;
                margin-top: -0.08rem;
                vertical-align: middle;
            }
        }
        .rightP_two{
            width: 100%;
            height: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span{
                display: inline-block;
                width: 95%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 0.24rem;
                color: transparent;
                background-image: linear-gradient(90deg, #00f5ff, #ff00ff, #ff8800, #00f5ff);
                background-size: 200%; /* 背景尺寸适中 */
                background-clip: text;
                -webkit-background-clip: text;
                animation: cyberpunkGlow 6s ease-in-out infinite; /* 更自然的过渡 */
            }
            .icon{
                width: 0.24rem;
                height: 0.24rem;
            }
        }
    }

}
.itemTopFooter{
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-around;
    margin-top: .2rem;
    .footerItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        color:#fff;
        .icon{
            fill:#fff;
            span{
                margin-top: .1rem;
            }
        }
    }
}
</style>