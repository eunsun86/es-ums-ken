function Promise (callback) {
  this.successCallbacks = [];
  this.errorCallbacks = [];
}

Promise.prototype.then = function (successCallback, errorCallback) {
  this.successCallbacks.push(successCallback);

  if (errorCallback && typeof errorCallback === 'function') {
    this.errorCallbacks.push(errorCallback);
  }

  return this;
};

function Defer () {
  var that = this;

  that.promise = new Promise();

  that.resolve = function (data) {
    that.promise.successCallbacks.forEach(function (cb) {
      cb(data);
    });
  };

  that.reject = function (error) {
    that.promise.errorCallbacks.forEach(function (cb) {
      cb(error);
    });
  };
}

function promisify (resolver) {
  var deferred = new Defer();

  resolver(deferred.resolve, deferred.reject);

  return deferred.promise;
}

window.promisify = promisify;
