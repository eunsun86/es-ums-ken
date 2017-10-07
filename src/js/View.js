function View (selector) {
  this.element = document.querySelector(selector);
}

View.prototype.removeClass = function (className) {
  this.element.classList.remove(className);
};

View.prototype.hide = function () {
  this.element.remove();
};

View.prototype.show = function () {
  if (this.displayType !== 'block' && this.displayType !== 'inline-block') {
    throw new Error('Display type must be either block or inline block.');
  }

  this.element.style.display = this.displayType;
};

View.prototype.isHidden = function () {
  return !this.element.style.display || this.element.style.display === 'none';
};

View.getElement = function (el, selector) {
  return el.querySelector(selector);
};

View.getElements = function (el, selector) {
  return el.querySelectorAll(selector);
};

View.hideElement = function (el) {
  el.style.display = 'none';
};

View.showElement = function (el, displayType) {
  el.style.display = displayType;
};

View.clearElementValue = function (el) {
  el.value = '';
};

View.forEach = function (elements, cb) {
  Array.prototype.forEach.call(elements, cb);
};

// window.View = View;
