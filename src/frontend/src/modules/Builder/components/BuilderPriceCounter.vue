<template>
  <div class="content__result">
    <p>Итого: 0 ₽</p>
    <AppButton class="button" disabled>Готовьте!</AppButton>
  </div>
</template>

<script>
import AppButton from "@/common/components/AppButton";

export default {
  name: "BuilderPriceCounter",
  components: {
    AppButton,
  },
};
</script>
