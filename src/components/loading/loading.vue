<template>
<div class="loading">
  <img src="./loading.gif" width="24" height="24" alt="">
  <p class="desc">{{title}}</p>
</div>

</template>

<script>
    export default {
      props:{
        title:{
          type:String,
          default:'正在载入...'
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>

  .loading
    width 100%
    text-align: center
    .desc
      line-height 20px
      font-size 12px
      color: #ddd
</style>
