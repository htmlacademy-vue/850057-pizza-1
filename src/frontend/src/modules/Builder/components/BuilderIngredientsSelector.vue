<template>
  <AppContent postfix="ingredients">
    <div class="sheet">
      <AppHeading>Выберите ингредиенты</AppHeading>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <AppInput
            v-for="{ id, name } in sauces"
            :key="`${id}-sauces`"
            :id="`${id}-sauces`"
            :iValue="dict[name.toLowerCase()]"
            :iLabel="true"
            :iLabelClasses="['radio', 'ingredients__input']"
            :checked="`${id}-sauces` === activeId"
            @change="setSauces($event)"
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
              :key="`${id}-ingredient`"
              class="ingredients__item"
            >
              <BuilderIngredientsItem
                :name="name"
                :type="dict[name.toLowerCase()]"
                :transferData="dict[name.toLowerCase()]"
                @keyup="updateDnDData($event)"
              />
              <AppItemCounter
                :id="id"
                :name="dict[name.toLowerCase()]"
                @increase="onIncrease($event)"
                @decrease="onDecrease($event)"
                amount="0"
              />
            </li>
          </AppList>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<script>
import { DICTIONARY } from "@/common/constants/";
import AppContent from "@/layouts/AppContent/AppContent";
import AppHeading from "@/common/components/AppHeading/AppHeading";
import AppInput from "@/common/components/AppInput/AppInput";
import AppItemCounter from "@/common/components/AppItemCounter/AppItemCounter";
import AppList from "@/common/components/AppList";
import BuilderIngredientsItem from "@/modules/Builder/components/BuilderIngredientsItem";
import withDrag from "@/common/hocs/Draggable/withDrag";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppContent,
    AppHeading,
    AppInput,
    AppItemCounter,
    BuilderIngredientsItem: withDrag({
      Component: BuilderIngredientsItem,
      dataType: "type",
    }),
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
    activeId: {
      type: String,
    },
  },
  data() {
    return {
      dict: DICTIONARY,
    };
  },
  methods: {
    setSauces(e) {
      this.$emit("change", e);
    },
    onIncrease(e) {
      this.$emit("increase", e);
    },
    onDecrease(e) {
      this.$emit("decrease", e);
    },
    updateDnDData(e) {
      this.$emit("setDndData", e);
    },
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
</style>
