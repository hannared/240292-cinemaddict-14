import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
  }

  restoreHandlers() {
    //абстрактный метод restoreHandlers, его нужно будет реализовать в наследнике.
    //Его задача — восстанавливать обработчики событий после перерисовки;
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
  }
  //удалить старый DOM-элемент компонента;
  // создать новый DOM-элемент;
  // поместить новый элемент вместо старого;

  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    this.updateElement();
  }
}
