<template>
  <div class="content__ingredients">
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
  </div>
</template>

<script>
import AppHeading from "@/common/components/AppHeading";
import AppInput from "@/common/components/AppInput";
import AppButton from "@/common/components/AppButton";
import AppList from "@/common/components/AppList";
import BuilderIngredientsItem from "@/modules/Builder/components/BuilderIngredientsItem";
import withDrag from "@/common/hocs/Draggable/withDrag";

export default {
  name: "BuilderIngredientsSelector",
  components: {
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
    ingredientsValues: {
      type: Object,
      require: true,
    },
    sauces: {
      type: Array,
      require: true,
    },
    saucesValues: {
      type: Object,
      require: true,
    },
  },
};
</script>
