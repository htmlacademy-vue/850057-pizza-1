<template>
  <AppContent postfix="dough">
    <div class="sheet">
      <AppHeading>Выберите тесто</AppHeading>

      <div class="sheet__content dough">
        <AppInput
          v-for="{ id, name, description } in dough"
          :key="`${id}-dough`"
          :id="`${id}-dough`"
          :iValue="dict[name.toLowerCase()]"
          :iLabel="true"
          :iLabelClasses="[
            'dough__input',
            `dough__input--${dict[name.toLowerCase()]}`,
          ]"
          :checked="`${id}-dough` === activeId"
          @change="setDough($event)"
          iName="dough"
          iInputClasses="visually-hidden"
          type="radio"
        >
          <b>{{ name }}</b>
          <span>{{ description }}</span>
        </AppInput>
      </div>
    </div>
  </AppContent>
</template>

<script>
import { DICTIONARY } from "@/common/constants/";
import AppContent from "@/layouts/AppContent/AppContent";
import AppHeading from "@/common/components/AppHeading/AppHeading";
import AppInput from "@/common/components/AppInput/AppInput";

export default {
  name: "BuilderDoughSelector",
  components: {
    AppContent,
    AppHeading,
    AppInput,
  },
  props: {
    iValue: {
      type: String,
    },
    activeId: {
      type: String,
    },
    dough: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      dict: DICTIONARY,
    };
  },
  methods: {
    setDough(e) {
      this.$emit("change", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
