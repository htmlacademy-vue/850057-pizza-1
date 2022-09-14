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
        cloneNode: null,
        clonePosX: 0,
        clonePosY: 0,
        pageScrollTop: 0,
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
      onKeyUp(e) {
        console.log(e.target);
        const clone = e.target.cloneNode(true);
        this.cloneNode = clone;
        const parent = e.target.parentNode;
        // parent.style.position = "relative";
        clone.style.position = "absolute";
        // clone.style.left = 0;
        // clone.style.background = "#fff";
        clone.style.zIndex = 1000;
        clone.style.opacity = 0.5;
        parent.appendChild(clone);
        console.log(clone.offsetLeft);
        const pos = e.target.getBoundingClientRect();
        this.clonePosX = pos.left;
        this.pageScrollTop = window.pageYOffset;
        //this.clonePosY = pos.top + document.body.scrollTop;
        this.clonePosY = pos.top + this.pageScrollTop;
        console.log("page x y ", this.clonePosY, window.pageYOffset);
        this.updatePosition(this.clonePosX, this.clonePosY, clone);
        // if (this.isDragging) {
        //   console.log("+++++++++++++ drag");
        //   target.style.cursor = "move";
        //   this.updatePosition(e);
        // }
      },
      updatePosition(pageX, pageY, pos = undefined) {
        console.log(pageX, pageY, pos);
        // this.cloneNode.style.left =
        //   clonePosX - this.cloneNode.offsetWidth / 2 + "px";
        // this.cloneNode.style.top =
        //   clonePosY - this.cloneNode.offsetHeight / 2 + "px";
        if (pos === "right") {
          this.clonePosX = pageX + 1;
          this.clonePosY = pageY;
        } else if (pos === "left") {
          this.clonePosX = pageX - 1;
          this.clonePosY = pageY;
        }
        console.log(this.cloneNode.offsetTop);
        this.cloneNode.style.left = `${this.clonePosX}px`;
        this.cloneNode.style.top = `${this.clonePosY}px`;
      },
      onKey({ code }) {
        if (code === "ArrowRight") {
          this.updatePosition(this.clonePosX, this.clonePosY, "right");
        } else if (code === "ArrowLeft") {
          this.updatePosition(this.clonePosX, this.clonePosY, "left");
        }

        this.updatePosition(this.clonePosX, this.clonePosY, this.cloneNode);
      },
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
          vOn:keyup_enter={this.onKeyUp}
          vOn:keyup_right={this.onKey}
          vOn:keyup_left={this.onKey}
          vOn:keyup_top={this.onKey}
          vOn:keyup_bottom={this.onKey}
          tabindex="0"
        >
          {getSlot(this)}
        </Component>
      );
    },
  });
};

export default withDrag;
