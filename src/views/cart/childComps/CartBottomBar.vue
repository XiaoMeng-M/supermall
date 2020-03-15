<template>
    <div class="cart-bottom-bar">
       <div class="check-content">
            <check-button :is-check="isSelectAll" class="check-button" @click.native="checkClick"/>
            <span class="check-text">全选</span>
       </div>
       <div class="total-price">
           合计:{{totalPrice}}
       </div>
       <div class="calculate" @click="calClick">
           结算({{checkLength}})
       </div>
    </div>
    
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"
  import { mapGetters } from 'vuex'
export default {
    name:"CartBottomBar",
    components:{
        CheckButton
    },
    computed:{
        ...mapGetters(['cartList']),
        totalPrice(){
            return "￥" + this.cartList.filter(item => {
                return item.check
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2);
        },
        checkLength(){
            return this.cartList.filter(item => {
                return item.check 
            }).length;
        },
        isSelectAll(){
            if(this.cartList.length == 0) return false 
                //    return !(this.cartList.filter(item => !item.check).length)
            return !this.cartList.find(item => !item.check)
        }
    },
    methods:{
        checkClick(){
            if(this.isSelectAll) {
                this.cartList.forEach(item => item.check = false)
            } else {
                this.cartList.forEach(item => item.check = true)
            }
        },
        calClick(){
            if(!this.isSelectAll) {
                this.$toast.show('您还没有选择商品',1500)
            }
        }
    }
}
</script>

<style scoped>
    .cart-bottom-bar {
        height: 40px;
        position: relative;
        background-color: #eee; 
        line-height: 40px;
        display: flex;
    }
    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 57px;
    }
    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .total-price {
        margin-left: 20px;
        flex: 1;
    }
    .calculate {
        width:90px;
        background-color: rgb(245, 104, 127);
        color: #fff;
        text-align: center;
        font-size: 18px;
        letter-spacing: 1px;
    }

</style>