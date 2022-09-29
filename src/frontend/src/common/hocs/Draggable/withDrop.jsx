import Vue from "vue";
import { TRANSFER_DATA_PAYLOAD } from "@/common/constants/";
import { getSlot } from "@/util/helpers";

const withDrop = (Component) => {
  return Vue.component("WithDrop", {
    methods: {
      checkDrop(e) {
        e.preventDefault();
      },
      onDrop({ dataTransfer }) {
        // TODO str => obj
        const payload = dataTransfer.getData(TRANSFER_DATA_PAYLOAD);
        if (!payload) {
          return;
        }
        this.$emit("drop", payload);
      },
    },
    render() {
      const originalProps = this.$attrs || [];
      return (
        <Component
          props={originalProps}
          vOn:drop={this.onDrop}
          vOn:drop_prevent={this.onDrop}
          vOn:dragenter={this.checkDrop}
          vOn:dragover={this.checkDrop}
        >
          {getSlot(this)}
        </Component>
      );
    },
  });
};

export default withDrop;
