import {debounce} from "./utils";
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin ={
  data(){
    return {
        itemImglistener:null,
        refresh:null
    }
  },
  mounted(){
    this.refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImglistener = ()=>{
      this.refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImglistener)
  }
}
export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop:false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}
