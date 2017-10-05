/* Javascript은 이 파일에서만 작성해주세요. */

(function() {
  var userTypes = {
    0: '일반인',
    1: '컴공학생',
    2: '웹개발자',
    3: '웹디자이너',
    4: '사장님'
  };
  var userCollection = [];
  var userId = 0;
  var targetUser = null;

  function View (selector) {
    this.element = document.querySelector(selector);
  }

  View.prototype.removeClass = function (className) {
    this.element.classList.remove(className);
  };

  View.prototype.hide = function () {
    this.element.style.display = 'none';
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

      cb(e);
    });
  };

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

  function onNewUserSelection (e) {
    if (createUserFormView.isHidden()) {
      createUserFormView.show();
    } else {
      createUserFormView.reset();
    }

    var userType = e.target.dataset.type;

    newUserListView.updateSelection('type', userType);
    createUserFormView.updateUserTypeSelection(userType);
  }

  function onCurrentUserSelection (e) {
    var targetUserID = e.target.dataset.id;
    currentUserListView.updateSelection('id', targetUserID);

    if (updateUserFormView.isHidden()) {
      updateUserFormView.show();
    } else {
      updateUserFormView.reset();
    }

    targetUser = userCollection[targetUserID];
    updateUserFormView.fill(targetUser);
  }

  function cancelNewUserCreation () {
    createUserFormView.hide();
    createUserFormView.reset();
    newUserListView.clearSelection();
  }

  function cancelCurrentUserUpdate () {
    updateUserFormView.hide();
    updateUserFormView.reset();
    currentUserListView.clearSelection();
  }

  function createUser (e) {
    var user = {
      id: userId,
      type: createUserFormView.getUserTypeFieldValue()
    };

    var inspectionResult = createUserFormView.inspect();

    if (inspectionResult.error) {
      createUserFormView.triggerError();
      return;
    } else {
      for (var prop in inspectionResult.fieldValues) {
        if (inspectionResult.fieldValues.hasOwnProperty(prop)) {
          user[prop] = inspectionResult.fieldValues[prop];
        }
      }

      userCollection[userId] = user;
      userId++;
    }

    currentUserListView.addNewUser(user.id, user.username);
    createUserFormView.showSuccessMode();
  }

  function updateUser (e) {
    var inspectionResult = updateUserFormView.inspect();

    if (inspectionResult.error) {
      updateUserFormView.triggerError();
      return;
    }

    for (var prop in inspectionResult.fieldValues) {
      if (inspectionResult.fieldValues.hasOwnProperty(prop)) {
        targetUser[prop] = inspectionResult.fieldValues[prop];
      }
    }

    targetUser.type = updateUserFormView.getUserTypeFieldValue();

    currentUserListView.updateUsername(targetUser.id, targetUser.username);
    updateUserFormView.showSuccessMode();
  }

  function updateUserList (e) {
    newUserListView.updateSelection('type', e.currentTarget.value);
  }

  var newUserListView = new ListView('.new-user-selection');
  var currentUserListView = new CurrentUserListView('.existing-user-list');
  var createUserFormView = new UserFormView('.user-form.create');
  var updateUserFormView = new UpdateUserFormView('.user-form.update');

  newUserListView.onListItemClick(onNewUserSelection);
  currentUserListView.onListItemClick(onCurrentUserSelection);
  createUserFormView.onCancel(cancelNewUserCreation);
  createUserFormView.onClose(cancelNewUserCreation);
  createUserFormView.onSave(createUser);
  createUserFormView.onUserTypeChange(updateUserList);
  updateUserFormView.onCancel(cancelCurrentUserUpdate);
  updateUserFormView.onClose(cancelCurrentUserUpdate);
  updateUserFormView.onSave(updateUser);
})();
