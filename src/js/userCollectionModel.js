var userCollectionModel = {
  selectedUser: null,
  userCollection: [],
  userIDCount: 0,
  createUser: function (userData) {
    var user = {
      id: this.userIDCount
    };

    this.userCollection[user.id] = user;
    this.updateUser(user.id, userData);
    this.userIDCount++;

    return this.userCollection[user.id];
  },
  getUser: function (userID) {
    return this.userCollection[userID];
  },
  updateUser: function (userID, newUserData) {
    var targetUser = this.userCollection[userID];

    for (var prop in newUserData) {
      if (newUserData.hasOwnProperty(prop)) {
        targetUser[prop] = newUserData[prop];
      }
    }
  }
};

window.userCollectionModel = userCollectionModel;
