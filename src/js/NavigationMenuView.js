function NavigationMenuView (selector) {
  ListView.call(this, selector);

  this.select = function (routeName) {
    var listElements = this.element.querySelectorAll('li');
    var targetEl = this.element.querySelector('li[data-route="' + routeName + '"]');

    View.forEach(listElements, function (el) {
      el.classList.remove('selected');
    });

    targetEl.classList.add('selected');
  };
}

NavigationMenuView.prototype = Object.create(ListView.prototype);
NavigationMenuView.prototype.constructor = NavigationMenuView;

window.NavigationMenuView = NavigationMenuView;
