<template>
  <AppMain>
    <form action="#" method="post">
      <AppContent>
        <AppHeading level="1" :classes="['title', 'title--big']">
          Конструктор пиццы
        </AppHeading>
        <BuilderDoughSelector
          :iValue="doughValue"
          :dough="doughProp"
          @change="setDough($event)"
        />
        <BuilderSizeSelector :sizes="sizesProp" />
        <BuilderIngredientsSelector
          :ingredients="ingredientsProp"
          :sauces="saucesProp"
        />
        <AppContent postfix="pizza">
          <BuilderPizzaSearch
            :iValue="namePizza"
            :error="error"
            @setPizzaByName="setPizza($event)"
            @update:iValue="setPizza($event)"
            @update:error="getError($event)"
          />
          <BuilderPizzaView :fillings="fillings" @drop="getDropData" />
          <BuilderPriceCounter />
        </AppContent>
      </AppContent>
    </form>
  </AppMain>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";
import AppMain from "@/layouts/AppMain/AppMain";
import AppHeading from "@/common/components/AppHeading/AppHeading";
import AppContent from "@/layouts/AppContent/AppContent";
import BuilderDoughSelector from "@/modules/Builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/Builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/Builder/components/BuilderSizeSelector";
import BuilderPizzaView from "@/modules/Builder/components/BuilderPizzaView";
import BuilderPizzaSearch from "@/modules/Builder/components/BuilderPizzaSearch";
import BuilderPriceCounter from "@/modules/Builder/components/BuilderPriceCounter";
import WithDrop from "@/common/hocs/Draggable/withDrop";

export default {
  name: "Index",
  components: {
    AppMain,
    AppHeading,
    AppContent,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView: WithDrop(BuilderPizzaView),
    BuilderPizzaSearch,
    BuilderPriceCounter,
  },
  setup() {
    const isLoading = ref(false);
    const fillings = reactive([]);
    const doughValue = ref("light");
    const namePizza = ref("");
    const error = ref("");
    const doughProp = reactive(dough);
    const ingredientsProp = reactive(ingredients);
    const saucesProp = reactive(sauces);
    const sizesProp = reactive(sizes);

    const updateFillings = (filling) => {
      if (fillings.find((v) => v === filling)) {
        return;
      }
      fillings.push(filling);
    };

    const getDropData = (e) => {
      updateFillings(e);
    };

    const setDough = (e) => {
      doughValue.value = e.target.value;
    };

    const setPizza = (e) => {
      if (typeof e === "string") {
        namePizza.value = e;
        return false;
      }
      namePizza.value = e.target.value;
    };

    const getError = (e) => {
      error.value = e;
    };

    return {
      isLoading,
      fillings,
      namePizza,
      doughValue,
      error,
      doughProp,
      ingredientsProp,
      saucesProp,
      sizesProp,
      setDough,
      getDropData,
      setPizza,
      getError,
    };
  },
};
</script>
