<template>
  <div id="app">
    <TheHeader />
    <Index />
  </div>
</template>

<script>
import Index from "@/views/Index.vue";
import TheHeader from "@/layouts/TheHeader/TheHeader";

export default {
  name: "App",
  components: {
    TheHeader,
    Index,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
