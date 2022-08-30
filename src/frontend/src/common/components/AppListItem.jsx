import { getSlot } from "@/util/helpers";

export default {
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
  render() {
    const TagListItem = `${this.tag}`;
    return <TagListItem class={this.classes}>{getSlot(this)}</TagListItem>;
  },
};
