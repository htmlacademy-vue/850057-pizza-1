import AppSkeletonElement from "@/common/components/AppSkeleton/AppSkeletonElement";
import "@/common/components/AppSkeleton/skeleton.scss";

export default {
  name: "AppSkeleton",
  props: {
    action: {
      type: String,
      require: true,
    },
    hasSidebar: {
      type: Boolean,
      default: undefined,
    },
    typeElement: {
      type: String,
    },
    classes: {
      type: [String, Array],
      default: () => [],
    },
    size: {
      type: [String, Number],
      require: true,
    },
    loading: {
      type: Boolean,
      default: undefined,
    },
  },
  components: {
    AppSkeletonElement,
  },
  computed: {
    skeletonClasses() {
      return {
        "a-skeleton": true,
        "a-skeleton--active": this.loading,
        [this.classes]: this.classes,
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
    const sidebar = <div class="a-skeleton__sidebar"></div>;
    return (
      <div class={this.skeletonClasses}>
        {this.hasSidebar && sidebar}
        <div class="a-skeleton__content" style={this.getStyle}>
          <AppSkeletonElement size={this.size} actionType={this.action} />
        </div>
      </div>
    );
  },
};
