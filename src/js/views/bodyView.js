import View from "./View";
class bodyView extends View {
  _parentElement = document.querySelector("body");
  openAccountHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".account")) {
        handler();
      }
    });
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      // this section is for close and open search modal
      if (e.target.closest(".search")) {
        document.querySelector(".modal-search").classList.toggle("hidden");
      }
      if (e.target.closest(".close-modal")) {
        e.target.closest(".modal").classList.add("hidden");
      }
      if (e.target.closest(".overlay")) {
        e.target.closest(".modal").classList.add("hidden");
      }
      // search section functionality
      if (e.target.closest(".submit-search-btn")) {
        const foodName = document.querySelector("#search").value;
        handler(foodName);
        document.querySelector(".modal").classList.add("hidden");
      }
      if (e.target.closest(".home")) {
        window.location.reload();
      }
    });
  }
  showOffersMealsHandlerClickc(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".offers")) {
        handler(1, "c");
      }
    });
  }
  showCartHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".show-cart-btn")) {
        handler();
      }
    });
  }
  showWishlistHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".wishlist")) {
        const data = handler();
        console.log(data);
        document.querySelector(".wishlist-meals").innerHTML = "";
        if (data.length === 0) {
          // document.querySelector(".wishlist-meals").innerHTML = "";
          document.querySelector(
            ".wishlist-meals",
          ).innerHTML += `<p>you have no wishlist item</p>`;
        }
        if (data.length !== 0) {
          data.forEach((meal) => {
            // document.querySelector(".wishlist-meals").innerHTML = "";
            document.querySelector(".wishlist-meals").innerHTML += `
            <li data-id="${meal.idMeal}" class="wishlist-meal meal">
            <img src="${meal.strMealThumb}" alt="" />
            <div class="description">
              <p>name:${meal.strMeal}</p>
              <p>price: <span class="price">${(
                +meal.idMeal /
                (Math.random() * 100000)
              ).toFixed(2)}</span></p>
            </div>
            <div class="controls">
              <a href="#" class="btn btn-danger">add to cart</a>
              <a class="btn btn-succes meal-btn">read more</a>
              <a href="#" class="delete"><i class="bx bx-trash-alt"></i></a>
            </div>
          </li>
            `;
          });
        }
      }
      if (e.target.closest(".wishlist")) {
        document.querySelector(".wishlist-modal").classList.remove("hidden");
      }
      if (e.target.closest(".close-modal")) {
        e.target.closest(".modal").classList.add("hidden");
      }
      if (e.target.closest(".overlay")) {
        e.target.closest(".modal").classList.add("hidden");
      }
    });
  }
}
export default new bodyView();
