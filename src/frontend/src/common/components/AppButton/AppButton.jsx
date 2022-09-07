import "@/common/components/AppButton/style/index.scss";
import { defineComponent } from "@vue/composition-api";
import { BUTTON_TYPE } from "@/common/constants/";
import { getSlots } from "@/util/helpers";

export default defineComponent({
  name: "AppButton",
  props: {
    type: {
      type: String,
      default: "button",
      validator: function (val) {
        return BUTTON_TYPE.includes(val);
      },
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, { emit, slots }) {
    const clickHandler = (e) => {
      emit("click", e);
    };

    return () => {
      return (
        <button
          type={props.type}
          class={props.classes}
          vOn:click={clickHandler}
          disabled={props.disabled}
        >
          {getSlots(slots) ? getSlots(slots) : "Отправить"}
        </button>
      );
    };
  },
});
