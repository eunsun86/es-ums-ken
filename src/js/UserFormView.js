function UserFormView (selector) {
  View.call(this, selector);
  this.displayType = 'block';
}

UserFormView.prototype = Object.create(View.prototype);
UserFormView.prototype.constructor = UserFormView;

UserFormView.prototype.getUserTypeFieldValue = function () {
  return Number(View.getElement(this.element, 'select').value);
};

UserFormView.prototype.inspect = function () {
  var result = {
    error: null,
    fieldValues: {}
  };

  View.forEach(View.getElements(this.element, 'input'), function (el) {
    if (!el.value) {
      result.error = el.id;
    } else {
      result.fieldValues[el.id] = el.value;
    }
  });

  return result;
};

UserFormView.prototype.showSuccessMode = function () {
  this.removeClass('error');
  View.showElement(View.getElement(this.element, '.success-message'), 'block');
  View.hideElement(View.getElement(this.element, 'button.submit'));
  View.hideElement(View.getElement(this.element, 'button.cancel'));
  View.showElement(View.getElement(this.element, 'button.close'), 'inline-block');
};

UserFormView.prototype.reset = function () {
  var successMessageEl = View.getElement(this.element, '.success-message');
  var submitButtonEl = View.getElement(this.element, 'button.submit');
  var cancelButtonEl = View.getElement(this.element, 'button.cancel');
  var closeButtonEl = View.getElement(this.element, 'button.close');
  var inputFieldEls = View.getElements(this.element, 'input');

  this.removeClass('error');
  View.hideElement(successMessageEl);
  View.showElement(submitButtonEl, 'inline-block');
  View.showElement(cancelButtonEl, 'inline-block');
  View.hideElement(closeButtonEl);
  View.forEach(inputFieldEls, View.clearElementValue);
};

UserFormView.prototype.triggerError = function () {
  this.element.classList.add('error');
};

UserFormView.prototype.updateUserTypeSelection = function (type) {
  var userTypeSelectionEl = View.getElement(this.element, 'select');
  userTypeSelectionEl.value = type;
};

UserFormView.prototype.onSave = function (cb) {
  var saveButtonEl = View.getElement(this.element, '.submit');
  saveButtonEl.addEventListener('click', cb);
}

UserFormView.prototype.onCancel = function (cb) {
  var cancelButtonEl = View.getElement(this.element, '.cancel');
  cancelButtonEl.addEventListener('click', cb);
};

UserFormView.prototype.onClose = function (cb) {
  var closeButtonEl = View.getElement(this.element, '.close');
  closeButtonEl.addEventListener('click', cb);
};

UserFormView.prototype.onUserTypeChange = function (cb) {
  View.getElement(this.element, 'select').addEventListener('change', cb);
};

window.UserFormView = UserFormView;
