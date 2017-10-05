function UpdateUserFormView (selector) {
  UserFormView.call(this, selector);
}

UpdateUserFormView.prototype = Object.create(UserFormView.prototype);
UpdateUserFormView.prototype.constructor = UpdateUserFormView;

UpdateUserFormView.prototype.fill = function (data) {
  View.forEach(View.getElements(this.element, 'input'), function (el) {
    el.value = data[el.id];
  });

  View.getElement(this.element, 'select').value = data.type;
};

window.UpdateUserFormView = UpdateUserFormView;
