<template>
  <AppInput
    :iValue="namePizza"
    :iLabel="true"
    iLabelClasses="input"
    @input="setPizzaByName($event)"
    name="pizza_name"
    placeholder="Введите название пиццы"
  >
    <span class="visually-hidden">Название пиццы</span>
  </AppInput>
</template>

<script>
import AppInput from "@/common/components/AppInput";

export default {
  name: "BuilderPizzaSearch",
  components: {
    AppInput,
  },
  data() {
    return {
      namePizza: "",
    };
  },
  methods: {
    setPizzaByName(e) {
      this.$emit("setPizzaByName", e);
    },
  },
};
</script>
