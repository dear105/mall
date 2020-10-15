<template>
  <div>
      {{goods.title}}
      {{goods.newPrice}}
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
}
</script>
<style scoped>
</style>