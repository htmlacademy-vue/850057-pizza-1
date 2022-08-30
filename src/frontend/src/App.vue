<template>
  <div id="app">
    <AppHeader />
    <Index />
  </div>
</template>

<script>
import Index from "@/views/Index.vue";
import AppHeader from "@/layouts/AppHeader";

export default {
  name: "App",
  components: {
    AppHeader,
    Index,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
