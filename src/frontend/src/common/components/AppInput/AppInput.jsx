import "@/common/components/AppInput/style/index.scss";
import { defineComponent, computed, toRefs } from "@vue/composition-api";
import { v4 as uuidv4 } from "uuid";
import { getSlots } from "@/util/helpers";
import inputProps from "@/common/components/AppInput/AppInputProps";
import AppFormError from "@/common/components/AppFormError/AppFormError";

export default defineComponent({
  name: "AppInput",
  inheritAttrs: false,
  props: inputProps(),
  setup(props, { emit, slots }) {
    const {
      type,
      id,
      iLabel,
      preText,
      iInputClasses,
      iLabelClasses,
      iName,
      iValue,
      placeholder,
      autofocus,
      checked,
      focused,
      error,
    } = toRefs(props);
    const genId = computed(() => id.value || uuidv4());
    const hasLabel = computed(() => iLabel.value);
    const preTextAvailable = computed(() => {
      if (!hasLabel.value) {
        return false;
      }

      if (!preText.value) {
        return false;
      }

      return preText.value;
    });

    const changeHandler = (e) => {
      emit("change", e);
    };
    const focusHandler = (e) => {
      emit("focus", e);
    };
    const blurHandler = (e) => {
      emit("blur", e);
    };
    const inputHandler = (e) => {
      emit("input", e);
    };
    const mouseDownHandler = (e) => {
      emit("mousedown", e);
    };
    const mouseUpHandler = (e) => {
      emit("mouseup", e);
    };

    return () => {
      const input = (
        <input
          type={type.value}
          class={iInputClasses.value}
          name={iName.value}
          id={genId.value}
          value={iValue.value}
          placeholder={placeholder.value}
          autofocus={autofocus.value}
          checked={checked.value}
          focused={focused.value}
          error={error.value}
          vOn:change={changeHandler}
          vOn:input={inputHandler}
          vOn:focus={focusHandler}
          vOn:blur={blurHandler}
          vOn:mousedown={mouseDownHandler}
          vOn:mouseup={mouseUpHandler}
        />
      );
      if (hasLabel.value) {
        return (
          <label class={iLabelClasses.value} for={genId.value}>
            {preTextAvailable.value && getSlots(slots)}
            {input}
            {!preTextAvailable.value && getSlots(slots)}
            <AppFormError error={error.value} />
          </label>
        );
      }
      return input;
    };
  },
});
