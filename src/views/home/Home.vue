<template>
  <div id="home">
    <nav-bar class="home-nav"> <div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabclick="tabclick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommend="recommend" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabclick="tabclick"
        ref="tabControl2"
      />
      <!-- <goods-list :goods="goods[currentType].list" /> -->
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
//子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

//公共组件
import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

//方法，额外数据
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListenerMixin }  from "common/mixin"

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: true,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0,
      // itemImgListener: null
    };
  },
   mixins:[itemListenerMixin],
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //记住：不要在created里用$refs
    //3.监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.itemImgListener=() => {
    //   refresh();
    // }
    // this.$bus.$on("itemImageLoad",this.itemImgListener)

    // console.log(111);

    // this.$bus.$on("itemImageLoad", () => {
    //   refresh();
      //  this.$refs.scroll && this.$refs.scroll.refresh();
    //});
  },
   deactivated(){
     this.$bus.$off('itemImgLoad',this.itemImgListener)
   },
  // destroy(){
  //   console.log('destroy');
  // },
  // activated(){
  //   console.log('activated');
  // //  this.$refs.scroll.refresh()
  //   this.$refs.scroll.scrollTo(0,this.saveY,0.01)
  // },
  // deactivated(){
  //   console.log('deactivated');  
  //   this.saveY=this.$refs.scroll.getScrollY();

  // },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    // 事件监听相关方法
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    backClick() {
      // console.log('backClick');
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // console.log(position);
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log("加载更多");
      this.getHomeGoods(this.currentType);
      // this.$refs.scroll.scroll.finishPullUp()
      this.$refs.scroll.finishPullUp();
      this.$refs.scroll.refresh(); //解决图片异步加载后撑高盒子，下边图片显示不全的bug
    },
    swiperImageLoad() {
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  /* home 100个视口 */
  position: relative;
}
.home-nav {
  background-color: rgb(230, 164, 175);
  color: #fff;

  /* position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* .content{
  height: calc(100%-93px);
  /* height: 300px; */
/* overflow: hidden;
  margin-top: 44px; */
/* }  */
</style>
