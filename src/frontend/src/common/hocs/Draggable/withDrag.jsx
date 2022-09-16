import Vue from "vue";
import AppFragment from "@/common/components/AppFragment/AppFragment";
import {
  TRANSFER_DATA_PAYLOAD,
  DRAGGABLE_DEFAULT,
  NOTIFICATION_DROP_MESSAGES,
} from "@/common/constants/";
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
        hasFocused: false,
        isDragging: false,
        tagName: "",
        notification: NOTIFICATION_DROP_MESSAGES,
        statusNotification: "",
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
      onFocus() {
        this.hasFocused = true;
        this.statusNotification = this.notification?.activated;
      },
      onKeyUp() {
        if (this.disabled) {
          return;
        }
        this.setAvailableDragging(true);
      },
      onKey(e) {
        if (e.code === "ArrowRight") {
          this.status = this.notification.droped;
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
        <AppFragment>
          <Component
            props={originalProps}
            vOn:dragstart={this.onStartDrag}
            disabled={this.disabled}
            class={this.classes}
            draggable={!this.isDraggableDefaultElem}
            aria-grabbed={this.isDragging.toString()}
            vOn:keyup_enter={this.onKeyUp}
            vOn:focus={this.onFocus}
            vOn:keyup_right={this.onKey}
            aria-describedby="statusNotification"
            tabindex="0"
          >
            {getSlot(this)}
          </Component>
          <portal to="notification">
            <span
              aria-live="assertive"
              class="draggable__notifier"
              id="statusNotification"
            >
              {this.statusNotification}
            </span>
          </portal>
        </AppFragment>
      );
    },
  });
};

export default withDrag;
