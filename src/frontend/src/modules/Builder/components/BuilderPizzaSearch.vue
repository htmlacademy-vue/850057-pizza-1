<template>
  <component
    :is="inputComponent"
    :iValue="iValue"
    :iLabel="true"
    :error="error"
    iLabelClasses="input"
    :recognition="getRecognition"
    @change="setPizzaByName($event)"
    @input="setPizzaByName($event)"
    @update:iValue="setPizza($event)"
    @update:error="getError($event)"
    name="pizza_name"
    placeholder="Введите название пиццы"
  >
    <span class="visually-hidden">Название пиццы</span>
  </component>
</template>

<script>
import AppInput from "@/common/components/AppInput/AppInput";
import AppInputVoiceCntrl from "@/common/components/AppInput/AppInputVoiceCntrl";

export default {
  name: "BuilderPizzaSearch",
  props: {
    iValue: {
      type: String,
    },
    error: {
      type: String,
    },
  },
  data() {
    return {
      iError: "",
    };
  },
  components: {
    AppInputVoiceCntrl,
    AppInput,
  },
  computed: {
    getRecognition() {
      return window.SpeechRecognition || window.webkitSpeechRecognition;
    },
    inputComponent() {
      if (this.getRecognition) {
        return "AppInputVoiceCntrl";
      }
      return "AppInput";
    },
  },
  methods: {
    onChange(e) {
      console.log(e);
    },
    setPizzaByName(e) {
      this.$emit("setPizzaByName", e);
    },
    setPizza(e) {
      this.$emit("update:iValue", e);
    },
    getError(e) {
      this.$emit("update:error", e);
    },
  },
  updated() {
    console.log(this.iValue);
  },
};
</script>
