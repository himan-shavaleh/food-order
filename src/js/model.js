import { async } from "regenerator-runtime";

export const state = {
  account: {
    isLoggedIn: false,
    loggedInUser: null,
    users: [],
  },
  categories: [],
  meals: [],
  meal: null,
  wishlist: [],
  page: 2,
  mealsPerPage: 8,
  category: "",
  cart: {
    items: [],
    quantity: 0,
    totalPrice: 0,
  },
};

export const loadCategories = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );
  const data = await res.json();
  state.categories = data.categories;
};
export const loadMainFoods = async (query = "b") => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`,
  );
  const data = await res.json();
  state.meals = data.meals;
};
export const getMealsForPage = (page = state.page) => {
  state.page = page;
  start = (page - 1) * state.mealsPerPage;
  end = page * state.mealsPerPage;
  return state.meals.slice(start, end);
};
export const getCategoryMeals = async (catName) => {
  let res;
  if (catName === "") {
    res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=b");
  } else {
    res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`,
    );
  }
  const data = await res.json();
  state.meals = [];
  state.category = catName;
  state.meals = data.meals;
};
export const getSearchFood = async (foodName) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`,
  );
  const data = await res.json();
  state.meal = data.meals[0];
};
export const getMealById = async (id) => {
  const res = await fetch(
    `https:/www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const data = await res.json();

  state.meal = data.meals[0];
};
