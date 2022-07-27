import "boxicons";
import * as model from "./model";
import categoriesView from "./views/categoriesView";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import foodsView from "./views/foodsView";
import paginationView from "./views/paginationView";
import bodyView from "./views/bodyView";
import mealView from "./views/mealView";
import wishlistView from "./views/wishlistView";
import cartView from "./views/cartView";
import accountView from "./views/accountView";
const controlCategoriesResult = async () => {
  await model.loadCategories();

  categoriesView.render(model.state.categories);
};
const controlMealsResult = async (goto = 1, query) => {
  await model.loadMainFoods(query);
  foodsView.render(model.getMealsForPage(goto));
  await paginationView.render(model.state);
};

const controlPagination = async (query) => {
  await paginationView.render(model.state);
};
const controlCategoryMeals = async (catName, goto = 1) => {
  await model.getCategoryMeals(catName);
  foodsView.render(model.getMealsForPage(goto));
  paginationView.render(model.state);
};
// search controlers
const searchControl = async (foodName) => {
  await model.getSearchFood(foodName);
  mealView.render(model.state.meal);
};
//document controls
const setWishlistMeal = (meal) => {
  if (model.state.wishlist.find((mealx) => meal.idMeal === mealx.idMeal)) {
    model.state.wishlist = model.state.wishlist.filter(
      (mealx) => meal.idMeal == mealx.idMeal,
    );
  } else {
    model.state.wishlist.push(meal);
  }
  return model.state.wishlist;
};
const removeWishlistControler = (id) => {
  model.state.wishlist = model.state.wishlist = model.state.wishlist.filter(
    (meal) => meal.idMeal != id,
  );
};
const getMealByIdControler = async (id) => {
  await model.getMealById(id);
  mealView.render(model.state.meal);
};
const getWishlistMealsControler = () => {
  return model.state.wishlist;
};
const getCartItemsControler = () => {
  cartView.render(model.state.cart);
  console.log(model.state.cart);
};
const setCartItemControler = (item) => {
  const itemInCartIndex = model.state.cart.items.findIndex(
    (meal) => meal.id === item.id,
  );
  if (itemInCartIndex >= 0) {
    model.state.cart.items[itemInCartIndex].amount += item.amount;
    model.state.cart.totalPrice += +item.amount * +item.price;
  } else if (itemInCartIndex === -1) {
    model.state.cart.items.push(item);
    model.state.cart.quantity++;
    model.state.cart.totalPrice += +item.amount * +item.price;
  }
};
const removeCartItemControler = (id) => {
  const currentItem = model.state.cart.items.find((item) => item.id == id);
  console.log(currentItem);
  model.state.cart.totalPrice -= currentItem.amount * currentItem.price;
  model.state.cart.items = model.state.cart.items.filter(
    (item) => item.id != id,
  );
  model.state.cart.quantity--;
  cartView.render(model.state.cart);
};
const accountControler = () => {
  accountView.render(model.state.account);
};
const loginRengerControler = (acc) => {
  model.state.account.isLoggedIn = true;
  model.state.account.loggedInUser = acc.id;
  controlMealsResult(1, "g");
};
const addUserControler = (user) => {
  console.log(123);
  model.state.account.users.push(user);
};
const init = () => {
  controlCategoriesResult();
  controlMealsResult();
  controlPagination();
  paginationView.addHandlerClick(controlCategoryMeals);
  paginationView.addHandlerClick(controlPagination);
  categoriesView.addHandlerClick(controlCategoryMeals);
  bodyView.addHandlerClick(searchControl);
  foodsView.addWishlistHandlerClick(setWishlistMeal);
  bodyView.showWishlistHandlerClick(getWishlistMealsControler);
  wishlistView.removeFromWishlistHandlerClick(
    removeWishlistControler,
    model.state.wishlist,
  );
  mealView.showMealHandlerClick(getMealByIdControler, model.state.meal);
  bodyView.showOffersMealsHandlerClickc(controlMealsResult);
  bodyView.showCartHandlerClick(getCartItemsControler);
  foodsView.addToCartHandlerClick(setCartItemControler);
  cartView.removeFromCartHandlerClick(removeCartItemControler);
  mealView.addToCartHandlerClick(setCartItemControler);
  bodyView.openAccountHandlerClick(accountControler);
  accountView.loginBtnHandlerClick(loginRengerControler);
  accountView.gotoRegisterPageHandlerClick();
  accountView.signupBtnHandlerClick(loginRengerControler, addUserControler);
};
init();
