import "@/common/components/AppIcon/style/index.scss";
import { defineComponent, computed } from "@vue/composition-api";
import { ICON_TYPE, ICON_ARIA_ROLE_TYPE } from "@/common/constants/";
import { getSlots, getAttrs } from "@/util/helpers";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "AppIcon",
  props: {
    id: {
      type: String,
    },
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
    tag: {
      type: String,
      default: "svg",
      validator: function (val) {
        return ICON_TYPE.includes(val);
      },
    },
    size: {
      type: [String, Number],
      default: 24,
    },
    ariaRole: {
      type: String,
      default: "img",
      validator: function (val) {
        return ICON_ARIA_ROLE_TYPE.includes(val);
      },
    },
    alternateText: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, context) {
    const { slots, emit } = context;
    const hasClickListener = computed(() => {
      const htmlAttrs = getAttrs(context);
      const { on } = htmlAttrs;
      return Boolean(on.click);
    });

    const isSvg = computed(() => {
      return props.tag === "svg" && getSlots(slots);
    });

    const styles = computed(() => {
      if (typeof props.size === "string") {
        return {
          width: props.size,
        };
      }
      return {
        width: `${props.size}px`,
      };
    });

    const genId = computed(() => {
      return props.id || uuidv4();
    });

    const clickHandler = (e) => {
      emit("click", e);
    };

    return () => {
      const TagIcon = `${props.tag}`;
      return (
        <div
          role={props.ariaRole}
          aria-hidden={!hasClickListener.value}
          vOn:click={clickHandler}
          vOn:keyup_enter={clickHandler}
          disabled={props.disabled && hasClickListener.value}
          tabIndex={hasClickListener.value && "0"}
          aria-labelledby={genId.value}
        >
          <span id={genId.value} class="visually-hidden">
            {props.alternateText}
          </span>
          <TagIcon
            xmlns={isSvg.value && "http://www.w3.org/2000/svg"}
            viewBox={isSvg.value && "0 0 24 24"}
            style={styles.value}
            src={!isSvg.value && props.src}
            alt={!isSvg.value && props.alt}
            aria-hidden="true"
            disabled={props.disabled && hasClickListener.value}
          >
            {getSlots(slots)}
          </TagIcon>
        </div>
      );
    };
  },
});
