/* global describe, it, beforeEach */

var assert = require('assert');

var applyNavigatorStackChanges = require('../lib/applyNavigatorStackChanges');

var NavigatorMock = require('./NavigatorMock');

describe('applyNavigatorStackChanges', function() {
	var routeA = 'routeA';
	var routeB = 'routeB';
	var routeC = 'routeC';
	var routeD = 'routeD';
	var navigatorMock;

	beforeEach(function() {
		navigatorMock = new NavigatorMock();
	});

	it('should be a function', function() {
		assert.equal('function', typeof applyNavigatorStackChanges);
	});

	it('should throw an error if prev route stack is null or empty', function() {
		assert.throws(function() {
			applyNavigatorStackChanges();
		}, /Error: Prev route stack must be an array with at least one entry!/);
		assert.throws(function() {
			applyNavigatorStackChanges([]);
		}, /Error: Prev route stack must be an array with at least one entry!/);
	});

	it('should throw an error if next route stack is null or empty', function() {
		assert.throws(function() {
			applyNavigatorStackChanges([ routeA ]);
		}, /Error: Next route stack must be an array with at least one entry!/);
		assert.throws(function() {
			applyNavigatorStackChanges([ routeA ], []);
		}, /Error: Next route stack must be an array with at least one entry!/);
	});

	it('should throw an error if navigator is null', function() {
		assert.throws(function() {
			applyNavigatorStackChanges([ routeA ], [ routeB ], null);
		}, /Error: Navigator is not defined in applyNavigatorStackChanges!/);
	});

	it('must not call any navigator method if route stack is equal (===)', function() {
		var prevRoutes = [routeA];
		var nextRoutes = prevRoutes;
		var expectedCallHistory = [];
		applyNavigatorStackChanges(prevRoutes, nextRoutes, navigatorMock);
		assert.deepEqual(navigatorMock.callHistory, expectedCallHistory);
	});

	it('must not call any navigator method if nothing changes', function() {
		var prevRoutes = [routeA];
		var nextRoutes = [routeA];
		var expectedCallHistory = [];
		applyNavigatorStackChanges(prevRoutes, nextRoutes, navigatorMock);
		assert.deepEqual(navigatorMock.callHistory, expectedCallHistory);
	});

	it('should push a route if one was added', function() {
		var prevRoutes = [routeA];
		var nextRoutes = [routeA, routeB];
		var expectedCallHistory = [ 'push routeB' ];
		applyNavigatorStackChanges(prevRoutes, nextRoutes, navigatorMock);
		assert.deepEqual(navigatorMock.callHistory, expectedCallHistory);
	});

	it('should replace and push a route if one was added', function() {
		var prevRoutes = [routeA, routeB];
		var nextRoutes = [routeA, routeC, routeD];
		var expectedCallHistory = [ 'replaceAtIndex routeC 1', 'push routeD' ];
		applyNavigatorStackChanges(prevRoutes, nextRoutes, navigatorMock);
		assert.deepEqual(navigatorMock.callHistory, expectedCallHistory);
	});

	it('should pop a route if one was removed', function() {
		var prevRoutes = [routeA, routeB];
		var nextRoutes = [routeA];
		var expectedCallHistory = [ 'pop' ];
		applyNavigatorStackChanges(prevRoutes, nextRoutes, navigatorMock);
		assert.deepEqual(navigatorMock.callHistory, expectedCallHistory);
	});

	it('should replace and pop a route if one was removed', function() {
		var prevRoutes = [routeA, routeB, routeC];
		var nextRoutes = [routeA, routeD];
		var expectedCallHistory = [ 'replaceAtIndex routeD 1', 'pop' ];
		applyNavigatorStackChanges(prevRoutes, nextRoutes, navigatorMock);
		assert.deepEqual(navigatorMock.callHistory, expectedCallHistory);
	});

	it('should replace a route if all other are keeped', function() {
		var prevRoutes = [routeA, routeB, routeC];
		var nextRoutes = [routeA, routeD, routeC];
		var expectedCallHistory = [ 'replaceAtIndex routeD 1' ];
		applyNavigatorStackChanges(prevRoutes, nextRoutes, navigatorMock);
		assert.deepEqual(navigatorMock.callHistory, expectedCallHistory);
	});

	it('should replace the route stack if the route changes', function() {
		var prevRoutes = [routeA];
		var nextRoutes = [routeB, routeC];
		var expectedCallHistory = [ 'immediatelyResetRouteStack routeB,routeC' ];
		applyNavigatorStackChanges(prevRoutes, nextRoutes, navigatorMock);
		assert.deepEqual(navigatorMock.callHistory, expectedCallHistory);

		navigatorMock.resetMock();

		prevRoutes = [routeA, routeB];
		nextRoutes = [routeC];
		expectedCallHistory = [ 'immediatelyResetRouteStack routeC' ];
		applyNavigatorStackChanges(prevRoutes, nextRoutes, navigatorMock);
		assert.deepEqual(navigatorMock.callHistory, expectedCallHistory);
	});

	it('should replace the route stack if optional compareRoute function returns false', function() {
		var prevRoutes = [routeA];
		var nextRoutes = [routeA];
		var compareRoute = function() {
			return false;
		};
		var expectedCallHistory = [ 'immediatelyResetRouteStack routeA' ];
		applyNavigatorStackChanges(prevRoutes, nextRoutes, navigatorMock, compareRoute);
		assert.deepEqual(navigatorMock.callHistory, expectedCallHistory);
	});
});
