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

  var view = {
    hasClass: function (el, className) {
      return el.classList.contains(className);
    },
    removeClass: function (el, className) {
      el.classList.remove(className);
    },
    addClass: function (el, className) {
      el.classList.add(className);
    },
    hideElement: function (el) {
      el.style.display = 'none';
    },
    showBlockElement: function (el) {
      el.style.display = 'block';
    },
    showInlineBlockElement: function (el) {
      el.style.display = 'inline-block';
    },
    isBlockElement: function (el) {
      return el.style.display === 'block';
    },
    createElement: function (tagName) {
      return document.createElement(tagName);
    },
    getElement: function (el, selector) {
      if (typeof el === 'string') {
        selector = el;
        el = document;
      }
      return el.querySelector(selector);
    },
    getElements: function (el, selector) {
      if (typeof el === 'string') {
        selector = el;
        el = document;
      }
      return el.querySelectorAll(selector);
    },
    getElementValue: function (el) {
      return el.value;
    },
    setElementValue: function (el, value) {
      el.value = value;
    },
    clearElementValue: function (el) {
      el.value = '';
    },
    getDataAttr: function (el, attr) {
      return el.dataset[attr];
    },
    setDataAttr: function (el, attr, value) {
      el.dataset[attr] = value;
    },
    updateText: function (el, text) {
      el.textContent = text;
    },
    forEach: function (elements, cb) {
      Array.prototype.forEach.call(elements, cb);
    },
    addChild: function (el, child) {
      el.appendChild(child);
    }
  };

  var newUserTypeSelectionView = {
    element: document.querySelector('.new-user-selection'),
    updateSelection: function (type) {
      view.forEach(view.getElements(this.element, 'li'), function reset (el) {
        if (view.getDataAttr(el, 'type') !== type) {
          view.removeClass(el, 'selected');
        } else {
          view.addClass(el, 'selected');
        }
      });
    },
    clearSelection: function () {
      view.forEach(view.getElements(this.element, 'li'), function reset (el) {
        view.removeClass(el, 'selected');
      });
    }
  };

  var existingUserSelectionView = {
    element: document.querySelector('.existing-user-list'),
    updateSelection: function (userID) {
      view.forEach(view.getElements(this.element, 'li'), function reset (el) {
        if (view.getDataAttr(el, 'id') !== userID) {
          view.removeClass(el, 'selected');
        } else {
          view.addClass(el, 'selected');
        }
      });
    },
    clearSelection: function () {
      view.forEach(view.getElements(this.element, 'li'), function reset (el) {
        view.removeClass(el, 'selected');
      });
    },
    updateDisplayName: function (id, username) {
      view.updateText(view.getElement(this.element, '[data-id="' + id + '"]'), username);
    },
    addNewUser: function (id, username) {
      var listEl = view.createElement('li');
      view.addClass(listEl, 'list-item');
      view.updateText(listEl, username);
      view.setDataAttr(listEl, 'id', id);
      view.addChild(this.element, listEl);
    }
  };

  var createUserFormView = {
    element: document.querySelector('.user-form.create'),
    inspect: function () {
      var result = {
        error: null,
        fieldValues: {}
      };

      view.forEach(view.getElements(this.element, 'input'), function (el) {
        if (!el.value) {
          result.error = el.id;
        } else {
          result.fieldValues[el.id] = el.value;
        }
      });

      return result;
    },
    isHidden: function () {
      return !view.isBlockElement(this.element);
    },
    getUserType: function () {
      return Number(view.getElementValue(view.getElement(this.element, 'select')));
    },
    showSuccessMode: function () {
      view.removeClass(this.element, 'error');
      view.showBlockElement(view.getElement(this.element, '.success-message'));
      view.hideElement(view.getElement(this.element, 'button.submit'));
      view.hideElement(view.getElement(this.element, 'button.cancel'));
      view.showInlineBlockElement(view.getElement(this.element, 'button.close'));
    },
    reset: function () {
      var successMessageEl = view.getElement(this.element, '.success-message');
      var submitButtonEl = view.getElement(this.element, 'button.submit');
      var cancelButtonEl = view.getElement(this.element, 'button.cancel');
      var closeButtonEl = view.getElement(this.element, 'button.close');
      var inputFieldEls = view.getElements(this.element, 'input');

      view.removeClass(this.element, 'error');
      view.hideElement(successMessageEl);
      view.showInlineBlockElement(submitButtonEl);
      view.showInlineBlockElement(cancelButtonEl);
      view.hideElement(closeButtonEl);
      view.forEach(inputFieldEls, view.clearElementValue);
    },
    show: function () {
      view.showBlockElement(this.element);
    },
    hide: function () {
      view.hideElement(this.element);
    },
    triggerError: function () {
      view.addClass(this.element, 'error');
    },
    updateUserTypeSelection: function (type) {
      view.setElementValue(view.getElement(this.element, 'select'), type);
    }
  };

  var updateUserFormView = {
    element: document.querySelector('.user-form.update'),
    isHidden: function () {
      return !view.isBlockElement(this.element);
    },
    hide: function () {
      view.hideElement(this.element);
    },
    getUserType: function () {
      return Number(view.getElementValue(view.getElement(this.element, 'select')));
    },
    showSuccessMode: function () {
      view.removeClass(this.element, 'error');
      view.showBlockElement(view.getElement(this.element, '.success-message'));
      view.hideElement(view.getElement(this.element, 'button.submit'));
      view.hideElement(view.getElement(this.element, 'button.cancel'));
      view.showInlineBlockElement(view.getElement(this.element, 'button.close'));
    },
    show: function () {
      view.showBlockElement(this.element);
    },
    reset: function () {
      var successMessageEl = view.getElement(this.element, '.success-message');
      var submitButtonEl = view.getElement(this.element, 'button.submit');
      var cancelButtonEl = view.getElement(this.element, 'button.cancel');
      var closeButtonEl = view.getElement(this.element, 'button.close');
      var inputFieldEls = view.getElements(this.element, 'input');

      view.removeClass(this.element, 'error');
      view.hideElement(successMessageEl);
      view.showInlineBlockElement(submitButtonEl);
      view.showInlineBlockElement(cancelButtonEl);
      view.hideElement(closeButtonEl);
      view.forEach(inputFieldEls, view.clearElementValue);
    },
    setFormValues: function (userData) {
      view.forEach(view.getElements(this.element, 'input'), function (el) {
        el.value = userData[el.id];
      });

      view.setElementValue(view.getElement(this.element, 'select'), userData.type);
    },
    triggerError: function () {
      view.addClass(this.element, 'error');
    },
    inspect: function () {
      var result = {
        error: null,
        fieldValues: {}
      };

      view.forEach(view.getElements(this.element, 'input'), function (el) {
        if (!el.value) {
          result.error = el.id;
        } else {
          result.fieldValues[el.id] = el.value;
        }
      });

      return result;
    }
  };

  newUserTypeSelectionView.element.addEventListener('click', function createNewUser (e) {
    if (!view.hasClass(e.target, 'selection')) {
      return;
    }

    if (createUserFormView.isHidden()) {
      createUserFormView.show();
    } else {
      createUserFormView.reset();
    }

    var userType = view.getDataAttr(e.target, 'type');

    newUserTypeSelectionView.updateSelection(userType);
    createUserFormView.updateUserTypeSelection(userType);
  });

  existingUserSelectionView.element.addEventListener('click', function modifyUser (e) {
    if (!view.hasClass(e.target, 'list-item')) {
      return;
    }

    var targetUserID = view.getDataAttr(e.target, 'id');

    existingUserSelectionView.updateSelection(targetUserID);

    if (updateUserFormView.isHidden()) {
      updateUserFormView.show();
    } else {
      updateUserFormView.reset();
    }

    targetUser = userCollection[targetUserID];

    updateUserFormView.setFormValues(targetUser);
  });

  createUserFormView.element.addEventListener('click', function onButtonClick (e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    if (view.hasClass(e.target, 'close') || view.hasClass(e.target, 'cancel')) {
      createUserFormView.hide();
      createUserFormView.reset();
      newUserTypeSelectionView.clearSelection();
      return;
    }

    var user = {
      id: userId,
      type: createUserFormView.getUserType()
    };

    var inspectionResult = createUserFormView.inspect();

    if (inspectionResult.error) {
      createUserFormView.triggerError();
      return;
    } else {
      for (var prop in inspectionResult.fieldValues) {
        if (prop !== 'error' && inspectionResult.fieldValues.hasOwnProperty(prop)) {
          user[prop] = inspectionResult.fieldValues[prop];
        }
      }

      userCollection[userId] = user;
      userId++;
    }

    existingUserSelectionView.addNewUser(user.id, user.username);
    createUserFormView.showSuccessMode();
  });

  updateUserFormView.element.addEventListener('click', function onButtonClick (e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    if (view.hasClass(e.target, 'close') || view.hasClass(e.target, 'cancel')) {
      updateUserFormView.hide();
      updateUserFormView.reset();
      existingUserSelectionView.clearSelection();
      return;
    }

    var inspectionResult = updateUserFormView.inspect();

    if (inspectionResult.error) {
      updateUserFormView.triggerError();
      return;
    }

    for (var prop in inspectionResult.fieldValues) {
      if (prop !== 'error' && inspectionResult.fieldValues.hasOwnProperty(prop)) {
        targetUser[prop] = inspectionResult.fieldValues[prop];
      }
    }

    targetUser.type = updateUserFormView.getUserType();

    existingUserSelectionView.updateDisplayName(targetUser.id, targetUser.username);
    updateUserFormView.showSuccessMode();
  });

  view.getElement(createUserFormView.element, 'select').addEventListener('change', function (e) {
    newUserTypeSelectionView.updateSelection(e.currentTarget.value);
  });
})();
