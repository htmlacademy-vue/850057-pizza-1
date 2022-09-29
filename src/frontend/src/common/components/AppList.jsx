import { defineComponent } from "@vue/composition-api";
import AppListItem from "@/common/components/AppListItem";
import { getSlots } from "@/util/helpers";

export default defineComponent({
  name: "AppList",
  props: {
    tag: {
      type: String,
      default: "ul",
    },
    items: {
      type: Array,
    },
    classes: {
      type: [String, Array],
    },
  },
  setup(props, { slots }) {
    const TagList = `${props.tag}`;
    return () => {
      if (props.items && props.items.length) {
        const items = props.items.map((item) => {
          return <AppListItem>{item}</AppListItem>;
        });
        return <TagList class={props.classes}>{items}</TagList>;
      }
      return <TagList class={props.classes}>{getSlots(slots)}</TagList>;
    };
  },
});
