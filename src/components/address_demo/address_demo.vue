<template>
  <address-pick :show="addressShow"
                :selectData="pickData3"
                v-on:cancel="close"
                v-on:confirm="confirm"></address-pick>
</template>

<script>
  import AddressPick from '../address/address-picker'
  import {provs_data,citys_data,dists_data} from "../address/areaData";
    export default {
        name: "address_demo",
      data(){
          return{
            addressShow:true,
            pickData3:{
              columns:3,
              link:true,
              pData1:provs_data,
              pData2:citys_data,
              pData3:dists_data
            },
          }
      },
      methods: {
        close(){
          this.addressShow=false
        },
        confirm(e){
          console.log(e)
        }
      },
      components:{
        AddressPick
      }
    }
</script>

<style scoped>

</style>
