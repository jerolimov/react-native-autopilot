
function defaultCompareRoute(routeA, routeB) {
	return routeA === routeB;
}

module.exports = function applyNavigatorStackChanges(prevStack, nextStack, navigator, compareRoute) {
	if (!prevStack || !prevStack.length) {
		throw new Error('Prev stack must be an array with at least one entry!');
	} else if (!nextStack || !nextStack.length) {
		throw new Error('Next stack must be an array with at least one entry!');
	} else if (!navigator) {
		throw new Error('Navigator is not defined in applyNavigatorStackChanges!');
	}

	if (prevStack === nextStack) {
		return;
	}
	if (!compareRoute) {
		compareRoute = defaultCompareRoute;
	}

	if (!compareRoute(prevStack[0], nextStack[0])) {
		navigator.immediatelyResetRouteStack(nextStack);
		return;
	}

	if (prevStack.length < nextStack.length) {
		// Maybe we should add (push) some new routes!
		for (var i = 0; i < prevStack.length; i++) {
			if (!compareRoute(prevStack[i], nextStack[i])) {
				navigator.replaceAtIndex(nextStack[i], i);
			}
		}
		for (var j = prevStack.length; j < nextStack.length; j++) {
			navigator.push(nextStack[j]);
		}
	} else if (prevStack.length > nextStack.length) {
		// Maybe we should remove (pop) some new routes!
		for (var k = 0; k < nextStack.length; k++) {
			if (!compareRoute(prevStack[k], nextStack[k])) {
				navigator.replaceAtIndex(nextStack[k], k);
			}
		}
		for (var l = nextStack.length; l < prevStack.length; l++) {
			navigator.pop();
		}
	} else {
		// Maybe we should replace some new routes!
		for (var m = 0; m < prevStack.length; m++) {
			if (!compareRoute(prevStack[m], nextStack[m])) {
				navigator.replaceAtIndex(nextStack[m], m);
			}
		}
	}
};
