import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Recommend from '../components/recommend/recommend'
import Address from '../components/address_demo/address_demo'
import Data from '../components/data_picker/data_picker'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      component: Recommend
    },
    {
      path:'/address',
      name:'address_demo',
      component:Address
    },
    {
      path:'/data',
      name:'data_picker',
      component:Data
    }
  ]
})
