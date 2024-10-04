<template>
    <div class="TopSearch">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="hanser" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="SearchHistory">
        <span class="searchSpan">历史</span>
        <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistory(item)">
            {{ item }}
        </span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="itemList">
            <div class="item" v-for="(item, i) in searchList" :key="i">
                <div class="itemLeft" @click="updateIndex(item,i)">
                    <span class="leftSpan">{{ i+1 }}</span>
                    <div>
                        <p>{{ item.name }}</p>
                        <span v-for="(item1, index) in item.ar" :key="index">{{
                            item1.name 
                        }}<span v-if="index < item.ar.length - 1"> / </span></span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon bofang" aria-hidden="true" v-if='item.mv!=0'>
                        <use xlink:href="#icon-bofang3"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-gengduo"></use>
                    </svg>
                </div>
            </div>
        </div>
</template>

<script>
import { getSearchList } from '@/request/api/home';
export default{
    data(){
        return{
            keyWordList:[],
            searchKey:"",
            searchList:[],
        } 
    },
    mounted(){
        this.keyWordList=JSON.parse(localStorage.getItem('keyWordList')) || []
    },
    methods:{
        enterKey:async function(){
            if(this.searchKey!=""){
                this.keyWordList.unshift(this.searchKey);
                this.keyWordList=[...new Set(this.keyWordList)]

                if(this.keyWordList.length>10){
                    this.keyWordList.pop()
                }

                localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList))
                let res = await getSearchList(this.searchKey)
                this.searchList=res.data.result.songs
                console.log(this.searchList)
                this.searchKey=""
            }
        },
        delHistory:function(){
            localStorage.removeItem("keyWordList")
            this.keyWordList=[]
        },
        searchHistory:async function(item){
            let res = await getSearchList(item)
            this.searchList=res.data.result.songs
            console.log(this.searchList)
        },
        updateIndex:function(item){
            this.$store.commit("pushPlaylist",item)
            this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
        }
    }
}
</script>

<style lang="less" scoped>
.TopSearch{
    width: 100%;
    height: 1rem;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    input{
        margin-left: .2rem;
        border: none;
        border-bottom: 1px solid #999;
        width: 90%;
        padding: 0.1rem;
    }
}
.SearchHistory{
    width: 100%;
    padding: .2rem;
    position: relative;
    .searchSpan{
        font-weight: 700;
    }
    .spanKey{
        padding: .1rem .2rem;
        background-color: #f7c9c9;
        border-radius: .4rem;
        margin: .1rem .2rem;
        display: inline-block;
    }
    .icon{
        position: absolute;
        right: .25rem;
    }
}
.itemList{
        width: 100%;
        padding: .2rem;
        .item{
            width: 100%;
            height: 1.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .itemLeft{
                width: 85%;
                height: 1.4rem;
                display: flex;
                align-items: center;
                .leftSpan{
                    display: inline-block;
                    width: 0.2rem;
                    text-align: center;
                }
                div{
                    p{
                        width: 4.54rem;
                        height: .4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: 700; 
                    }
                    span{
                        font-weight: 400;
                        font-size: .24rem;
                        columns: #999;
                    }
                    margin-left: 0.3rem;
                }
                .itemRight{
                    width: 20%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    position: relative;
                    .icon{
                        fill: #999;
                    }
                    .bofang{
                        position: absolute;
                        left: 0;
                    }
                    .liebiao{
                        position: absolute;
                        right: 0;
                    }
                }
            }
        }
    }
</style>
