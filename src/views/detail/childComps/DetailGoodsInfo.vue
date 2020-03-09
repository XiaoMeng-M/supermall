<template>
  <div class="detail-goods-info" v-if="detailInfo,detailInfo.detailImage" >
      <div class="info-desc">{{detailInfo.desc}}</div>
      <div class="info-key" >{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list" >
        <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index"  :src="item" alt="" @load="imgLoad">
      </div>
  </div>

</template>

<script>
    export default {
        name: "DetailGoodsInfo",
        props: {
          detailInfo: {
            type: Object,

          },
        },
        data(){
          return {
            counter:0,
            imagesLength:0
            }
          },
        methods:{
            imgLoad(){
              //判断所有的图片都加载完了  然后进行回调
              this.counter += 1
              if (this.counter === this.imagesLength){
                this.$emit('imageLoad')
              }
            }
          },
        watch:{
          detailInfo(){
            this.imagesLength = this.detailInfo.detailImage[0].list.length
        }
      }

    }
</script>

<style scoped>

  .detail-goods-info {
    margin-top: 30px;
  }
  .info-desc {
    text-indent: 20px;
    color: #000;
    font-size: 14px;
  }
  .info-key {
    color: #000;
    font-weight: 900;
    font-size: 18px;
    margin: 10px 0;
  }
  .info-list img {
    width: 100%;
  }

</style>
