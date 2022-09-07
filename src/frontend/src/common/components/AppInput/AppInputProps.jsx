import { INPUT_TYPE } from "@/common/constants/";

const inputProps = () => ({
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
  focused: {
    type: Boolean,
    default: undefined,
  },
  error: {
    type: String,
    default: undefined,
  },
});

export default inputProps;
