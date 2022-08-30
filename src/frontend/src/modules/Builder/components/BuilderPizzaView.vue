<template>
  <div class="content__constructor" v-on="currentListeners">
    <div class="pizza pizza--foundation--big-tomato">
      <div class="pizza__wrapper">
        <div
          v-for="(filling, i) in fillings"
          :class="`pizza__filling pizza__filling--${filling}`"
          :key="`${i}-${filling}`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    fillings: {
      type: [String, Array, Set],
      default: () => [],
    },
  },
  computed: {
    currentListeners() {
      return this.$listeners;
    },
  },
};
</script>
