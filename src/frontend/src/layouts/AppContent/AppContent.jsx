import "@/layouts/AppContent/style/index.scss";
import { defineComponent, computed } from "@vue/composition-api";
import { getSlots } from "@/util/helpers";

export default defineComponent({
  name: "AppContent",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    postfix: {
      type: String,
      default: "wrapper",
    },
  },
  setup(props, { slots }) {
    const classes = computed(() => ({
      [`content__${props.postfix}`]: true,
    }));
    return () => {
      const TagContent = props.tag;
      return <TagContent class={classes.value}>{getSlots(slots)}</TagContent>;
    };
  },
});
