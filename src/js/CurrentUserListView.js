function CurrentUserListView (selector) {
  ListView.call(this, selector);
}

CurrentUserListView.prototype = Object.create(ListView.prototype);
CurrentUserListView.prototype.constructor = CurrentUserListView;

CurrentUserListView.prototype.updateUsername = function (userID, username) {
  var targetListItem = View.getElement(this.element, '[data-id="' + userID + '"]');
  targetListItem.textContent = username;
};

CurrentUserListView.prototype.addNewUser = function (userID, username) {
  var listEl = document.createElement('li');

  listEl.classList.add('list-item');
  listEl.textContent = username;
  listEl.dataset.id = userID;

  this.element.appendChild(listEl);
};

window.CurrentUserListView = CurrentUserListView;
