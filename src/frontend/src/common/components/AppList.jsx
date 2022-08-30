import AppListItem from "@/common/components/AppListItem";
import { getSlot } from "@/util/helpers";

export default {
  name: "AppList",
  components: {
    AppListItem,
  },
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
  render() {
    const TagList = `${this.tag}`;
    if (this.items && this.items.length) {
      const items = this.items.map((item) => {
        return <AppListItem>{item}</AppListItem>;
      });
      return <TagList class={this.classes}>{items}</TagList>;
    }

    return <TagList class={this.classes}>{getSlot(this)}</TagList>;
  },
};
