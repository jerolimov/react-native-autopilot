/* global describe, it, beforeEach */

var assert = require('assert');

var applyNavigatorStackChanges = require('../lib/applyNavigatorStackChanges');

var NavigatorMock = require('./NavigatorMock');

describe('applyNavigatorStackChanges', function() {
	var routeA = 'routeA';
	var routeB = 'routeB';
	var routeC = 'routeC';
	var navigatorMock;

	beforeEach(function() {
		navigatorMock = new NavigatorMock();
	});

	it('should be a function', function() {
		assert.equal('function', typeof applyNavigatorStackChanges);
	});

	it('should throw an error if prevStack is null or empty', function() {
		assert.throws(function() {
			applyNavigatorStackChanges();
		}, /Error: Prev stack must be an array with at least one entry!/);
		assert.throws(function() {
			applyNavigatorStackChanges([]);
		}, /Error: Prev stack must be an array with at least one entry!/);
	});

	it('should throw an error if nextStack is null or empty', function() {
		assert.throws(function() {
			applyNavigatorStackChanges([ routeA ]);
		}, /Error: Next stack must be an array with at least one entry!/);
		assert.throws(function() {
			applyNavigatorStackChanges([ routeA ], []);
		}, /Error: Next stack must be an array with at least one entry!/);
	});

	it('should throw an error if navigator is null', function() {
		assert.throws(function() {
			applyNavigatorStackChanges([ routeA ], [ routeB ], null);
		}, /Error: Navigator is not defined in applyNavigatorStackChanges!/);
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

	it('should pop a route if one was removed', function() {
		var prevRoutes = [routeA, routeB];
		var nextRoutes = [routeA];
		var expectedCallHistory = [ 'pop' ];
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
});
