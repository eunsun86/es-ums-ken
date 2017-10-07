(function() {
  var USER_TYPES = {
    0: '일반인',
    1: '컴공학생',
    2: '웹개발자',
    3: '웹디자이너',
    4: '사장님'
  };

  var appController = {
    onNewUserSelection: function (data) {
      if (this.createUserFormView.isHidden()) {
        this.createUserFormView.show();
      } else {
        this.createUserFormView.reset();
      }

      var userType = data.type;

      this.newUserListView.updateSelection('type', userType);
      this.createUserFormView.updateUserTypeSelection(userType);
    },
    onCurrentUserSelection: function (data) {
      this.currentUserListView.updateSelection('id', data.id);

      if (this.updateUserFormView.isHidden()) {
        this.updateUserFormView.show();
      } else {
        this.updateUserFormView.reset();
      }

      this.userCollectionModel.selectedUser = this.userCollectionModel.getUser(data.id);
      this.updateUserFormView.fill(this.userCollectionModel.selectedUser);
    },
    cancelNewUserCreation: function () {
      this.createUserFormView.hide();
      this.createUserFormView.reset();
      this.newUserListView.clearSelection();
    },
    cancelCurrentUserUpdate: function () {
      this.updateUserFormView.hide();
      this.updateUserFormView.reset();
      this.currentUserListView.clearSelection();
    },
    createUser: function () {
      var userData;
      var inspectionResult = this.createUserFormView.inspect();

      if (inspectionResult.error) {
        this.createUserFormView.triggerError();
        return;
      }

      userData = userCollectionModel.createUser(Object.assign({}, {
        type: this.createUserFormView.getUserTypeFieldValue()
      }, inspectionResult.fieldValues));

      this.currentUserListView.addNewUser(userData.id, userData.username);
      this.createUserFormView.showSuccessMode();
    },
    updateUser: function () {
      var inspectionResult = this.updateUserFormView.inspect();

      if (inspectionResult.error) {
        this.updateUserFormView.triggerError();
        return;
      }

      var newUserData = Object.assign({}, inspectionResult.fieldValues, {
        type: this.updateUserFormView.getUserTypeFieldValue()
      });

      this.userCollectionModel.updateUser(this.userCollectionModel.selectedUser.id, newUserData);
      this.currentUserListView.updateUsername(this.userCollectionModel.selectedUser.id, this.userCollectionModel.selectedUser.username);
      this.updateUserFormView.showSuccessMode();
    },
    updateUserList: function (userType) {
      this.newUserListView.updateSelection({
        type: userType
      });
    },
    init: function () {
      this.userCollectionModel = userCollectionModel;

      this.newUserListView = new ListView('.new-user-selection');
      this.currentUserListView = new CurrentUserListView('.existing-user-list');
      this.createUserFormView = new UserFormView('.user-form.create');
      this.updateUserFormView = new UpdateUserFormView('.user-form.update');

      this.newUserListView.onListItemClick(this.onNewUserSelection);
      this.currentUserListView.onListItemClick(this.onCurrentUserSelection);
      this.createUserFormView.onCancel(this.cancelNewUserCreation);
      this.createUserFormView.onClose(this.cancelNewUserCreation);
      this.createUserFormView.onSave(this.createUser);
      this.createUserFormView.onUserTypeChange(this.updateUserList);
      this.updateUserFormView.onCancel(this.cancelCurrentUserUpdate);
      this.updateUserFormView.onClose(this.cancelCurrentUserUpdate);
      this.updateUserFormView.onSave(this.updateUser);
    }
  };

  appController.init();
})();
