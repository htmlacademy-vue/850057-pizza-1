<template>
  <AppContent postfix="constructor">
    <div :class="classes" v-on="currentListeners">
      <div class="pizza__wrapper">
        <div
          v-for="(filling, i) in fillings"
          :class="`pizza__filling pizza__filling--${filling}`"
          :key="`${i}-${filling}`"
        ></div>
      </div>
    </div>
  </AppContent>
</template>

<script>
import AppContent from "@/layouts/AppContent/AppContent";
import { DOUGH_TYPE, SAUCES_TYPE } from "@/common/constants/";

const Sizes = {
  BIG: "big",
  SMALL: "small",
};
export default {
  name: "BuilderPizzaView",
  components: {
    AppContent,
  },
  props: {
    fillings: {
      type: [String, Array, Set],
      default: () => [],
    },
    sauce: {
      type: String,
      default: "tomato",
      validator: function (val) {
        return SAUCES_TYPE.includes(val);
      },
    },
    dough: {
      type: String,
      default: "light",
      validator: function (val) {
        return DOUGH_TYPE.includes(val);
      },
    },
  },
  computed: {
    currentListeners() {
      return this.$listeners;
    },
    getSize() {
      return this.dough === "large" ? Sizes.BIG : Sizes.SMALL;
    },
    classes() {
      return {
        pizza: true,
        [`pizza--foundation--${this.getSize}-${this.sauce}`]:
          this.dough && this.sauce,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}
.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}
</style>
