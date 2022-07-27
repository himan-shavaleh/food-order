import View from "./View";
class paginationView extends View {
  _parentElement = document.querySelector("#pagination");
  //   event handlers
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const btn = e.target.closest(".page");
      const goto = +btn.dataset.goto;
      handler(this._data.category, goto);
    });
  }
  _generateMarkup() {
    this._parentElement.innerHTML = "";
    const pagesNumber = Math.ceil(
      this._data.meals.length / this._data.mealsPerPage,
    );
    const curPage = this._data.page;

    let markup = "";
    if (curPage === 1 && pagesNumber > 1) {
      // page one and therre is other pages
      for (let i = 1; i <= pagesNumber; i++) {
        if (curPage === i) {
          markup += `<a data-goto="${i}" href="#" class="page active-page">${i}</a>`;
          continue;
        }
        markup += `<a data-goto="${i}" href="#" class="page">${i}</a>`;
      }
      markup += `
            <a data-goto="${curPage + 1}" class="page">
              <span>Page ${curPage + 1}</span>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvt1EEKgDAQA8D0Z/5EfZn6UiXQghRsk6W96clDm8HNYsLkJ03Oxw90J6yO6ARwA9i7idUBBWD4mu/x3UJcgI6FKEAJLV9hISoQRhwghLiAjYwALgDb1/q6wHtlmdkM5wEHsMMdIBSuAuFwFWCBRy6xO/O6bLUDIktrW0ZtkfsztbbIDlc7CAWXS2oHYWQ68AB5cxsZKj/ZQgAAAABJRU5ErkJggg=="/>
            </a>
          `;
      return markup;
    }
    // have more than 1  pages and we are not in page one or last page
    if (curPage < pagesNumber) {
      markup += `
        <a data-goto="${curPage - 1}" class="page">
        <box-icon name='chevron-left' type='solid' ></box-icon>
          <span>Page ${curPage - 1}</span>
        </a>
      `;
      for (let i = 1; i <= pagesNumber; i++) {
        if (curPage === i) {
          markup += `<a data-goto="${i}" href="#" class="page active-page">${i}</a>`;
          continue;
        }
        markup += `<a data-goto="${i}" href="#" class="page">${i}</a>`;
      }
      markup += `
      <a data-goto="${curPage + 1}" class="page">
        <span>Page ${curPage + 1}</span>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvt1EEKgDAQA8D0Z/5EfZn6UiXQghRsk6W96clDm8HNYsLkJ03Oxw90J6yO6ARwA9i7idUBBWD4mu/x3UJcgI6FKEAJLV9hISoQRhwghLiAjYwALgDb1/q6wHtlmdkM5wEHsMMdIBSuAuFwFWCBRy6xO/O6bLUDIktrW0ZtkfsztbbIDlc7CAWXS2oHYWQ68AB5cxsZKj/ZQgAAAABJRU5ErkJggg=="/>
      </a>
    `;
      return markup;
    }
    if (curPage === pagesNumber && pagesNumber > 1) {
      markup += `
        <a data-goto="${curPage - 1}" class="page">
        <box-icon name='chevron-left' type='solid' ></box-icon>
          <span>Page ${curPage - 1}</span>
        </a>
      `;
      // page one and therre is other pages
      for (let i = 1; i <= pagesNumber; i++) {
        if (curPage === i) {
          markup += `<a data-goto="${i}" href="#" class="page active-page">${i}</a>`;
          continue;
        }
        markup += `<a data-goto="${i}" href="#" class="page">${i}</a>`;
      }

      return markup;
    }

    // Page 1, and there are NO other pages
    return "";
  }
}
export default new paginationView();
