import View from "./View";

class cartView extends View {
  _parentElement = document.querySelector("#meals");
  removeFromCartHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".remove-cart-btn")) {
        const id = e.target.closest(".cart-item").dataset.id;
   
        e.target.closest(".cart-item").remove();
        document.querySelector(".cart-quantity").textContent--;
        document.querySelector("body").insertAdjacentHTML(
          "afterbegin",
          `
  <p class="cart-thick remo">item removed from cart <i class='bx bx-check' ></i></p>
  `,
        );
        setTimeout(() => {
          document.querySelector(".cart-thick").remove();
        }, 2000);
        
        handler(id);
      }
    });
  }
  _generateMarkup() {
    this._clear();
    this._parentElement.parentElement.querySelector("#pagination").innerHTML =
      "";
    if (this._data.items.length === 0) {
      this._parentElement.innerHTML = "";
      this._parentElement.classList.add("meal-view-grid");
      return `
            <p>you have no item in your cart</P>
            `;
    } else if (this._data.items.length > 0) {
     
      this._parentElement.innerHTML = "";
      this._parentElement.classList.add("meal-view-grid");
      let markup = "";
      this._data.items.forEach((meal) => {
        console.log(meal.id);
        markup += `
        <div class="cart-item" data-id="${meal.id}">
        <img src="${meal.img}" alt="" />
        <div class="description">
        <p class="name">name : <span class="item-name">${meal.name}</span></p>
          <p class="price">total price : <span class="total-price">${
            meal.price
          } X ${meal.amount} = ${meal.price * meal.amount}</span></p>
          
        </div>
        <a href="#" class="remove-cart-btn btn btn-danger"
          >remove <i class="bx bx-trash-alt"></i
        ></a>
      </div>
            `;
      });
      markup += `
      <div class="cart-sub">
      <div className="right">
      <p>you hav ${this._data.quantity} items in yout cart</p>
      <p>total payment : ${this._data.totalPrice}</p>
      </div>
      <div className="left"><a href="#" class="btn btn-succes">checkout</a></div>
      </div>
      `;
      return markup;
    }
  }
}
export default new cartView();
