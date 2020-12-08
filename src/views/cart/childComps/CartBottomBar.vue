<!--
 * @Author: your name
 * @Date: 2020-10-26 12:32:44
 * @LastEditTime: 2020-12-08 14:38:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mall\src\views\cart\childComps\CartBottomBar.vue
-->
<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      />
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
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => item.checked)
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length == 0) return false;
      //1.使用filter,性能不高，全部查一遍
      //  return !(this.cartList.filter(item =>!item.checked).length)
      //  2.使用find
      return !this.cartList.find(item => !item.checked);
      // 3.普通遍历
      //   for (let item of this.cartList) {
      //     if (!item.checked) {
      //       return false;
      //     }
      //   }
      //   return true;
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
    }
  }
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
