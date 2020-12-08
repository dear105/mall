<template>
  <div>
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <!-- <div slot="center">购物车({{$store.state.cartList.length }})</div> -->
      <!-- <div slot="center">购物车({{ cartLength }})</div> -->
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
     <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex"; //注意这里是从vuex不是从getters.js导入

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    //两种写法
    //...mapGetters(['cartLength'], ['cartList']),
    ...mapGetters({ length: "cartLength", list: "cartList" }),
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
