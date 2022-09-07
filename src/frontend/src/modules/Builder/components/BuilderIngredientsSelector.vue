<template>
  <AppContent postfix="ingredients">
    <div class="sheet">
      <AppHeading>Выберите ингредиенты</AppHeading>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <AppInput
            v-for="{ id, name } in sauces"
            :key="id"
            :id="`${id}-sauces`"
            :iValue="saucesValues[id].value"
            :iLabel="true"
            :iLabelClasses="['radio', 'ingredients__input']"
            :checked="saucesValues[id].checked"
            iInputClasses="visually-hidden"
            type="radio"
            iName="sauce"
          >
            <span>{{ name }}</span>
          </AppInput>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>
          <AppList class="ingredients__list">
            <li
              v-for="{ id, name } in ingredients"
              :key="id"
              class="ingredients__item"
            >
              <BuilderIngredientsItem
                :name="name"
                :type="ingredientsValues[id].value"
                :transferData="ingredientsValues[id].value"
              />

              <div class="counter counter--orange ingredients__counter">
                <AppButton
                  class="counter__button counter__button--minus"
                  disabled
                >
                  <span class="visually-hidden">Меньше</span>
                </AppButton>
                <AppInput iValue="0" name="counter" class="counter__input" />
                <AppButton class="counter__button counter__button--plus">
                  <span class="visually-hidden">Больше</span>
                </AppButton>
              </div>
            </li>
          </AppList>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<script>
import AppContent from "@/layouts/AppContent/AppContent";
import AppHeading from "@/common/components/AppHeading/AppHeading";
import AppInput from "@/common/components/AppInput/AppInput";
import AppButton from "@/common/components/AppButton/AppButton";
import AppList from "@/common/components/AppList";
import BuilderIngredientsItem from "@/modules/Builder/components/BuilderIngredientsItem";
import withDrag from "@/common/hocs/Draggable/withDrag";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppContent,
    AppHeading,
    AppInput,
    AppButton,
    BuilderIngredientsItem: withDrag(BuilderIngredientsItem),
    AppList,
  },
  props: {
    ingredients: {
      type: Array,
      require: true,
    },
    sauces: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      saucesValues: {
        1: {
          value: "tomato",
          checked: true,
        },
        2: {
          value: "creamy",
          checked: false,
        },
      },
      ingredientsValues: {
        1: {
          value: "mushrooms",
        },
        2: {
          value: "cheddar",
        },
        3: {
          value: "salami",
        },
        4: {
          value: "ham",
        },
        5: {
          value: "ananas",
        },
        6: {
          value: "bacon",
        },
        7: {
          value: "onion",
        },
        8: {
          value: "chile",
        },
        9: {
          value: "jalapeno",
        },
        10: {
          value: "olives",
        },
        11: {
          value: "tomatoes",
        },
        12: {
          value: "salmon",
        },
        13: {
          value: "mozzarella",
        },
        14: {
          value: "parmesan",
        },
        15: {
          value: "blue_cheese",
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("~@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("~@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("~@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("~@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("~@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("~@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("~@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("~@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("~@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("~@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("~@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("~@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("~@/assets/img/filling/salmon.svg");
  }
}
</style>
