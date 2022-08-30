import { BUTTON_TYPE } from "@/common/constants/";
import { getSlot } from "@/util/helpers";

export default {
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
  methods: {
    clickHandler(e) {
      this.$emit("click", e);
    },
  },
  render() {
    return (
      <button
        type={this.type}
        class={this.classes}
        vOn:click={this.clickHandler}
        disabled={this.disabled}
      >
        {getSlot(this) ? getSlot(this) : "Отправить"}
      </button>
    );
  },
};
