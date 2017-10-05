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
