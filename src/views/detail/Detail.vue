<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
      <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detai-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
        <detail-params-info :paramInfo="paramInfo" ref="params"/>
        <detail-rate :rate="rate" ref="rate"/>
        <goods-list :goods="recommends" ref="goodList"/>
      </scroll>
        <detail-bottom-bar @addToCart="addToCart"/>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetaiGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import DetailRate from './childComps/DetailRate'

  import Scroll from 'components/common/scroll/Scroll'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import GoodsList from "components/content/goods/GoodsList";
  import {getRecommend,getDetail} from "network/detail";
  import {Goods,Shop,GoodsParam} from "network/detail";

  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {debounce} from "../../common/utils";

  export default {
        name: "Detail",
        mixins:[itemListenerMixin,backTopMixin],
        data(){
          return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            rate:{},
            recommends:[],
            itemImglistener:null,
            refresh:null,
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
            realPrice:0
          }
        },
        components:{
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          DetaiGoodsInfo,
          Scroll,
          DetailParamsInfo,
          DetailRate,
          GoodsList,
          DetailBottomBar,
        },
        created() {
          //保存传入的iid
          this.iid = this.$route.params.iid;

          // 2.根据iid请求数据
          getDetail(this.iid).then(res=>{
            const data = res.result;
            this.topImages = res.result.itemInfo.topImages;

            //获取商品详情的信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

            //创建店铺信息的对象
            this.shop = new Shop(data.shopInfo);

            //保存商品的详情数据
            this.detailInfo = data.detailInfo;

            //获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);

            //获取用户评价
            this.rate = data.rate;
            if (data.rate.cRate !== 0) {
              this.rate = data.rate.list[0]
            }
            //
            // this.$nextTick(()=>{
            //   this.themeTopYs = []
            //   this.themeTopYs.push(0)
            //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //   this.themeTopYs.push(this.$refs.rate.$el.offsetTop)
            //   this.themeTopYs.push(this.$refs.goodList.$el.offsetTop)
            //   console.log(this.themeTopYs);
            // })
            //给getThemeTopY赋值
            this.getThemeTopY = debounce(()=>{
              this.themeTopYs = []
              this.themeTopYs.push(0)
              this.themeTopYs.push(this.$refs.params.$el.offsetTop)
              this.themeTopYs.push(this.$refs.rate.$el.offsetTop)
              this.themeTopYs.push(this.$refs.goodList.$el.offsetTop)
            })
          });

          getRecommend().then(res=>{
            this.recommends = res.data.list
          })
        },
        destroyed(){
          this.$bus.$off('itemImgLoad',this.itemImglistener)
        },

        methods:{
          imageLoad(){
            this.refresh();
            this.getThemeTopY();
          },
          titleClick(index) {
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
          },
          contentScroll(position){
            // console.log(position);
            // 获取y值
            const positionY = -position.y;
            //和主题中的值进行对比  看显示出哪一个值.
            let length = this.themeTopYs.length;
            for(let i = 0; i<length; i++){
              if (this.currentIndex !== i && ((i < length -1  && positionY >= this.themeTopYs[i]) && positionY <
                this.themeTopYs[i+1]|| (i === length-1 && positionY >= this.themeTopYs[i]))) {
                this.currentIndex = i
                this.$refs.nav.currentIndex = this.currentIndex;
              }
            }
            //判断BackTop是否显示
            this.isShowBackTop = - position.y > 1000
          },
          addToCart(){
            // 1.获取当前商品的信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid  = this.iid;

            //将商品添加到购物车
            // this.$store.commit('addCart',product)
            this.$store.dispatch('addCart',product)
          }
        }
    }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
