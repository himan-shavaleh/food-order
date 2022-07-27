import View from "./View";
class foodView extends View {
  _parentElement = document.querySelector("#meals");
  addToCartHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".increase-amount")) {
        e.target.closest(".add-form").querySelector("#amount").value++;
      }
      if (e.target.closest(".decrease-amount")) {
        if (e.target.closest(".add-form").querySelector("#amount").value > 1)
          e.target.closest(".add-form").querySelector("#amount").value--;
      }
      if (e.target.closest(".submitAdd")) {
        if (e.target.closest(".meal")) {
          const item = {
            amount: +e.target.closest(".add-form").querySelector("#amount")
              .value,
            name: e.target.closest(".meal").querySelector(".meal-name")
              .textContent,
            img: e.target
              .closest(".meal")
              .querySelector(".meal-image")
              .getAttribute("src"),
            price: +e.target.closest(".meal").querySelector(".price")
              .textContent,
            id: e.target.closest(".meal").dataset.id,
          };
          document.querySelector(".cart-quantity").textContent++;

          document.querySelector("body").insertAdjacentHTML(
            "afterbegin",
            `
<p class="cart-thick">item added to cart <i class='bx bx-check' ></i></p>
`,
          );
          setTimeout(() => {
            document.querySelector(".cart-thick").remove();
          }, 2000);
          handler(item);
        }
      }
    });
  }
  addWishlistHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".heart")) {
        const name = e.target
          .closest(".meal")
          .querySelector(".meal-name").textContent;
        const id = e.target.closest(".meal").dataset.id;
        const img = e.target
          .closest(".meal")
          .querySelector(".meal-image")
          .getAttribute("src");
        const price = e.target
          .closest(".meal")
          .querySelector(".price").textContent;
        const meal = {
          idMeal: id,
          strMealThumb: img,
          price: price,
          strMeal: name,
        };
        e.target
          .closest(".heart")
          .querySelector(".bx")
          .classList.toggle("bxs-heart");
        e.target
          .closest(".heart")
          .querySelector(".bx")
          .classList.toggle("bx-heart");
        if (
          e.target
            .closest(".heart")
            .querySelector(".bx")
            .classList.contains("bx-heart")
        ) {
          --document.querySelector(".wishlist-counter").textContent;
        } else if (
          e.target
            .closest(".heart")
            .querySelector(".bx")
            .classList.contains("bxs-heart")
        ) {
          ++document.querySelector(".wishlist-counter").textContent;
        }
        // console.log(meal);
        handler(meal);
      }
    });
  }
  _generateMarkup() {
    this._parentElement.innerHTML = "";
    this._parentElement.classList.remove("meal-view-grid");

    let markup = "";
    this._data.forEach((food) => {
      const html = `
      <div data-id="${food.idMeal}" href="#" class="meal meal-style">
    <span class="heart"><i class='bx bx-heart' ></i></span>
      <img class="meal-image" src="${food.strMealThumb}" alt="" />
      <div class="description">
        <p>Name : <span class="meal-name">${food.strMeal}</span> </p>

        <p class="price-content">price: <span class="price">${(
          +food.idMeal /
          (Math.random() * 100000)
        ).toFixed(2)}</span> $</p>
        <a href="#" class="btn btn-succes meal-btn">read more</a>
      </div>
      <form class="add-form">
        <div class="input-group">
          <button class="increase-amount"><box-icon name="plus"></box-icon></button>
          <input value="1" type="number" name="amount" id="amount" />
          <button class="decrease-amount"><box-icon name="minus"></box-icon></button>
        </div>

        <input
          class="btn btn-danger submitAdd"
          type="submit"
          value="ADD To Cart"
        />
      </form>
    </div>
      `;
      markup += html;
    });
    return markup;
  }
}
export default new foodView();
