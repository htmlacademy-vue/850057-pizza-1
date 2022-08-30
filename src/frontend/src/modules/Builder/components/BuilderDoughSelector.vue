<template>
  <div class="content__dough">
    <div class="sheet">
      <AppHeading>Выберите тесто</AppHeading>

      <div class="sheet__content dough">
        <AppInput
          v-for="{ id, name, description } in dough"
          :key="id"
          :id="`${id}-dough`"
          :iValue="doughValues[id].value"
          :iLabel="true"
          :iLabelClasses="[
            'dough__input',
            `dough__input--${doughValues[id].value}`,
          ]"
          :checked="doughValues[id].checked"
          iName="dough"
          iInputClasses="visually-hidden"
          type="radio"
        >
          <b>{{ name }}</b>
          <span>{{ description }}</span>
        </AppInput>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeading from "@/common/components/AppHeading";
import AppInput from "@/common/components/AppInput";

export default {
  name: "BuilderDoughSelector",
  components: {
    AppHeading,
    AppInput,
  },
  props: {
    dough: {
      type: Array,
      require: true,
    },
    doughValues: {
      type: Object,
      require: true,
    },
  },
};
</script>
