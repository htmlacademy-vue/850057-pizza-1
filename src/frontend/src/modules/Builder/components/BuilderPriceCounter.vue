<template>
  <AppContent postfix="result">
    <p>Итого: 0 ₽</p>
    <AppButton class="button" disabled>Готовьте!</AppButton>
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
};
</script>
