import Vue from "vue";
import { TRANSFER_DATA_PAYLOAD, DRAGGABLE_DEFAULT } from "@/common/constants/";
import { getSlot } from "@/util/helpers";
import "@/common/hocs/Draggable/draggable.scss";

const withDrag = ({ Component, typeDnD = "move", dataType } = {}) => {
  return Vue.component("WithDrag", {
    props: {
      transferData: {
        type: [String, Object],
        required: true,
      },
      disabled: {
        type: Boolean,
        default: undefined,
      },
    },
    data() {
      return {
        isDragging: false,
        tagName: "",
      };
    },
    computed: {
      classes() {
        return {
          draggable: true,
          "draggable--dragging": this.isDragging,
        };
      },
      isDraggableDefaultElem() {
        return DRAGGABLE_DEFAULT.find((v) => v === this.tagName.toLowerCase());
      },
    },
    methods: {
      setAvailableDragging(dragging) {
        this.isDragging = dragging;
      },
      onKeyUp() {
        if (this.disabled) {
          return;
        }
        this.setAvailableDragging(true);
      },
      onKey(e) {
        if (e.code === "ArrowRight") {
          const data = this.$attrs[dataType];
          this.$emit("keyup", data);
        }
      },
      onStartDrag({ dataTransfer }) {
        if (this.disabled) {
          return;
        }
        this.setAvailableDragging(true);
        dataTransfer.dropEffect = typeDnD;
        dataTransfer.effectAllowed = typeDnD;
        dataTransfer.setData(TRANSFER_DATA_PAYLOAD, this.transferData);
      },
    },
    mounted() {
      this.tagName = this.$el.nodeName;
    },
    render() {
      const originalProps = this.$attrs || [];
      return (
        <Component
          props={originalProps}
          vOn:dragstart={this.onStartDrag}
          disabled={this.disabled}
          class={this.classes}
          draggable={!this.isDraggableDefaultElem}
          aria-grabbed={this.isDragging.toString()}
          vOn:keyup_enter={this.onKeyUp}
          vOn:keyup_right={this.onKey}
          tabindex="0"
        >
          {getSlot(this)}
        </Component>
      );
    },
  });
};

export default withDrag;
