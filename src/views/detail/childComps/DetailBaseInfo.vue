<template>
    <div class="detail-base-info" v-if="Object.keys(goods).length !== 0">
      <div class="info-title" >{{goods.title}}</div>
      <div class="info-price">
        <span class="new-price">{{goods.newPrice}}</span>
        <span class="old-price">{{goods.oldPrice}}</span>
        <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-services">
        <span class="info-services-item" v-for="index in goods.services.length - 1 " :key="index">
          <img :src="goods.services[index - 1].icon" alt="">
          <span>{{goods.services[index - 1].name}}</span>
        </span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
        props:{
          goods:{
            type:Object,
            default(){
              return {}
            }
          }
        },
    }
</script>

<style scoped>
  .info-title {
    font-size: 16px;
    text-indent: 25px;
    font-weight: 500;
    color: #000;
    margin-top: 10px;
    line-height: 20px;
  }
  .info-price {
    margin-top: 5px;
    height: 40px;
    line-height: 40px;
  }
  .new-price {
    font-size: 20px;
    color: var(--color-high-text);
    margin-right: 5px;
    margin-left: 10px;
  }
  .old-price {
    font-size: 15px;
    text-decoration: line-through;
    color: #ccc;
  }
  .discount {
    display: inline-block;
    width: 50px;
    height: 25px;
    background-color: var(--color-high-text);
    color: #fff;
    border-radius: 25px 25px;
    text-align: center;
    line-height: 25px;
    margin-bottom:20px;
    margin-left: 10px;
    font-size: 10px;
    vertical-align:middle;
  }
  .info-other{
    display: flex;
    margin-top: 10px;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 10px;
  }
  .info-other span {
    flex: 1;
    font-size: 13px;
    color: #a6a6a6;
  }
  .info-other span:nth-child(1) {
    margin-left: 10px;
  }
  .info-other span:nth-child(2) {
    text-align: center;
  }
  .info-other span:nth-child(3) {
    text-align: right;
    padding-right: 5px;
  }
  .info-services {
    margin-top:20px;
    display: flex;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 20px;
  }
  .info-services img {
    width: 10px;
    height: 10px;
  }
  .info-services-item {
    font-size: 10px;
    flex: 1;
    display: inline-block;
    text-align: center;
  }


</style>
