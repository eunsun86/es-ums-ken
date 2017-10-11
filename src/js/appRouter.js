var noop = function () {};

var appRouter = {
  routeMap: {
    login: {
      path: '/#/login',
      handler: noop
    },
    create: {
      path: '/#/create',
      handler: noop
    },
    list: {
      path: '/#/list',
      handler: noop
    }
  },
  on: function (routeName, cb) {
    this.routeMap[routeName].handler = cb;
  },
  set: function (routeName) {
    if (!this.validate(routeName)) {
      throw new Error('Invalid route.');
    }

    window.history.pushState({
      name: routeName
    }, routeName, this.routeMap[routeName].path);

    this.routeMap[routeName].handler();
  },
  validate: function (routeName) {
    return !!this.routeMap[routeName];
  }
};

window.appRouter = appRouter;
