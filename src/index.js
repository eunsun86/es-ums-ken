/* Javascript은 이 파일에서만 작성해주세요. */

(function() {
  var userTypes = {
    0: '일반인',
    1: '컴공학생',
    2: '웹개발자',
    3: '웹디자이너',
    4: '사장님'
  };
  var userCollection = {};
  var userId = 0;
  var targetUser = null;

  var newUserSelectionEl = document.querySelector('.new-user-selection');
  var existingUserListEl = document.querySelector('.existing-user-list');
  var newUserFormEl = document.querySelector('.user-form.create');
  var updateUserFormEl = document.querySelector('.user-form.update');

  newUserSelectionEl.addEventListener('click', function createNewUser (e) {
    if (!e.target.classList.contains('selection')) {
      return;
    }

    Array.prototype.forEach.call(e.target.parentElement.querySelectorAll('li'), function reset (el) {
      el.classList.remove('selected');
    });

    e.target.classList.add('selected');

    if (newUserFormEl.style.display !== 'block') {
      newUserFormEl.style.display = 'block';
    } else {
      newUserFormEl.querySelector('.success-message').style.display = 'none';
      newUserFormEl.querySelector('button.submit').style.display = 'inline-block';
      newUserFormEl.querySelector('button.cancel').style.display = 'inline-block';
      newUserFormEl.querySelector('button.close').style.display = 'none';
      Array.prototype.forEach.call(newUserFormEl.querySelectorAll('input'), function reset (el) {
        el.value = '';
      });
    }

    newUserFormEl.querySelector('select').value = e.target.dataset.type;
  });

  existingUserListEl.addEventListener('click', function modifyUser (e) {
    if (!e.target.classList.contains('list-item')) {
      return;
    }

    Array.prototype.forEach.call(e.target.parentElement.querySelectorAll('li'), function reset (el) {
      el.classList.remove('selected');
    });

    e.target.classList.add('selected');

    if (updateUserFormEl.style.display !== 'block') {
      updateUserFormEl.style.display = 'block';
    } else {
      updateUserFormEl.querySelector('.success-message').style.display = 'none';
      updateUserFormEl.querySelector('button.submit').style.display = 'inline-block';
      updateUserFormEl.querySelector('button.cancel').style.display = 'inline-block';
      updateUserFormEl.querySelector('button.close').style.display = 'none';
    }

    var inputs = updateUserFormEl.querySelectorAll('input');
    targetUser = userCollection[e.target.dataset.id];

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = targetUser[inputs[i].id];
    }

    updateUserFormEl.querySelector('select').value = targetUser.type;
  });

  newUserFormEl.addEventListener('click', function onButtonClick (e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    if (e.target.classList.contains('close') || e.target.classList.contains('cancel')) {
      e.currentTarget.style.display = 'none';
      e.currentTarget.querySelector('.success-message').style.display = 'none';
      e.currentTarget.querySelector('button.submit').style.display = 'inline-block';
      e.currentTarget.querySelector('button.cancel').style.display = 'inline-block';
      e.currentTarget.querySelector('button.close').style.display = 'none';
      Array.prototype.forEach.call(e.currentTarget.querySelectorAll('input'), function reset (el) {
        el.value = '';
      });
      Array.prototype.forEach.call(newUserSelectionEl.querySelectorAll('li'), function reset (el) {
        el.classList.remove('selected');
      });
      return;
    }

    var user = {};
    var inputElements = e.currentTarget.querySelectorAll('input');

    for (var i = 0; i < inputElements.length; i++) {
      user[inputElements[i].id] = inputElements[i].value;
    }

    user.type = Number(e.currentTarget.querySelector('select').value);

    user.id = userId;
    userCollection[userId] = user;
    userId++;

    var listEl = document.createElement('li');
    listEl.classList.add('list-item');
    listEl.textContent = user.username;
    listEl.dataset.id = user.id;

    existingUserListEl.appendChild(listEl);

    var successMsgEl = e.currentTarget.querySelector('.success-message');
    successMsgEl.style.display = 'block';

    var submitButtonEl = e.currentTarget.querySelector('button.submit');
    submitButtonEl.style.display = 'none';

    var cancelButtonEl = e.currentTarget.querySelector('button.cancel');
    cancelButtonEl.style.display = 'none';

    var closeButtonEl = e.currentTarget.querySelector('button.close');
    closeButtonEl.style.display = 'inline-block';
  });

  updateUserFormEl.addEventListener('click', function onButtonClick (e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    if (e.target.classList.contains('close') || e.target.classList.contains('cancel')) {
      e.currentTarget.style.display = 'none';
      e.currentTarget.querySelector('.success-message').style.display = 'none';
      e.currentTarget.querySelector('button.submit').style.display = 'inline-block';
      e.currentTarget.querySelector('button.cancel').style.display = 'inline-block';
      e.currentTarget.querySelector('button.close').style.display = 'none';
      Array.prototype.forEach.call(e.currentTarget.querySelectorAll('input'), function reset (el) {
        el.value = '';
      });
      Array.prototype.forEach.call(existingUserListEl.querySelectorAll('li'), function reset (el) {
        el.classList.remove('selected');
      });
      return;
    }

    var inputElements = e.currentTarget.querySelectorAll('input');

    for (var i = 0; i < inputElements.length; i++) {
      targetUser[inputElements[i].id] = inputElements[i].value;
    }

    targetUser.type = Number(e.currentTarget.querySelector('select').value);

    var userItemEl = existingUserListEl.querySelector('[data-id="' + targetUser.id + '"]');
    userItemEl.textContent = targetUser.username;

    var successMsgEl = e.currentTarget.querySelector('.success-message');
    successMsgEl.style.display = 'block';

    var submitButtonEl = e.currentTarget.querySelector('button.submit');
    submitButtonEl.style.display = 'none';

    var cancelButtonEl = e.currentTarget.querySelector('button.cancel');
    cancelButtonEl.style.display = 'none';

    var closeButtonEl = e.currentTarget.querySelector('button.close');
    closeButtonEl.style.display = 'inline-block';
  });
})();
