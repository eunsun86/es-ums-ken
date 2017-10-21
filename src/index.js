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
    hasClass: function hasClass (el, className) {
      return el.classList.contains(className);
    },
    removeClass: function removeClass (el, className) {
      el.classList.remove(className);
    },
    addClass: function addClass (el, className) {
      el.classList.add(className);
    },
    hideElement: function hideElement (el) {
      el.style.display = 'none';
    },
    showBlockElement: function showBlockElement (el) {
      el.style.display = 'block';
    },
    showInlineBlockElement: function showInlineBlockElement (el) {
      el.style.display = 'inline-block';
    },
    isBlockElement: function isBlockElement (el) {
      return el.style.display === 'block';
    },
    createElement: function createElement (tagName) {
      return document.createElement(tagName);
    },
    getElement: function getElement (el, selector) {
      if (typeof el === 'string') {
        selector = el;
        el = document;
      }
      return el.querySelector(selector);
    },
    getElements: function getElements (el, selector) {
      if (typeof el === 'string') {
        selector = el;
        el = document;
      }
      return el.querySelectorAll(selector);
    },
    getElementValue: function getElementValue (el) {
      return el.value;
    },
    setElementValue: function setElementValue (el, value) {
      el.value = value;
    },
    clearElementValue: function clearElementValue (el) {
      el.value = '';
    },
    getDataAttr: function getDataAttr (el, attr) {
      return el.dataset[attr];
    },
    setDataAttr: function setDataAttr (el, attr, value) {
      el.dataset[attr] = value;
    },
    updateText: function updateText (el, text) {
      el.textContent = text;
    },
    forEach: function forEach (elements, cb) {
      Array.prototype.forEach.call(elements, cb);
    },
    addChild: function addChild (el, child) {
      el.appendChild(child);
    }
  };

  var newUserTypeSelectionView = {
    element: view.getElement('.new-user-selection'),
    userTypeListElements: view.getElements(document, '.new-user-selection li'),
    CLASSNAMES: {
      SELECTED: 'selected'
    },
    forEachListElements: function forEachListElements (cb) {
      view.forEach(this.userTypeListElements, cb);
    },
    updateSelection: function updateSelection (type) {
      var that = this;

      that.forEachListElements(function toggleSelectedClassName (el) {
        if (view.getDataAttr(el, 'type') !== type) {
          view.removeClass(el, that.CLASSNAMES.SELECTED);
        } else {
          view.addClass(el, that.CLASSNAMES.SELECTED);
        }
      });
    },
    clearSelection: function clearSelection () {
      var that = this;

      that.forEachListElements(function resetSelectedClassName (el) {
        view.removeClass(el, that.CLASSNAMES.SELECTED);
      });
    }
  };

  var existingUserListView = {
    element: view.getElement('.existing-user-list'),
    CLASSNAMES: {
      SELECTED: 'selected'
    },
    forEachExistingUsers: function forEachExistingUsers (cb) {
      view.forEach(view.getElements(this.element, 'li'), cb.bind(this));
    },
    updateSelection: function updateSelection (userID) {
      this.forEachExistingUsers(function toggleSelectedClassName (el) {
        if (view.getDataAttr(el, 'id') !== userID) {
          view.removeClass(el, this.CLASSNAMES.SELECTED);
        } else {
          view.addClass(el, this.CLASSNAMES.SELECTED);
        }
      });
    },
    clearSelection: function clearSelection () {
      this.forEachExistingUsers(function reset (el) {
        view.removeClass(el, this.CLASSNAMES.SELECTED);
      });
    },
    updateDisplayName: function updateDisplayName (id, username) {
      view.updateText(view.getElement(this.element, '[data-id="' + id + '"]'), username);
    },
    addNewUser: function addNewUser (id, username) {
      var listEl = view.createElement('li');
      view.addClass(listEl, 'list-item');
      view.updateText(listEl, username);
      view.setDataAttr(listEl, 'id', id);
      view.addChild(this.element, listEl);
    }
  };

  var createUserFormView = {
    element: view.getElement('.user-form.create'),
    inputFieldElements: view.getElements(document, '.user-form.create input'),
    userTypeSelectElement: view.getElement(document, '.user-form.create select'),
    successMessageElement: view.getElement(document, '.user-form.create .success-message'),
    submitButtonElement: view.getElement(document, '.user-form.create button.submit'),
    cancelButtonElement: view.getElement(document, '.user-form.create button.cancel'),
    closeButtonElement: view.getElement(document, '.user-form.create button.close'),
    inspect: function inspect () {
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
    isHidden: function isHidden () {
      return !view.isBlockElement(this.element);
    },
    getUserType: function getUserType () {
      return Number(view.getElementValue(view.getElement(this.element, 'select')));
    },
    showSuccessMode: function showSuccessMode () {
      view.removeClass(this.element, 'error');
      view.showBlockElement(this.successMessageElement);
      view.hideElement(this.submitButtonElement);
      view.hideElement(this.cancelButtonElement);
      view.showInlineBlockElement(this.closeButtonElement);
    },
    reset: function reset () {
      view.removeClass(this.element, 'error');
      view.hideElement(this.successMessageElement);
      view.showInlineBlockElement(this.submitButtonElement);
      view.showInlineBlockElement(this.cancelButtonElement);
      view.hideElement(this.closeButtonElement);
      view.forEach(this.inputFieldElements, view.clearElementValue);
    },
    show: function show () {
      view.showBlockElement(this.element);
    },
    hide: function hide () {
      view.hideElement(this.element);
    },
    triggerError: function triggerError () {
      view.addClass(this.element, 'error');
    },
    updateUserTypeSelection: function updateUserTypeSelection (type) {
      view.setElementValue(this.userTypeSelectElement, type);
    }
  };

  var updateUserFormView = {
    element: view.getElement('.user-form.update'),
    inputFieldElements: view.getElements(document, '.user-form.update input'),
    userTypeSelectElement: view.getElement(document, '.user-form.update select'),
    successMessageElement: view.getElement(document, '.user-form.update .success-message'),
    submitButtonElement: view.getElement(document, '.user-form.update button.submit'),
    cancelButtonElement: view.getElement(document, '.user-form.update button.cancel'),
    closeButtonElement: view.getElement(document, '.user-form.update button.close'),
    isHidden: function isHidden () {
      return !view.isBlockElement(this.element);
    },
    hide: function hide () {
      view.hideElement(this.element);
    },
    getUserType: function getUserType () {
      return Number(view.getElementValue(view.getElement(this.element, 'select')));
    },
    showSuccessMode: function showSuccessMode () {
      view.removeClass(this.element, 'error');
      view.showBlockElement(this.successMessageElement);
      view.hideElement(this.submitButtonElement);
      view.hideElement(this.cancelButtonElement);
      view.showInlineBlockElement(this.closeButtonElement);
    },
    show: function show () {
      view.showBlockElement(this.element);
    },
    reset: function reset () {
      view.removeClass(this.element, 'error');
      view.hideElement(this.successMessageElement);
      view.showInlineBlockElement(this.submitButtonElement);
      view.showInlineBlockElement(this.cancelButtonElement);
      view.hideElement(this.closeButtonElement);
      view.forEach(this.inputFieldElements, view.clearElementValue);
    },
    setFormValues: function setFormValues (userData) {
      view.forEach(this.inputFieldElements, function resetInputValue (el) {
        el.value = userData[el.id];
      });

      view.setElementValue(this.userTypeSelectElement, userData.type);
    },
    triggerError: function triggerError () {
      view.addClass(this.element, 'error');
    },
    inspect: function inspect () {
      var result = {
        error: null,
        fieldValues: {}
      };

      view.forEach(this.inputFieldElements, function setInputValue (el) {
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

  existingUserListView.element.addEventListener('click', function modifyUser (e) {
    if (!view.hasClass(e.target, 'list-item')) {
      return;
    }

    var targetUserID = view.getDataAttr(e.target, 'id');

    existingUserListView.updateSelection(targetUserID);

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

    existingUserListView.addNewUser(user.id, user.username);
    createUserFormView.showSuccessMode();
  });

  updateUserFormView.element.addEventListener('click', function onButtonClick (e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    if (view.hasClass(e.target, 'close') || view.hasClass(e.target, 'cancel')) {
      updateUserFormView.hide();
      updateUserFormView.reset();
      existingUserListView.clearSelection();
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

    existingUserListView.updateDisplayName(targetUser.id, targetUser.username);
    updateUserFormView.showSuccessMode();
  });

  createUserFormView.userTypeSelectElement.addEventListener('change', function updateUserTypeSelection (e) {
    newUserTypeSelectionView.updateSelection(e.currentTarget.value);
  });
})();
