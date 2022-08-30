import { HEADING_LEVEL } from "@/common/constants/";
import { getSlot } from "@/util/helpers";

export default {
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
  },
  methods: {
    clickHandler(e) {
      this.$emit("click", e);
    },
  },
  render() {
    const TagHeading = `h${this.level}`;
    return <TagHeading class={this.classes}>{getSlot(this)}</TagHeading>;
  },
};
