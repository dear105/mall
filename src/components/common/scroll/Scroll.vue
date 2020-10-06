<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //不要使用这种方法，有多个wrapper 时不好确认
    //   this.scroll=new BScroll(document.querySelector('.wrapper'))
    this.scroll = new BScroll(this.$refs.wrapper, {
        click:true
    });
    // this.scroll.scrollTo(0,0);
  },
  methods:{
      scrollTo(x,y,time=300){
          this.scroll.scrollTo(x,y,time)
      }
  }
};
</script>
<style >
</style>