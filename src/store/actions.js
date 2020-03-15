import { ADD_COUNTER,ADD_TO_CART } from "./mutation-types";

export default {
    addCart(context,payload){
      return new Promise((resove,reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldProduct) {
        // oldProduct.count += 1
          context.commit('ADD_COUNTER',oldProduct)
          resove('商品的数量 + 1')
        }else {
          payload.count = 1;
          // context.state.cartList.push(payload)
          context.commit("ADD_TO_CART",payload)
          resove('添加了新的商品')
      }
      })
    }
  }