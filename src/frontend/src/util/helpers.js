export const getSlot = (vm) => {
  return vm.$slots.default || vm.$scopedSlots.default;
};
