<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" />
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import { getters, mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #eeeeee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 20px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  line-height: 20px;
}
.price {
  flex: 1;
  margin-left: 30px;
}
.calculate {
  width: 90px;
  text-align: center;
  background-color: red;
  color: #fff;
}
</style>
