import { INPUT_TYPE } from "@/common/constants/";
import { v4 as uuidv4 } from "uuid";
import { getSlot } from "@/util/helpers";

export default {
  name: "AppInput",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "text",
      validator: function (val) {
        return INPUT_TYPE.includes(val);
      },
    },
    iName: {
      type: String,
    },
    iValue: {
      type: String,
    },
    iLabel: {
      type: Boolean,
      default: undefined,
    },
    preText: {
      type: Boolean,
      default: undefined,
    },
    iLabelClasses: {
      type: [String, Array],
      default: () => [],
    },
    iInputClasses: {
      type: [String, Array],
      default: () => [],
    },
    placeholder: {
      type: String,
    },
    id: {
      type: [String, Number],
    },
    autofocus: {
      type: Boolean,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
    checked: {
      type: Boolean,
      default: undefined,
    },
  },
  computed: {
    genId() {
      return this.id || uuidv4();
    },
    hasLabel() {
      return this.iLabel && getSlot(this);
    },
    preTextAvailable() {
      if (!this.hasLabel) {
        return false;
      }

      if (!this.preText) {
        return false;
      }

      return this.preText;
    },
  },
  methods: {
    changeHandler(e) {
      this.$emit("change", e);
    },
    focusHandler(e) {
      this.$emit("focus", e);
    },
    blurHandler(e) {
      this.$emit("blur", e);
    },
    inputHandler(e) {
      this.$emit("input", e);
    },
    mouseDownHandler(e) {
      this.$emit("mousedown", e);
    },
    mouseUpHandler(e) {
      this.$emit("mouseup", e);
    },
  },
  render() {
    if (this.hasLabel) {
      return (
        <label class={this.iLabelClasses} for={this.genId}>
          {this.preTextAvailable && getSlot(this)}
          <input
            type={this.type}
            class={this.iInputClasses}
            name={this.iName}
            id={this.genId}
            value={this.iValue}
            placeholder={this.placeholder}
            autofocus={this.autofocus}
            checked={this.checked}
            vOn:change={this.changeHandler}
            vOn:input={this.inputHandler}
            vOn:focus={this.focusHandler}
            vOn:blur={this.blurHandler}
            vOn:mousedown={this.mouseDownHandler}
            vOn:mouseup={this.mouseUpHandler}
          />
          {!this.preTextAvailable && getSlot(this)}
        </label>
      );
    }

    return (
      <input
        type={this.type}
        name={this.iName}
        id={this.genId}
        value={this.iValue}
        placeholder={this.placeholder}
        autofocus={this.autofocus}
        checked={this.checked}
        vOn:change={this.changeHandler}
        vOn:input={this.inputHandler}
        vOn:focus={this.focusHandler}
        vOn:blur={this.blurHandler}
        vOn:mousedown={this.mouseDownHandler}
        vOn:mouseup={this.mouseUpHandler}
      />
    );
  },
};
