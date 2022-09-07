import "@/layouts/AppMain/style/index.scss";
import { defineComponent } from "@vue/composition-api";
import { getSlots } from "@/util/helpers";

export default defineComponent({
  name: "AppMain",
  props: {
    tag: {
      type: String,
      default: "main",
    },
    classes: {
      type: [String, Array],
      default: () => ["content"],
    },
  },
  setup(props, { slots }) {
    return () => {
      const TagMain = props.tag;
      return <TagMain class={props.classes}>{getSlots(slots)}</TagMain>;
    };
  },
});
