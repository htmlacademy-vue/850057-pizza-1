<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="{ id, name, description } in dough"
                :key="id"
                :class="`dough__input--${doughValues[id].value}`"
                class="dough__input"
              >
                <input
                  :value="doughValues[id].value"
                  type="radio"
                  name="dought"
                  class="visually-hidden"
                  checked
                />
                <b>{{ name }}</b>
                <span>{{ description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="{ id, name } in sizes"
                :key="id"
                :class="`diameter__input--${sizesValues[id].value}`"
                class="diameter__input"
              >
                <input
                  :value="sizesValues[id].value"
                  type="radio"
                  name="diameter"
                  class="visually-hidden"
                />
                <span>{{ name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="{ id, name } in sauces"
                  :key="id"
                  class="radio ingredients__input"
                >
                  <input
                    :value="saucesValues[id].value"
                    type="radio"
                    name="sauce"
                    checked
                  />
                  <span>{{ name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                  <li
                    v-for="{ id, name } in ingredients"
                    :key="id"
                    class="ingredients__item"
                  >
                    <span
                      :class="`filling--${ingredientsValues[id].value}`"
                      class="filling"
                    >
                      {{ name }}
                    </span>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";

export default {
  name: "Index",
  data() {
    return {
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
        },
        2: {
          value: "creamy",
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
};
</script>
