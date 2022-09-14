<template>
  <div class="counter counter--orange ingredients__counter">
    <AppButton
      :disabled="isDisabledMin"
      @click="decreaseHandler($event)"
      @keyup.enter="decreaseHandler($event)"
      class="counter__button counter__button--minus"
    >
      <span class="visually-hidden">Меньше</span>
    </AppButton>
    <AppInput
      :iValue="localAmount"
      :disabled="disabled"
      name="counter"
      class="counter__input"
    />
    <AppButton
      :disabled="isDisabledMax"
      @click="increaseHandler($event)"
      @keyup.enter="increaseHandler($event)"
      class="counter__button counter__button--plus"
    >
      <span class="visually-hidden">Больше</span>
    </AppButton>
  </div>
</template>

<script>
import "@/common/components/AppItemCounter/style/index.scss";
import { computed, ref } from "@vue/composition-api";
import AppInput from "@/common/components/AppInput/AppInput";
import AppButton from "@/common/components/AppButton/AppButton";

export default {
  name: "AppItemCounter",
  inheritAttrs: false,
  components: {
    AppInput,
    AppButton,
  },
  props: {
    name: {
      type: String,
    },
    id: {
      type: [Number, String],
    },
    amount: {
      type: [Number, String],
      default: 0,
    },
    min: {
      type: [Number, String],
      default: 1,
    },
    max: {
      type: [Number, String],
      default: 99,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const localAmount = ref(props.amount);
    const isDisabledMin = computed(
      () => localAmount.value < props.min || props.disabled
    );
    const isDisabledMax = computed(
      () => localAmount.value >= props.max || props.disabled
    );
    const increaseHandler = () => {
      if (props.disabled || isDisabledMax.value) {
        return false;
      }
      localAmount.value = Number(localAmount.value) + Number(props.step);
      // const payload = { value: localAmount.value, id: props.id, name: props.name };
      const payload = {
        value: localAmount.value,
        id: props.id,
        name: props.name,
      };
      emit("increase", payload);
    };
    const decreaseHandler = () => {
      if (props.disabled || isDisabledMin.value) {
        return false;
      }
      localAmount.value = Number(localAmount.value) - Number(props.step);
      const payload = {
        value: localAmount.value,
        id: props.id,
        name: props.name,
      };
      emit("decrease", payload);
    };

    // watch(props.amount, (newVal) => {
    //   localAmount.value = newVal;
    // });

    return {
      localAmount,
      isDisabledMin,
      isDisabledMax,
      increaseHandler,
      decreaseHandler,
    };
  },
};
</script>
