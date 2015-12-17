
module.exports = function NavigatorWrapper(navigator) {
	this.getCurrentRoutes = function() {
		if (navigator) {
			return navigator.getCurrentRoutes();
		} else {
			return [];
		}
	};

	this.jumpBack = function() {
		console.info('navigator jumpBack');
		if (navigator) {
			navigator.jumpBack();
		}
	};

	this.jumpForward = function() {
		console.info('navigator jumpForward');
		if (navigator) {
			navigator.jumpForward();
		}
	};

	this.jumpTo = function(route) {
		console.info('navigator jumpTo', route);
		if (navigator) {
			navigator.jumpTo(route);
		}
	};

	this.push = function(route) {
		console.info('navigator push', route);
		if (navigator) {
			navigator.push(route);
		}
	};

	this.pop = function() {
		console.info('navigator pop');
		if (navigator) {
			navigator.pop();
		}
	};

	this.replace = function(route) {
		console.info('navigator replace', route);
		if (navigator) {
			navigator.replace(route);
		}
	};

	this.replaceAtIndex = function(route, index) {
		console.info('navigator replaceAtIndex', route, index);
		if (navigator) {
			navigator.replaceAtIndex(route, index);
		}
	};

	this.replacePrevious = function(route) {
		console.info('navigator replacePrevious', route);
		if (navigator) {
			navigator.replacePrevious(route);
		}
	};

	this.immediatelyResetRouteStack = function(routeStack) {
		console.info('navigator immediatelyResetRouteStack', routeStack);
		if (navigator) {
			navigator.immediatelyResetRouteStack(routeStack);
		}
	};

	this.popToRoute = function(route) {
		console.info('navigator popToRoute', route);
		if (navigator) {
			navigator.popToRoute(route);
		}
	};

	this.popToTop = function() {
		console.info('navigator popToTop');
		if (navigator) {
			navigator.popToTop();
		}
	};
};
