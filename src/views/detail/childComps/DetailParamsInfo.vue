<template>
    <div class="detail-params-info">
      <table v-for="(table,index) in paramInfo.size" class="info-size" :key="index" border="1" cellspacing="0">
        <tr v-for="(tr,indey) in table" :key="indey">
          <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
        </tr>
      </table>
      <table class="info-param" border="1" cellspacing="0">
        <tr v-for="(info,index) in paramInfo.infos" :key="index">
          <td class="info-key">{{info.key}}</td>
          <td class="info-value">{{info.value}}</td>
        </tr>
      </table>
      <div class="info-img" v-if="paramInfo.image">
        <img :src="paramInfo.image" alt="">
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailParamsInfo",
        props:{
          paramInfo:{
            type:Object,
            default(){
              return {}
            }
          }
        }
    }
</script>

<style scoped>
  .info-size {
    width: 100%;
    border: 1px solid #ccc;
    font-size: 14px;
    text-align: center;
    margin-bottom: 10px;
  }
  .info-size td:first-child {
    width: 50px;
    color: red;
  }
  .info-size td {
    padding: 5px;
  }
  .info-param {
    border: 1px solid #ccc;
    color: #7b7b7b;
  }

  .info-key {
    width: 50px;
    text-align: center;
  }
  .info-img img{
    width: 100%;
  }

</style>
