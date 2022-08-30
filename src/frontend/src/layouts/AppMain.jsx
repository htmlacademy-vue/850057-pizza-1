import { getSlot } from "@/util/helpers";

export default {
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
  render() {
    const TagMain = this.tag;
    return <TagMain class={this.classes}>{getSlot(this)}</TagMain>;
  },
};
