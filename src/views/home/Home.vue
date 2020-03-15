<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 :class="{fixed:isTabFixed}"
                 class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   :class="{fixed:isTabFixed}"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'  

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'

  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'

  import {debounce} from "common/utils";
  import {getHomeMultidata,getHomeGoods} from "network/home"

  import {itemListenerMixin,backTopMixin} from "common/mixin";

  export default {
        name: "Home",
        mixins:[itemListenerMixin,backTopMixin],
        components: {
          NavBar,
          HomeSwiper,
          HomeRecommendView,
          HomeFeatureView,
          TabControl,
          GoodsList,
          Scroll,
        },
        data(){
          return {
            banners:[],
            recommends:[],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]},
            },
            currentType:'pop',
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0,
          }
        },
        computed:{
          showGoods(){
            return this.goods[this.currentType].list
          }
        },
        created() {
          // 1.请求多个数据
          this.getHomeMultidata()
          // 请求商品数据
          this.getHomeGoods('pop')
          this.getHomeGoods('new')
          this.getHomeGoods('sell')
        },
        mounted(){
          //监听item中图片加载完成
          const refresh = debounce(this.$refs.scroll.refresh,200)
          this.itemImglistener = ()=>{
            refresh()
          }
          this.$bus.$on('itemImgLoad', this.itemImglistener)
        },
        activated(){
          this.$refs.scroll.scrollTo(0,this.saveY)
          this.$refs.scroll.refresh();

        },
        deactivated(){
          this.saveY = this.$refs.scroll.getScrollY()
          // 取消全局事件的监听
          this.$bus.$off("itemImgLoad",this.itemImglistener)
        },
        methods:{
          //事件监听相关方法


          tabClick(index){
            // console.log(index);
            switch (index) {
              case 0:
                this.currentType = 'pop'
                break;
              case 1:
                this.currentType = 'new'
                break;
              case 2:
                this.currentType = 'sell'
                break;
            }
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
          },
          //监听滚动时间
          contentScroll(position){
            //判断BackTop是否显示
            this.isShowBackTop = (-position.y) > 1000
            //判断tabbarControl是否吸顶
            this.isTabFixed = -(position.y) > this.tabOffsetTop
          },
          //上拉加载更多
          loadMore(){
            // console.log('加载更多');
            this.getHomeGoods(this.currentType)
            this.$refs.scroll.finishPullUp();
          },
          swiperImgLoad(){
            // 获取tabControl的offsetTop
            //所有的组件都有一个属性$el 用于获取组件中的元素
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
          },

          //网络请求相关方法
          getHomeMultidata(){
            getHomeMultidata().then(res=>{
              // console.log(res)
              // this.result = res
              this.banners = res.data.banner.list;
              this.recommends = res.data.recommend.list;
            })
          },
          getHomeGoods(type){
            const page = this.goods[type].page + 1;
            getHomeGoods(type,page).then(res=>{
              this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;
            })
          },

        }
  }

</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*使用浏览器原生滚动时 采用*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  #home {
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.fixed {*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
