import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'

export default createStore({
  state: {
    playList: [{  //播放列表默认值
      al:{
        "id": 88351050,
        "name": "花に亡霊",
        "picUrl": "https://p1.music.126.net/_Os98d4NSKf-vLo_93QoEg==/109951164927614269.jpg",
        "tns": [],
        "pic_str": "109951164927614269",
        "pic": 109951164927614270
    },
    ar:[
      {
        "name": "ヨルシカ"
      },
    ],
      id: 1442466883,
      name:"花に亡霊",
    }],
    playListIndex:0,  //默认下标为0
    isbtnShow:true,
    detailShow:false, //详情歌词展示
    lyricList:{},
    currentTime: 0,  //配合歌词显示，这里是当前时间
    duration:30.024,
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow=value
    },
    updatePlayList:function(state,value){
      state.playList=value
      //console.log(state.playList)
    },
    updatePlayListIndex:function(state,value)
    {
      state.playListIndex=value
    },
    updateDetailShow:function(state){
      state.detailShow=!state.detailShow  //detailShow取反
    },
    updateLyricList:function(state,value){
      state.lyricList=value     //把lrc传入这个我们的数组lyricList，vuex还是比较有用的，主要就是用来全局传值
    },
    updateCurrentTime:function(state, value){
      state.currentTime=value
      //console.log(state.currentTime)
    },
    updateDuration:function(state,value){
      state.duration=value
    },
    pushPlaylist:function(state,value){
      state.playList.push(value)
    }
  },
  actions: {  //修改歌词
    getLyric:async function(context, value){
      let res=await getMusicLyric(value)
      //console.log(res);
      context.commit("updateLyricList", res.data.lrc)
    }
  },
  modules: {
  }
})
