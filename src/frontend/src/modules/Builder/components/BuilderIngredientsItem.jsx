import "@/modules/Builder/style/BuilderIngredientsItem.scss";

export default {
  name: "BuilderIngredientsItem",
  props: {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  computed: {
    classes() {
      return {
        filling: true,
        [`filling--${this.type}`]: this.type,
      };
    },
  },
  render() {
    return (
      <span class={this.classes} {...{ on: this.$listeners }}>
        {this.name}
      </span>
    );
  },
};
