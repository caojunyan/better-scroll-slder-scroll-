<!--
<template>
   <div class="slider_box">
     <div class="slide" ref="slider">
        <div class="slider-group" ref="slideGroup">
          <slot></slot>
        </div>
       <div class="dots">
         <span class="dot" :class="{dotActive:currentPageIndex===index}" v-for="(item,index) in dots"></span>
       </div>
     </div>
   </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props:{
      loop:{
        type:Boolean,
        default:true
      },
      autoPlay:{
        type:Boolean,
        default:true
      },
      interval:{
        type:Number,
        default:10000
      }
    },
    data(){
      return{
        dots:[],
        currentPageIndex:0
      }
    },
    mounted(){
      this.setSliderWidth() //设置轮播图宽度
      this.init();
      if(this.autoPlay){
        this.play()
      }
    },
    methods:{
      setSliderWidth(){
        this.children=this.$refs.slideGroup.children;
        this.dots=new Array(this.children.length)
        let width=0;
        let sliderWidth=this.$refs.slider.clientWidth;
        for(let i=0;i<this.children.len;i++){
          width+=2*sliderWidth
        }
        this.$refs.slideGroup.style.width=width+'px'
      },
      init(){
        var vm=this;
        //实例化scroll
        this.scroll=new BScroll(this.$refs.slider,{
          scrollX:true,
          scrollY:false,
          momentum:false,//关闭或打开惯性运动的执行
          snap:true,//隔断（翻页）
          snapLoop:this.loop,//无限循环
          snapThreshold:0,
          snapSpeed:400,//滑动的时间
        })
        this.scroll.on('scrollEnd',()=>{
          let pageIndex=this.scroll.getCurrentPage().pageX
          if(this.loop){
            pageIndex-=1
          }
          this.currentPageIndex=pageIndex
          if(vm.autoPlay){
            vm.play();
          }
        })
        this.scroll.on('beforeScrollStart',()=>{
          if(vm.autoPlay){
            clearTimeout(vm.timer);
          }
        })

      },
      play(){
        let pageIndex=this.currentPageIndex+1;
        if(this.loop){
          pageIndex+=1
        }
        var vm=this;
        this.timer=setTimeout(()=>{
          vm.scroll.goToPage(pageIndex,0,40)//跳转到的页面  初始化的页面 华东的总时间
        },vm.interval)
      }
    }
  }
</script>

<style scoped lang="less">
  .slide{
    width: 100%;
    overflow: hidden;
    height: 150px;
    position: relative;
  }
  .slide-group{
    height: 150px;
    background: red;
    .slider-item{
      width:100vw;
      height: 150px;
      background: yellowgreen;
      float: left;
      &:nth-type-of(1){
        background: red;
      }
    }
  }
  .dots{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    text-align: center;
    .dot{
      background: rgba(255,255,255,.5);
      display: inline-block;
      margin: 0 4px;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      &.dotActive{
        width: 20px;
        border-radius: 5px;
        background: rgba(255,255,255,0.8);
      }
    }
  }
</style>
-->


<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script>
  import {addClass} from '../common/js/dom'
  import BScroll from 'better-scroll'
  export default{
    data() {
      return {
        dots:[],
        currentPageIndex: 0
      }
    },
    props:{
      loop:{
        type:Boolean,
        default:true
      },
      autoPlay:{
        type:Boolean,
        default:true
      },
      interval:{
        type: Number,
        default:4000
      }
    },
    mounted() {
      this._setSliderWidth()
      setTimeout(() => {
        // 在初始化slider前初始化dot
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 监听窗口大小改变时间
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods:{
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        // slider 可见宽度
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // 设置每个子元素的样式及高度
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          // 计算总宽度
          width += sliderWidth
        }
        // 循环播放首尾各加一个,因此总宽度还要加两倍的宽度
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          // click:true
        })
        // 监听滚动结束时间获取pageX
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            // 由于bscroll循环播放首尾各加一个,因此索引-1
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            this._play()
          }
        })
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _initDots() {
        // 长度为n的空数组
        this.dots = new Array(this.children.length)
      },
      _play() {
        // currentPageIndex为不含首尾副本的索引，因此若有循环要+2
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    // 生命周期destroyed销毁清除定时器，有利于内存释放
    destroyed() {
      clearTimeout(this.timer)
    },
  }
</script>
<style scoped>
  .slider{
    min-height: 1px;
    position: relative;
  }

  .slider-group{
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }

  .slider-item{
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    height: 150px;
    overflow: hidden;
  }

  .slider-item a{
    display: block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }


  .slider-item img{
    display: block;
    width: 100%;
  }

  .dots{
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
  }

  .dot{
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
  }

  .active{
    width: 20px;
    border-radius: 5px;
  }
</style>
