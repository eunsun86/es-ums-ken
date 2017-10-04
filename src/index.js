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

  var newUserSelectionEl = document.querySelector('.new-user-selection');
  var existingUserListEl = document.querySelector('.existing-user-list');
  var newUserFormEl = document.querySelector('.user-form.create');
  var updateUserFormEl = document.querySelector('.user-form.update');

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

  newUserSelectionEl.addEventListener('click', function createNewUser (e) {
    if (!view.hasClass(e.target, 'selection')) {
      return;
    }

    view.forEach(view.getElements(e.currentTarget, 'li'), function reset (el) {
      if (el !== e.target) {
        view.removeClass(el, 'selected');
      } else {
        view.addClass(el, 'selected');
      }
    });

    if (!view.isBlockElement(newUserFormEl)) {
      view.showBlockElement(newUserFormEl);
    } else {
      view.hideElement(view.getElement(newUserFormEl, '.success-message'));
      view.showInlineBlockElement(view.getElement(newUserFormEl, 'button.submit'));
      view.showInlineBlockElement(view.getElement(newUserFormEl, 'button.cancel'));
      view.hideElement(view.getElement(newUserFormEl, 'button.close'));
      view.forEach(view.getElements(newUserFormEl, 'input'), function reset (el) {
        view.clearElementValue(el);
      });
    }

    view.setElementValue(view.getElement(newUserFormEl, 'select'), view.getDataAttr(e.target, 'type'));
  });

  existingUserListEl.addEventListener('click', function modifyUser (e) {
    if (!view.hasClass(e.target, 'list-item')) {
      return;
    }

    view.forEach(view.getElements(e.currentTarget, 'li'), function reset (el) {
      if (el !== e.target) {
        view.removeClass(el, 'selected');
      } else {
        view.addClass(el, 'selected');
      }
    });

    if (!view.isBlockElement(updateUserFormEl)) {
      view.showBlockElement(updateUserFormEl);
    } else {
      view.hideElement(view.getElement(updateUserFormEl, '.success-message'));
      view.showInlineBlockElement(view.getElement(updateUserFormEl, 'button.submit'));
      view.showInlineBlockElement(view.getElement(updateUserFormEl, 'button.cancel'));
      view.hideElement(view.getElement(updateUserFormEl, 'button.close'));
    }

    var targetUserID = view.getDataAttr(e.target, 'id');
    targetUser = userCollection[targetUserID];

    view.forEach(view.getElements(updateUserFormEl, 'input'), function (el) {
      el.value = targetUser[el.id];
    });

    view.setElementValue(view.getElement(updateUserFormEl, 'select'), targetUser.type)
  });

  newUserFormEl.addEventListener('click', function onButtonClick (e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    if (view.hasClass(e.target, 'close') || view.hasClass(e.target, 'cancel')) {
      view.hideElement(e.currentTarget);
      view.removeClass(e.currentTarget, 'error');
      view.hideElement(view.getElement(e.currentTarget, '.success-message'));
      view.showInlineBlockElement(view.getElement(e.currentTarget, 'button.submit'));
      view.showInlineBlockElement(view.getElement(e.currentTarget, 'button.cancel'));
      view.hideElement(view.getElement(e.currentTarget, 'button.close'));
      view.forEach(view.getElements(e.currentTarget, 'input'), function (el) {
        view.clearElementValue(el);
      });
      view.forEach(view.getElements(newUserSelectionEl, 'li'), function (el) {
        view.removeClass(el, 'selected');
      });
      return;
    }

    var user = {
      id: userId,
      type: Number(view.getElementValue(view.getElement(e.currentTarget, 'select')))
    };

    var hasEmptyField = false;

    view.forEach(view.getElements(e.currentTarget, 'input'), function (el) {
      if (!el.value) {
        hasEmptyField = true;
      }

      user[el.id] = el.value;
    });

    if (hasEmptyField) {
      view.addClass(e.currentTarget, 'error');
      return;
    }

    userCollection[userId] = user;
    userId++;

    var listEl = view.createElement('li');
    view.addClass(listEl, 'list-item');
    view.updateText(listEl, user.username);
    view.setDataAttr(listEl, 'id', user.id);
    view.addChild(existingUserListEl, listEl);

    view.removeClass(e.currentTarget, 'error');
    view.showBlockElement(view.getElement(e.currentTarget, '.success-message'));
    view.hideElement(view.getElement(e.currentTarget, 'button.submit'));
    view.hideElement(view.getElement(e.currentTarget, 'button.cancel'));
    view.showInlineBlockElement(view.getElement(e.currentTarget, 'button.close'));
  });

  updateUserFormEl.addEventListener('click', function onButtonClick (e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    if (view.hasClass(e.target, 'close') || view.hasClass(e.target, 'cancel')) {
      view.hideElement(e.currentTarget);
      view.removeClass(e.currentTarget, 'error');
      view.hideElement(view.getElement(e.currentTarget, '.success-message'));
      view.showInlineBlockElement(view.getElement(e.currentTarget, 'button.submit'));
      view.showInlineBlockElement(view.getElement(e.currentTarget, 'button.cancel'));
      view.hideElement(view.getElement(e.currentTarget, 'button.close'));
      view.forEach(view.getElements(e.currentTarget, 'input'), function (el) {
        view.clearElementValue(el);
      });
      view.forEach(view.getElements(existingUserListEl, 'li'), function (el) {
        view.removeClass(el, 'selected');
      });
      return;
    }

    var hasEmptyField = false;

    view.forEach(view.getElements(e.currentTarget, 'input'), function (el) {
      if (!el.value) {
        hasEmptyField = true;
      }

      targetUser[el.id] = el.value;
    });

    if (hasEmptyField) {
      view.addClass(e.currentTarget, 'error');
      return;
    }

    targetUser.type = Number(view.getElementValue(view.getElement(e.currentTarget, 'select')));

    view.updateText(view.getElement(existingUserListEl, '[data-id="' + targetUser.id + '"]'), targetUser.username);

    view.removeClass(e.currentTarget, 'error');
    view.showBlockElement(view.getElement(e.currentTarget, '.success-message'));
    view.hideElement(view.getElement(e.currentTarget, 'button.submit'));
    view.hideElement(view.getElement(e.currentTarget, 'button.cancel'));
    view.showInlineBlockElement(view.getElement(e.currentTarget, 'button.close'));
  });

  view.getElement(newUserFormEl, 'select').addEventListener('change', function (e) {
    var target = view.getElement(newUserSelectionEl, 'li[data-type="' + e.currentTarget.value + '"]');
    view.forEach(view.getElements(newUserSelectionEl, 'li'), function (el) {
      if (el !== target) {
        view.removeClass(el, 'selected');
      } else {
        view.addClass(el, 'selected');
      }
    });
  });
})();
