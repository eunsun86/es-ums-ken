import Q from 'q';

(function() {
  var USER_TYPES = {
    0: '일반인',
    1: '컴공학생',
    2: '웹개발자',
    3: '웹디자이너',
    4: '사장님'
  };

  var USER_TYPE_CHANGE = 'USER_TYPE_CHANGE';
  var LOGIN = 'LOGIN';
  var LOGOUT = 'LOGOUT';

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
      this.newUserListView.updateSelection('type', userType);
    },
    onRouteChange: function (data) {
      this.router.set(data.route);
    },
    onCreateRoute: function () {
      this.createPageView.show();
      this.userListPageView.hide();
      this.navigationMenuView.show();
      this.navigationMenuView.select('create');
    },
    onListRoute: function () {
      this.userListPageView.show();
      this.createPageView.hide();
      this.navigationMenuView.show();
      this.navigationMenuView.select('list');
    },
    onLoginRoute: function () {
      this.userListPageView.hide();
      this.createPageView.hide();
      this.navigationMenuView.hide();
    },
    showCurrentUser: function (username, profileImgUrl) {
      // TODO: Separate out as a View component
      var userInfoEl = document.querySelector('.current-user-info');
      var profileImgEl = userInfoEl.querySelector('.current-user-image');
      var usernameEl = userInfoEl.querySelector('.current-username');

      profileImgEl.src = profileImgUrl;
      usernameEl.textContent = username;
      userInfoEl.style.display = 'block';
    },
    hideCurrentUser: function () {
      // TODO: Separate out as a View component
      document.querySelector('.current-user-info').style.display = 'none';
    },
    getUsername: function () {
      return promisify(function (resolve, reject) {
        FB.api('/me', function (res) {
          resolve(res.name);
        });
      });
    },
    getUserProfileImgUrl: function () {
      return promisify(function (resolve, reject) {
        FB.api('/me/picture?type=small', function (res) {
          resolve(res.data.url);
        });
      });
    },
    init: function () {
      var that = this;

      this.userCollectionModel = userCollectionModel;

      this.createPageView = new View('#create-user-view');
      this.userListPageView = new View('#user-list-view');
      this.newUserListView = new ListView('.new-user-selection');
      this.currentUserListView = new CurrentUserListView('.existing-user-list');
      this.createUserFormView = new UserFormView('.user-form.create');
      this.updateUserFormView = new UpdateUserFormView('.user-form.update');
      this.navigationMenuView = new NavigationMenuView('#navigation-menu ul');

      this.newUserListView.onListItemClick(this.onNewUserSelection.bind(this));
      this.currentUserListView.onListItemClick(this.onCurrentUserSelection.bind(this));
      this.createUserFormView.onCancel(this.cancelNewUserCreation.bind(this));
      this.createUserFormView.onClose(this.cancelNewUserCreation.bind(this));
      this.createUserFormView.onSave(this.createUser.bind(this));
      this.createUserFormView.onUserTypeChange(function (userType) {
        messenger.publish(USER_TYPE_CHANGE, userType);
      });
      this.updateUserFormView.onCancel(this.cancelCurrentUserUpdate.bind(this));
      this.updateUserFormView.onClose(this.cancelCurrentUserUpdate.bind(this));
      this.updateUserFormView.onSave(this.updateUser.bind(this));
      this.navigationMenuView.onListItemClick(this.onRouteChange.bind(this));

      this.router = appRouter;
      this.router.on('login', this.onLoginRoute.bind(this));
      this.router.on('create', this.onCreateRoute.bind(this));
      this.router.on('list', this.onListRoute.bind(this));

      if (window.location.hash === '#/list' && window.IS_LOGGEDIN) {
        this.router.set('list');
      } else if (window.location.hash === '#/create' && window.IS_LOGGEDIN) {
        this.router.set('create');
      } else {
        this.router.set('login');
      }

      messenger.subscribe(LOGIN, function () {
        window.IS_LOGGEDIN = true;
        that.router.set('create');

        Q.all([
          that.getUsername(),
          that.getUserProfileImgUrl()
        ]).then(function (data) {
          that.showCurrentUser(data[0], data[1]);
        });
      });

      messenger.subscribe(LOGOUT, function () {
        window.IS_LOGGEDIN = null;
        that.hideCurrentUser();
        that.router.set('login');
      });

      messenger.subscribe(USER_TYPE_CHANGE, this.updateUserList.bind(this));
    }
  };

  appController.init();
})();
