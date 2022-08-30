<template>
  <AppMain>
    <form action="#" method="post">
      <div class="content__wrapper">
        <AppHeading level="1" :classes="['title', 'title--big']">
          Конструктор пиццы
        </AppHeading>
        <BuilderDoughSelector :dough="dough" :doughValues="doughValues" />
        <BuilderSizeSelector :sizes="sizes" :sizesValues="sizesValues" />
        <BuilderIngredientsSelector
          :ingredients="ingredients"
          :ingredientsValues="ingredientsValues"
          :sauces="sauces"
          :saucesValues="saucesValues"
        />
        <div class="content__pizza">
          <BuilderPizzaSearch @setPizzaByName="setPizza" />
          <BuilderPizzaView :fillings="fillings" @drop="getDropData" />
          <BuilderPriceCounter />
        </div>
      </div>
    </form>
  </AppMain>
</template>

<script>
import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";
import AppMain from "@/layouts/AppMain";
import AppHeading from "@/common/components/AppHeading";
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
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView: WithDrop(BuilderPizzaView),
    BuilderPizzaSearch,
    BuilderPriceCounter,
  },
  data() {
    return {
      fillings: [],
      doughValues: {
        1: {
          value: "light",
        },
        2: {
          value: "large",
        },
      },
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
      dough,
      ingredients,
      sauces,
      sizes,
    };
  },
  methods: {
    setPizza(e) {
      console.log(e);
    },
    updateFillings(filling) {
      // TODO str => obj
      if (this.fillings.find((v) => v === filling)) {
        return;
      }
      this.fillings.push(filling);
    },
    getDropData(e) {
      this.updateFillings(e);
    },
  },
};
</script>
