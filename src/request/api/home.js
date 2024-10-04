import service from "..";
//获取首页的轮播图数据
export function getBanner(){
    return service({
        method:"GET",
        url:"/banner?type=2",
    })
}

export function getMusicList(){
    return service({
        method:"GET",
        url:"/personalized?limit=10",
    })
}
//搜索歌曲
export function getSearchList(data){
    return service({
        method:"GET",
        url:`/cloudsearch?keywords=${data}`,
    })
}
