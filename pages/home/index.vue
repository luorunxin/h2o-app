<template>
<div class="container">
  <div class="homeTop">
    <div class="Positioning">
      <div class="PositioningIcon">
        <van-icon size="2rem" color="#ff8000" name="location" />
        <h2>湖北省孝感市</h2>
      </div>
      <div>
        <van-icon size="2rem" name="scan" />
        <van-icon size="2rem" name="comment-o" class="ad1"/>
      </div>
    </div>
    <div class="search">
      <van-search shape="round" placeholder="请输入搜索关键词" />
    </div>
    <div class="Jiugongge">
      <van-grid>
        <van-grid-item icon="photo-o" text="美食" />
        <van-grid-item icon="photo-o" text="商超便利" />
        <van-grid-item icon="photo-o" text="水果" />
        <van-grid-item icon="photo-o" text="送药上门" />
      </van-grid>
    </div>
    <div class="ad">
      广告
    </div>
    <div class="page">
      <div>
        <van-tabs animated bind:change="onChange">
          <van-tab title="最新">最新</van-tab>
          <van-tab title="最火">最火</van-tab>
          <van-tab title="推荐">推荐</van-tab>
        </van-tabs>
      </div>
      <div></div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped lang="scss">
.Positioning {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 80% 20%;
  padding: 1rem 0.5rem;
  div:nth-child(2) {
    .ad1{
      color: red;
      margin-left: 2rem;
    }
  }
  .PositioningIcon {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 10% 90%;
  }
}
  .ad {
    height: 10rem;
    background: #FF8000;
    margin: 2rem 1.5rem;
  }
  .page {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 70% 30%;
  }
</style>
