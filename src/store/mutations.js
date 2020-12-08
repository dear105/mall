import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types"
export default {
  /*  mutations: {
   addCart(state, payload) {
     //payload新添加的商品
     let oldProduct = state.cartList.find(item => payload.iid == item.iid)
     // let oldProduct = null;
     // for (let item of state.cartList) {
     //   if (payload.iid == item.iid) {
     //     oldProduct = item;
     //   }
     // }
 
     // let index = state.cartList.indexOf(payload)
     // if (index != -1) {
     //   let oldProduct = state.cartList[index];
     //   oldProduct.count += 1
     // } else {
 
     //2.判断oldProduct
     if (oldProduct) {
       oldProduct.count += 1
     } else {
       payload.count = 1;
       state.cartList.push(payload)
     }
     // state.cartList.push(payload)
   }
 }, */
  //mutations唯一的目的就是修改state中的状态
  // mutations用于跟踪,要保证每个方法尽可能完成的事情单一点
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true  //加进购物车时默认选中
    state.cartList.push(payload)
  }
}
