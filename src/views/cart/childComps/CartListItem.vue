<template>
    <div id="shop-item">
       <div class="item-selector">
           <checkButton :isCheck="product.check" @click.native='checkClick'/>
       </div>
       <div class="item-img">
           <img :src="product.image" alt="商品图片">
       </div>
       <div class="item-info">
           <div class="item-title">{{product.title}}</div>
           <div class="item-desc">{{product.desc}}</div>
           <div class="item-bottom">
               <div class="item-price left">￥{{product.price}}</div>
               <div class="item-count right">×{{product.count}}</div>
           </div>
       </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    name:'CartListItem',
    components:{
        CheckButton
    },
    props:{
        product:{
            type:Object,
            default () {
                return {}
            }
        }
    },
    methods:{
        checkClick(){
            this.product.check = !this.product.check
        }
    }
}
</script>

<style scoped>
    #shop-item {
        width: 100%;
        display: flex;
        font-size: 0;
        padding: 5px;
        border-bottom: 1px solid #ccc;
    }
    .item-selector {
        width:20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .item-img {
        padding: 5px;
    }
    .item-img img {
        width: 80px;
        height: 100px;
        display: block;
        border-radius: 5px;
    }

    .item-info {
        font-size: 17px;
        clear: #333;
        padding: 5px 10px;
        position: relative;
        overflow: hidden;
    }
    .item-title, .item-desc {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .item-info, .item-desc {
        font-size: 14px;
        color: #666;
        margin-top: 15px;
    }
    .item-bottom {
        margin-top: 10px;
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
    }
    .intem-bottom,.item-price {
        color:orangered;
    }


</style>