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
        notificationsDrop: NOTIFICATION_DROP_MESSAGES,
        statusesDrop: {
          BEFORE_ACTIVATED: "beforeActivated",
          CHOSEN: "сhosen",
          ACTIVATED: "activated",
          BEFORE_DROPED: "beforeDroped",
          DROPED: "droped",
          UNFOCUSED: "unfocused",
        },
        status: "",
        statusMessages: "",
        dropedList: [],
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
      async *getStatusData(status, timeout) {
        if (timeout) {
          yield await new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                status,
                statusMessages: this.notificationsDrop[status],
              });
            }, timeout);
          });
        }
        yield await Promise.resolve({
          status,
          statusMessages: this.notificationsDrop[status],
        });
      },
      setStatusDroped({ status, statusMessages }) {
        this.status = status;
        this.statusMessages = statusMessages;
      },
      hasIngredientInOrder(type) {
        return this.dropedList.find((v) => v === type);
      },
      getDataType() {
        return this.$attrs[dataType];
      },
      async updateStatusDroped(status, timeout) {
        const statusData = timeout
          ? this.getStatusData(status, timeout)
          : this.getStatusData(status);
        const result = await statusData.next();
        this.setStatusDroped(result?.value);
        return statusData;
      },
      async onFocus() {
        this.hasFocused = true;
        if (!this.hasIngredientInOrder(this.getDataType())) {
          await this.updateStatusDroped(this.statusesDrop.BEFORE_ACTIVATED);
          return false;
        }
        await this.updateStatusDroped(this.statusesDrop.CHOSEN);
      },
      async onBlur() {
        this.hasFocused = false;
        if (!this.hasIngredientInOrder(this.getDataType())) {
          await this.updateStatusDroped(this.statusesDrop.UNFOCUSED);
        }
      },
      async onKeyUp() {
        if (this.disabled) {
          return;
        }
        const data = await this.updateStatusDroped(this.statusesDrop.ACTIVATED);
        this.setAvailableDragging(true);
        const successActivatedResult = await data.next();
        if (successActivatedResult?.done) {
          await this.updateStatusDroped(this.statusesDrop.BEFORE_DROPED, 2400);
        }
      },
      async onKey(e) {
        if (e.code === "ArrowRight") {
          const data = this.$attrs[dataType];
          this.$emit("keyup", data);
          await this.updateStatusDroped(this.statusesDrop.DROPED);
          this.dropedList.push(data);
          return false;
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
      const notifier = (
        <span
          aria-live="assertive"
          role="alert"
          class="draggable__notifier"
          id={"sReaderNotifier"}
        >
          {this.statusMessages}
        </span>
      );
      return (
        <AppFragment>
          <Component
            props={originalProps}
            vOn:dragstart={this.onStartDrag}
            disabled={this.disabled}
            class={this.classes}
            draggable={!this.isDraggableDefaultElem}
            aria-grabbed={this.isDragging.toString()}
            role="listitem"
            vOn:keyup_enter={this.onKeyUp}
            vOn:focus={this.onFocus}
            vOn:blur={this.onBlur}
            vOn:keyup_right={this.onKey}
            aria-describedby={this.status && "sReaderNotifier"}
            tabindex="0"
          >
            {getSlot(this)}
          </Component>
          {this.status && notifier}
        </AppFragment>
      );
    },
  });
};

export default withDrag;
