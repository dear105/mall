<template>
<div class="recommend">
   <div v-for="(item,index) in recommend" :key="index" class="recommend-item"> 
       <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
       </a>
   </div>
</div>
</template>
<script>
// @ is an alias to c
export default {
name: 'RecommendView',
props:{
  recommend:{
      type:Array,
      default(){
          return []
      },
  }
},
data() {
return {

}
},
components: {

}
}
</script>
<style scoped>
.recommend{
    display:flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom:8px solid #eee ;

}
.recommend-item{
    flex:1;
}
.recommend-item img{
    width: 62px;
    height: 62px;
    margin-bottom: 10px;
}
</style>