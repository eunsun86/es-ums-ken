function ListView (selector) {
  View.call(this, selector);
  this.selectedItemClassName = 'selected';
}

ListView.prototype = Object.create(View.prototype);
ListView.prototype.constructor = ListView;

ListView.prototype.updateSelection = function (dataType, data) {
  var that = this;

  View.forEach(View.getElements(that.element, 'li'), function reset (el) {
    if (el.dataset[dataType] !== data) {
      el.classList.remove(that.selectedItemClassName);
    } else {
      el.classList.add(that.selectedItemClassName);
    }
  });
};

ListView.prototype.clearSelection = function () {
  var that = this;

  View.forEach(View.getElements(that.element, 'li'), function reset (el) {
    el.classList.remove(that.selectedItemClassName);
  });
};

ListView.prototype.onListItemClick = function (cb) {
  this.element.addEventListener('click', function (e) {
    if (e.target.tagName !== 'LI') {
      return;
    }

    cb(e.target.dataset);
  });
};

window.ListView = ListView;
