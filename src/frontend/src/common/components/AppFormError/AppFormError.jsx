import "@/common/components/AppFormError/style/index.scss";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "AppFormError",
  props: {
    error: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    return () => {
      if (props.error) {
        return <strong class="error">{props.error}</strong>;
      }
    };
  },
});
