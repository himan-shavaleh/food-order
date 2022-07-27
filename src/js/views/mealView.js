import View from "./View";

class mealView extends View {
  _parentElement = document.querySelector("#meals");
  addToCartHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".increase-amountm")) {
        e.target.closest(".add-form").querySelector("#amount").value++;
      }
      if (e.target.closest(".decrease-amountm")) {
        if (e.target.closest(".add-form").querySelector("#amount").value > 1)
          e.target.closest(".add-form").querySelector("#amount").value--;
      }
      if (e.target.closest(".submitAdd")) {
        const item = {
          amount: +e.target.closest(".add-form").querySelector("#amount").value,
          name: e.target.closest(".meal-view").querySelector(".meal-name")
            .textContent,
          img: e.target
            .closest(".meal-view")
            .querySelector(".meal-image")
            .getAttribute("src"),
          price: +e.target.closest(".meal-view").querySelector(".price")
            .textContent,
          id: e.target.closest(".meal-view").dataset.id,
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
    });
  }
  showMealHandlerClick(handler) {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".meal-btn")) {
        const id = e.target.closest(".meal").dataset.id;
        document
          .querySelectorAll(".modal")
          .forEach((modal) => modal.classList.add("hidden"));
        handler(id);
      }
    });
  }
  _generateMarkup() {
    this._parentElement.classList.add("meal-view-grid");
    this._parentElement.parentElement.querySelector("#pagination").innerHTML =
      "";

    this._parentElement.innerHTML = "";
    const markup = `
        <div class="meal-view" data-id="${this._data.idMeal}">
          <div class="header">
            <img class="meal-image" src="${this._data.strMealThumb}" alt="">
            <div class="description">
             
              <div class="ingredients">
              <p>name: <span class="meal-name">${this._data.strMeal}</span></p> 
              <p>tags:${this._data.strArea},${this._data.strTags}</p> 
              ${
                this._data.strIngredient1 &&
                `<p>ing 1:${this._data?.strIngredient1}</p>`
              }
              ${
                this._data.strIngredient2 &&
                `<p>ing 2:${this._data?.strIngredient2}</p>`
              }
              ${
                this._data.strIngredient3 &&
                `<p>ing 3:${this._data?.strIngredient3}</p>`
              }
              ${
                this._data.strIngredient4 &&
                `<p>ing 4:${this._data?.strIngredient4}</p>`
              }
              ${
                this._data.strIngredient5 &&
                `<p>ing 5:${this._data?.strIngredient5}</p>`
              }
                ${
                  this._data.strIngredient6 &&
                  `<p>ing 6:${this._data?.strIngredient6}</p>`
                }
                ${
                  this._data.strIngredient7 &&
                  `<p>ing 7:${this._data?.strIngredient7}</p>`
                }
                ${
                  this._data.strIngredient8 &&
                  `<p>ing 8:${this._data?.strIngredient8}</p>`
                }
                ${
                  this._data.strIngredient9 &&
                  `<p>ing 9:${this._data?.strIngredient9}</p>`
                }
                <div class="content">
                <p class="price-content">price: <span class="price">${(
                  +this._data.idMeal /
                  (Math.random() * 100000)
                ).toFixed(2)}</span> $</p>
                <form class="add-form">
                <div class="input-group">
                  <button class="increase-amountm"><box-icon name="plus"></box-icon></button>
                  <input value="1" type="number" name="amount" id="amount" />
                  <button class="decrease-amountm"><box-icon name="minus"></box-icon></button>
                </div>
        
                <input
                  class="btn btn-danger submitAdd"
                  type="submit"
                  value="ADD To Cart"
                />
              </form>
              </div>
              </div>
             
            </div>
          </div>
        
        </div>
        `;

    return markup;
  }
}
export default new mealView();
