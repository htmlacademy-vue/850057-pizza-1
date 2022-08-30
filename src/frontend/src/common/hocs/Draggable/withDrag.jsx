import Vue from "vue";
import { TRANSFER_DATA_PAYLOAD, DRAGGABLE_DEFAULT } from "@/common/constants/";
import { getSlot } from "@/util/helpers";
import "@/common/hocs/Draggable/draggable.scss";

const withDrag = (Component, typeDnD = "move") => {
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
      onStartDrag({ dataTransfer }) {
        if (this.disabled) {
          return;
        }
        this.isDragging = true;
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
        >
          {getSlot(this)}
        </Component>
      );
    },
  });
};

export default withDrag;
