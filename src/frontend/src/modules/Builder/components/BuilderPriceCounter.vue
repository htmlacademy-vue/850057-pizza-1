<template>
  <AppContent postfix="result">
    <p>Итого: {{ total }} ₽</p>
    <AppButton class="button" :disabled="total === 0">Готовьте!</AppButton>
  </AppContent>
</template>

<script>
import AppContent from "@/layouts/AppContent/AppContent";
import AppButton from "@/common/components/AppButton/AppButton";

export default {
  name: "BuilderPriceCounter",
  components: {
    AppContent,
    AppButton,
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
};
</script>
