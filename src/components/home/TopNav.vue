<template>
    <div class="topNav">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
      <div class="topContent">
        <span>我的</span>
        <span class="active">发现</span>
        <span>原神</span>
        <span>视频</span>
      </div>
      <div class="topRight">
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')"> 
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>   
    </div>
  </template>
  
  <!--样式-->
  <style lang="less" scoped>
  .topNav {
    width: 100%;
    height: 1rem;
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: .36rem;
  }

  .active {
    font-weight: 900;
  }

</style>
