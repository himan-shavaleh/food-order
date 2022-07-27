export default class View {
  _data;
 
  render(data, render = true) {
    this._clear();
    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.inerrHtml = "";
  }
}
