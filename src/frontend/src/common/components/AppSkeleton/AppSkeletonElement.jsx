export default {
  name: "AppSkeletonElement",
  props: {
    size: {
      type: [String, Number],
      require: true,
    },
    actionType: {
      type: String,
    },
  },
  computed: {
    classes() {
      return {
        "a-skeleton__item": true,
        [`a-skeleton__${this.actionType}`]: this.actionType,
      };
    },
    getStyle() {
      if (!this.size) {
        return;
      }
      return {
        height: `${this.size}px`,
        borderRadius: "4px",
      };
    },
  },
  render() {
    return <span class={this.classes} style={this.getStyle}></span>;
  },
};
