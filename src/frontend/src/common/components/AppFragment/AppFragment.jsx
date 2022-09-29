import { Fragment } from "vue-frag";
import { defineComponent } from "@vue/composition-api";
import { getSlots } from "@/util/helpers";

export default defineComponent({
  name: "AppFragment",
  inheritAttrs: false,
  setup(props, { slots }) {
    return () => {
      return <Fragment>{getSlots(slots)}</Fragment>;
    };
  },
});
