<template>
  <div id="detail">
    <!-- {{ iid }} -->
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar />
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import { debounce } from "common/utils";
import { itemListenerMixin,backTopMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // itemImgListener: null
    };
  },
  mixins: [itemListenerMixin,backTopMixin],
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      //1.获取顶部轮播数据
      // console.log(res.result.itemInfo.topImages);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.创建店铺信息
      this.shop = new Shop(data.shopInfo);

      //4.保存商品详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      //1.第一次获取，值undefined：this.$refs.params.$el压根没有渲染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

      //  //2.第二次获取，值不对：图片没有计算在内
      //   //根据最新的数据，对应的DOM已经渲染出来，
      //   //但是图片依然没有加载完(目前获取到的offsetTop不包含其中图片)
      //   //一般offsetTop智不对，都是因为图片的问题
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
      //4.第四次，加入防抖
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        //console.log(this.themeTopYs);
      }, 100);
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  mounted() {
    //在mixim.js封装起来了
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.itemImgListener=() => {
    //   refresh();
    // }
    // this.$bus.$on("itemImageLoad",this.itemImgListener)
    // console.log(222);
  },
  // updated() {
  //   this.themeTopYs = [];
  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  //   console.log(this.themeTopYs);
  // },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },

  methods: {
    imageLoad() {
      // console.log('---------');
      this.$refs.scroll.refresh();
      // this.refresh()
      //4.第四次获取，值对
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    contentScroll(position) {
      // console.log(position);
      //1.获取y值
      const positionY = -position.y;
      //2.positionY和主题中值对比
      let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex != i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i == length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {

      //复杂判断hack做法：(空间换时间 ：执行性能，写代码时间)
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex != i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      
      //3.判断BackTop是否显示
       this.listenShowBackTop(position)
    },
  },
    
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
/* .detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100%-44px);
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>