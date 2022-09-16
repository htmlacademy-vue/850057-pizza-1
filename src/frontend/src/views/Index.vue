<template>
  <AppMain>
    <form action="#" method="post">
      <AppContent>
        <AppHeading level="1" :classes="['title', 'title--big']">
          Конструктор пиццы
        </AppHeading>
        <BuilderDoughSelector
          :activeId="initialActive.doughId"
          :dough="Pizza.dough"
          @change="setBasisToOrder($event)"
        />
        <BuilderSizeSelector
          :sizes="Pizza.sizes"
          :activeId="initialActive.sizesId"
          @change="setBasisToOrder($event)"
        />
        <BuilderIngredientsSelector
          :ingredients="Pizza.ingredients"
          :sauces="Pizza.sauces"
          :activeId="initialActive.saucesId"
          @change="setBasisToOrder($event)"
          @increase="onIncrease($event)"
          @decrease="onDecrease($event)"
          @setDndData="onSetDnDData($event)"
        />
        <AppContent postfix="pizza">
          <BuilderPizzaSearch
            :iValue="namePizza"
            :error="error"
            @setPizzaByName="setPizza($event)"
            @update:iValue="setPizza($event)"
            @update:error="getError($event)"
          />
          <BuilderPizzaView
            :size="order.sizes && order.sizes.value"
            :sauce="order.sauces && order.sauces.value"
            :dough="order.dough && order.dough.value"
            :fillings="fillings"
            @drop="getDropData"
          />
          <BuilderPriceCounter :total="getTotal()" />
        </AppContent>
      </AppContent>
    </form>
  </AppMain>
</template>

<script>
import { ref, reactive, watch, set } from "@vue/composition-api";
import PizzaProps from "@/static/pizza.json";
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
    let fillings = reactive([]);
    const namePizza = ref("");
    const error = ref("");

    const order = reactive({
      dough: {
        id: "1",
        value: "light",
        price: 300,
      },
      sizes: {
        id: "1",
        value: "small",
        price: 0,
      },
      sauces: {
        id: "1",
        price: 50,
        value: "tomato",
      },
    });
    const initialActive = reactive({
      sizesId: "1-sizes",
      doughId: "1-dough",
      saucesId: "1-sauces",
    });
    const Pizza = reactive(PizzaProps);
    const getTotal = () => {
      let result = 0;
      for (let i in order) {
        if ("price" in order[i]) {
          result += order[i].price;
        }
      }
      return result;
    };
    const getNumFromId = (id) => {
      const pattern = /\d/g;
      return id.match(pattern).join("");
    };
    const getNameById = (id) => {
      const pattern = /[a-zA-z]/g;
      return id.match(pattern).join("");
    };
    const getPriceById = (list, id) => {
      const item = list.find((v) => v.id === Number(id));
      const { price } = item;
      if (!price) {
        return 0;
      }
      return price;
    };
    const hasContainInOrder = (itemName) => {
      return order.hasOwnProperty(itemName);
    };
    const updateFillings = (filling) => {
      if (fillings.find((v) => v === filling)) {
        return;
      }
      fillings.push(filling);
    };

    const getDropData = (e) => {
      updateFillings(e);
    };
    const setBasisToOrder = (e) => {
      const { value, id } = e.target;
      if (!id && !value) {
        return false;
      }
      const basisName = getNameById(id);
      initialActive[`${basisName}Id`] = id;
      const price = getPriceById(Pizza[`${basisName}`], getNumFromId(id));
      const hasBasis = hasContainInOrder(basisName);
      if (!hasBasis) {
        set(order, basisName, {
          id,
          value,
          price,
        });
      }
      if (order.hasOwnProperty(basisName)) {
        set(order, basisName, {
          id: getNumFromId(id),
          value,
          price,
        });
        return false;
      }
      order[basisName].id = getNumFromId(id);
      order[basisName].value = value;
      order[basisName].price = price;
    };
    const setPizza = (e) => {
      if (typeof e === "string") {
        namePizza.value = e;
        return false;
      }
      namePizza.value = e.target.value;
    };

    const setIngredientsToOrder = (id, total, name) => {
      if (!id && !total && !name) {
        return false;
      }
      const ingredient = Pizza?.ingredients.find((v) => v.id === id);
      if (!ingredient) {
        return false;
      }

      const price = ingredient?.price;
      if (!price) {
        return false;
      }
      const hasIngredients = hasContainInOrder("ingredients");
      if (!hasIngredients) {
        set(order, "ingredients", {});
      }
      if (!order.ingredients.hasOwnProperty(name)) {
        set(order.ingredients, name, {
          id,
          total,
          price,
        });
        return false;
      }
      order.ingredients[name].total = total;
    };

    const getError = (e) => {
      error.value = e;
    };

    const onIncrease = (e) => {
      const { id, value, name } = e;
      setIngredientsToOrder(id, value, name);
    };

    const onDecrease = (e) => {
      const { id, value, name } = e;
      setIngredientsToOrder(id, value, name);
    };

    const onSetDnDData = (e) => {
      const data = e;
      if (!data) {
        return false;
      }
      updateFillings(data);
    };

    watch(order, () => {
      const ingredients = order?.ingredients;
      if (ingredients) {
        [...Object.keys(ingredients)].map((v) => updateFillings(v));
      }
    });

    return {
      isLoading,
      fillings,
      Pizza,
      namePizza,
      order,
      error,
      initialActive,
      setBasisToOrder,
      getTotal,
      getDropData,
      setPizza,
      getError,
      onIncrease,
      onDecrease,
      onSetDnDData,
    };
  },
};
</script>
