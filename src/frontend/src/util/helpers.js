const getSlot = (vm) => {
  return vm.$slots.default || vm.$scopedSlots.default;
};

function getSlots(slotObj, name = "default") {
  if (slotObj.hasOwnProperty(name)) {
    return typeof slotObj[name] === "function"
      ? slotObj[name]()
      : slotObj[name];
  }
}

function getAttrs(context) {
  const { attrs, listeners } = context;
  const htmlAttrs = {};
  if (listeners) {
    htmlAttrs.on = listeners;
  }

  if (attrs) {
    htmlAttrs.attrs = attrs;
  }

  return htmlAttrs;
}

function getSpeechRecognition() {
  return window.SpeechRecognition || window.webkitSpeechRecognition;
}

export { getSlot, getSlots, getAttrs, getSpeechRecognition };
