import View from "./View";

class wishlistView extends View {
  _parentElement = document.querySelector(".wishlist-meals");
  removeFromWishlistHandlerClick(handler, data) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".delete")) {
        let id;
        data.find((meal) => {
          if (e.target.closest(".wishlist-meal").dataset.id === meal.idMeal) {
            id = meal.idMeal;
          }
        });
        console.log(id);
        const mealID = e.target.closest(".wishlist-meal").dataset.id;

        document
          .querySelector("#app")
          .querySelectorAll(".meal")
          .forEach((meal) => {
            if (meal.dataset.id === mealID) {
              meal.querySelector(".bx").classList.toggle("bxs-heart");
              meal.querySelector(".bx").classList.toggle("bx-heart");
            }
          });
        e.target.closest(".wishlist-meal").remove();
        document.querySelector(".wishlist-counter").textContent--;
        if (document.querySelector(".wishlist-counter").textContent == 0) {
          document.querySelector(
            ".wishlist-meals",
          ).innerHTML = `<p>you have no wishlist item</p>`;
        }
        handler(id);
      }
    });
  }
  
}
export default new wishlistView();
