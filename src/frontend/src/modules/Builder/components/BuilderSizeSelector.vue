<template>
  <div class="content__diameter">
    <div class="sheet">
      <AppHeading>Выберите размер</AppHeading>

      <div class="sheet__content diameter">
        <AppInput
          v-for="{ id, name } in sizes"
          :key="`${id}-sizes`"
          :id="id"
          :iValue="sizesValues[id].value"
          :iLabel="true"
          :iLabelClasses="[
            'diameter__input',
            `diameter__input--${sizesValues[id].value}`,
          ]"
          :checked="sizesValues[id].checked"
          iInputClasses="visually-hidden"
          type="radio"
          iName="diameter"
        >
          <span>{{ name }}</span>
        </AppInput>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeading from "@/common/components/AppHeading";
import AppInput from "@/common/components/AppInput";

export default {
  name: "BuilderSizeSelector",
  components: {
    AppHeading,
    AppInput,
  },
  props: {
    sizes: {
      type: Array,
      require: true,
    },
    sizesValues: {
      type: Object,
      require: true,
    },
  },
};
</script>
