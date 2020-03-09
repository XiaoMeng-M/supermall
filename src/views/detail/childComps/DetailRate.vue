<template>
    <div class="detail-rate" v-if="rate">
        <div class="info-header">
          <div class="header-title">用户评价</div>
          <div class="header-more">更多</div>
        </div>
        <div class="info-user" v-if="rate.user">
          <img :src="rate.user.avatar" alt="">
          <span>{{rate.user.uname}}</span>
        </div>
        <div class="info-detail">
          <p>{{rate.content}}</p>
          <div class="info-other" v-if="rate.created">
            <span class="data">{{rate.created | showDate}}</span>
            <span>{{rate.style}}</span>
          </div>
          <div class="info-images">
            <img :src="item" alt="" v-for="(item,index) in rate.images" :key="index">
          </div>
        </div>
    </div>
</template>

<script>
  import {formatData} from "common/utils";

  export default {
        name: "DetailRate",
        props:{
          rate:{
            type:Object,
            default() {
              return {};
            }
          }
        },
        filters:{
          showDate(value){
             //将时间戳转成date对象
            const date = new Date(value * 1000);
            return formatData(date,'yyyy-MM-dd')
          }
        }

    }
</script>

<style scoped>
  .info-header {
    display: flex;
    margin-top: 5px;
    border-top: 2px solid #ccc;
    padding: 10px 0;
    border-bottom: 1px solid #e6e6e6;
  }
  .header-title {
    text-align: left;
    flex: 1;
    margin-left: 10px;
  }
  .header-more {
    text-align: right;
    flex: 1;
    margin-right: 20px;
  }
  .info-user img {
    width: 30px;
    height: 30px;
    margin-top: 10px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .info-user span {
    margin-left: 10px;
    font-size: 12px;
  }
  .info-detail p{
    margin-top: 10px;
    text-indent: 20px;
  }
  .info-other {
    font-size: 13px;
    margin-top: 10px;
  }
  .data {
    padding:0 10px;
  }
  .info-images {
    margin-top: 10px;
  }
  .info-images img {
    width: 100px;
    height: 100px;
    margin-left: 10px;
  }
</style>
