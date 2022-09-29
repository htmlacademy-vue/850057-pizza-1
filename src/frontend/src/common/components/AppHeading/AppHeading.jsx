import "@/common/components/AppHeading/style/index.scss";
import { defineComponent } from "@vue/composition-api";
import { HEADING_LEVEL } from "@/common/constants/";
import { getSlots } from "@/util/helpers";

export default defineComponent({
  name: "AppHeading",
  props: {
    level: {
      type: String,
      default: "2",
      validator: function (val) {
        return HEADING_LEVEL.includes(val);
      },
    },
    classes: {
      type: [String, Array],
      default: () => ["title", "title--small", "sheet__title"],
    },
    loading: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    return () => {
      const TagHeading = `h${props.level}`;
      return <TagHeading class={props.classes}>{getSlots(slots)}</TagHeading>;
    };
  },
});
