import View from "./View";
class categoriesView extends View {
  _parentElement = document.querySelector("#category");
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      console.log("hi");
      if (e.target.closest(".category")) {
        const catName = e.target
          .closest(".category")
          .querySelector(".category-name")
          .textContent.toLowerCase();

        handler(catName);
      }
    });
  }
  _generateMarkup() {
    
    this._clear();
    let markup = "";
    this._data.forEach((category) => {
      const html = `<a href="#" class="category">
          <img src="${category.strCategoryThumb}" alt="category ${category.strCategory}" >
        <p class="category-name">${category.strCategory}</p>
       </a>`;
      markup += html;
    });
    return markup;
  }
}
export default new categoriesView();
