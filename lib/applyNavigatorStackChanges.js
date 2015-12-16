
function defaultCompareRoute(routeA, routeB) {
	return routeA === routeB;
}

module.exports = function applyNavigatorStackChanges(prevRouteStack, nextRouteStack, navigator, compareRoute) {
	if (!prevRouteStack || !prevRouteStack.length) {
		throw new Error('Prev route stack must be an array with at least one entry!');
	} else if (!nextRouteStack || !nextRouteStack.length) {
		throw new Error('Next route stack must be an array with at least one entry!');
	} else if (!navigator) {
		throw new Error('Navigator is not defined in applyNavigatorStackChanges!');
	}
	if (!compareRoute) {
		compareRoute = defaultCompareRoute;
	}

	if (prevRouteStack === nextRouteStack) {
		return;
	}

	if (!compareRoute(prevRouteStack[0], nextRouteStack[0])) {
		navigator.immediatelyResetRouteStack(nextRouteStack);
		return;
	}

	if (prevRouteStack.length < nextRouteStack.length) {
		// Maybe we should add (push) some new routes!
		for (var i = 0; i < prevRouteStack.length; i++) {
			if (!compareRoute(prevRouteStack[i], nextRouteStack[i])) {
				navigator.replaceAtIndex(nextRouteStack[i], i);
			}
		}
		for (var j = prevRouteStack.length; j < nextRouteStack.length; j++) {
			navigator.push(nextRouteStack[j]);
		}
	} else if (prevRouteStack.length > nextRouteStack.length) {
		// Maybe we should remove (pop) some new routes!
		for (var k = 0; k < nextRouteStack.length; k++) {
			if (!compareRoute(prevRouteStack[k], nextRouteStack[k])) {
				navigator.replaceAtIndex(nextRouteStack[k], k);
			}
		}
		for (var l = nextRouteStack.length; l < prevRouteStack.length; l++) {
			navigator.pop();
		}
	} else {
		// Maybe we should replace some new routes!
		for (var m = 0; m < prevRouteStack.length; m++) {
			if (!compareRoute(prevRouteStack[m], nextRouteStack[m])) {
				navigator.replaceAtIndex(nextRouteStack[m], m);
			}
		}
	}
};
