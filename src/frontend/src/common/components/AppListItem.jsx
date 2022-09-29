import { defineComponent } from "@vue/composition-api";
import { getSlots } from "@/util/helpers";

export default defineComponent({
  name: "AppListItem",
  props: {
    tag: {
      type: String,
      default: "li",
    },
    classes: {
      type: [String, Array],
    },
  },
  setup(props, { slots }) {
    return () => {
      const TagListItem = `${props.tag}`;
      return <TagListItem class={props.classes}>{getSlots(slots)}</TagListItem>;
    };
  },
});
