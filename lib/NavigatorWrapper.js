/* eslint no-console: 0 */
// TODO: Remove console logging or complete navigator wrapper..

module.exports = function NavigatorWrapper(navigator) {
  this.getCurrentRoutes = () => {
    if (navigator) {
      return navigator.getCurrentRoutes();
    }

    return [];
  };

  this.jumpBack = () => {
    console.info('navigator jumpBack');
    if (navigator) {
      navigator.jumpBack();
    }
  };

  this.jumpForward = () => {
    console.info('navigator jumpForward');
    if (navigator) {
      navigator.jumpForward();
    }
  };

  this.jumpTo = (route) => {
    console.info('navigator jumpTo', route);
    if (navigator) {
      navigator.jumpTo(route);
    }
  };

  this.push = (route) => {
    console.info('navigator push', route);
    if (navigator) {
      navigator.push(route);
    }
  };

  this.pop = () => {
    console.info('navigator pop');
    if (navigator) {
      navigator.pop();
    }
  };

  this.replace = (route) => {
    console.info('navigator replace', route);
    if (navigator) {
      navigator.replace(route);
    }
  };

  this.replaceAtIndex = (route, index) => {
    console.info('navigator replaceAtIndex', route, index);
    if (navigator) {
      navigator.replaceAtIndex(route, index);
    }
  };

  this.replacePrevious = (route) => {
    console.info('navigator replacePrevious', route);
    if (navigator) {
      navigator.replacePrevious(route);
    }
  };

  this.immediatelyResetRouteStack = (routeStack) => {
    console.info('navigator immediatelyResetRouteStack', routeStack);
    if (navigator) {
      navigator.immediatelyResetRouteStack(routeStack);
    }
  };

  this.popToRoute = (route) => {
    console.info('navigator popToRoute', route);
    if (navigator) {
      navigator.popToRoute(route);
    }
  };

  this.popToTop = () => {
    console.info('navigator popToTop');
    if (navigator) {
      navigator.popToTop();
    }
  };
};
