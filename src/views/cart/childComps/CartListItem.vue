<template>
  <div>
      <h2>{{product}}</h2>
  </div>
</template>
<script>
export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return 0;
      },
    },
  },
};
</script>
<style scoped>
</style>