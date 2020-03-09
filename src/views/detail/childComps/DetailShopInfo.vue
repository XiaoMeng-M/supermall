<template>
    <div class="shop-info">
      <div class="shop-top">
        <img :src="shop.logo" alt="">
        <span class="title">{{shop.name}}</span>
      </div>

      <div class="shop-middle">
        <div class="shop-middle-left">

          <div class="info-sells">
            <div class="sells-count">{{shopSells}}</div>
            <div class="sells-text">总销量</div>
          </div>

          <div class="info-goods">
              <div class="goods-count">{{shop.goodsCount}}</div>
              <div class="goods-text">全部宝贝</div>
            </div>

          </div>
        <div class="shop-middle-right">
          <table>
            <tr v-for="(item,index) in shop.score" :key="index">
              <td>{{item.name}}</td>
              <td :class="{'better-score':item.isBetter}" class="score">{{item.score}}</td>
              <td :class="{'better-more':item.isBetter}" class="better">{{item.isBetter ? '高':'低'}}</td>
            </tr>
          </table>
        </div>
        </div>
      <div class="goStore">进店逛逛</div>
      </div>
</template>

<script>
    export default {
        name: "DetailShopInfo",
        props:{
          shop:{
            type:Object,
            default() {
              return {}
            }
          }
        },
        computed:{
          shopSells(){
            const sells = this.shop.sells
            return sells > 10000 ? (sells / 10000).toFixed(1) + '万' : sells
          }
        }

    }
</script>

<style scoped>
  .shop-info {
    margin-top:30px;
  }

  .shop-top img{
    width: 50px;
    height: 50px;
    border-radius: 50% 50%;
    vertical-align: middle;
    margin-left: 10px;
  }
  .shop-top span {
    margin-left: 10px;
    color: #000;
    font-weight: 300;
  }
  .shop-middle {
    display: flex;
  }
  .shop-middle-left {
    flex: 1;
    display: flex;
    color: #000;
    font-size: 20px;
  }
  .info-sells {
    flex: 1;
    padding-top: 20px;
    text-align: center;
  }
  .info-goods {
    flex: 1;
    text-align: center;
    padding-top: 20px;
  }
  .sells-text,.goods-text {
    font-size: 14px;
    margin-top: 10px;
  }



  .shop-middle-right::before {
    content: '';
    display: block;
    width: 1px;
    height: 60px;
    background-color: #92919c;
    position: absolute;
    left: 0;
    top: 10px;
  }
  .shop-middle-right {
    position: relative;
    flex: 1;
    font-size: 14px;

  }
  .shop-middle-right table{
    width: 130px;
    margin-left: 30px;
  }
  .shop-middle-right table td {
    padding: 5px 0;
  }



  .better {
    background-color: red;
    color: #fff;
  }
  .better-more {
    background-color: green;
  }
  .score {
    color: red;
  }
  .better-score {
    color: green;
  }
  .goStore {
    width: 150px;
    height: 30px;
    background-color: #f1f5fb;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 5px;
  }

</style>
