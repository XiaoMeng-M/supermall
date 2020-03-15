<template>
    <div class="toast" v-show="isShow">
        {{message}}
    </div>
</template>

<script>
export default {
    name:"Toast",
    props:{
        // message:{
        //     type:String,
        //     default: ''
        // },
        // showToast:{
        //     type:Boolean,
        //     default:false
        // }
    },
    data(){
        return {
            message:'',
            isShow:false,
            isClick:true
        }
    },
    methods: {
        show(message,duration = 2000) { 
         if(this.isClick) {
            this.isClick = false,
            this.isShow = true,
            this.message = message,
            setTimeout(() => {
                this.isShow  = false,
                this.message = '',
                this.isClick = true
            }, duration);
         }
        }
}
}
</script>

<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left:50%;
        padding: 8px 10px;

        background-color: rgba(255, 102, 153, 0.75);
        color: #fff;
        z-index: 9;
        
        border-radius: 8%;
        transform: translate(-50%,-50%);
    }

</style>