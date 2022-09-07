<template>
  <AppContent postfix="diameter">
    <div class="sheet">
      <AppHeading>Выберите размер</AppHeading>

      <div class="sheet__content diameter">
        <AppInput
          v-for="{ id, name } in sizes"
          :key="`${id}-sizes`"
          :id="id"
          :iValue="sizesValues[id].value"
          :iLabel="true"
          :iLabelClasses="[
            'diameter__input',
            `diameter__input--${sizesValues[id].value}`,
          ]"
          :checked="sizesValues[id].checked"
          iInputClasses="visually-hidden"
          type="radio"
          iName="diameter"
        >
          <span>{{ name }}</span>
        </AppInput>
      </div>
    </div>
  </AppContent>
</template>

<script>
import AppContent from "@/layouts/AppContent/AppContent";
import AppHeading from "@/common/components/AppHeading/AppHeading";
import AppInput from "@/common/components/AppInput/AppInput";

export default {
  name: "BuilderSizeSelector",
  components: {
    AppContent,
    AppHeading,
    AppInput,
  },
  props: {
    sizes: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      sizesValues: {
        1: {
          value: "small",
        },
        2: {
          value: "normal",
        },
        3: {
          value: "big",
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("~@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
