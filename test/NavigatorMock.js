
module.exports = function NavigatorMock() {

	this.callHistory = [];

	this.jumpBack = function() {
		this.callHistory.push('jumpBack');
	};

	this.jumpForward = function() {
		this.callHistory.push('jumpForward');
	};

	this.jumpTo = function(route) {
		this.callHistory.push('jumpTo ' + route);
	};

	this.push = function(route) {
		this.callHistory.push('push ' + route);
	};

	this.pop = function() {
		this.callHistory.push('pop');
	};

	this.replace = function(route) {
		this.callHistory.push('replace ' + route);
	};

	this.replaceAtIndex = function(route, index) {
		this.callHistory.push('replaceAtIndex ' + route + ' ' + index);
	};

	this.replacePrevious = function(route) {
		this.callHistory.push('replacePrevious ' + route);
	};

	this.immediatelyResetRouteStack = function(routeStack) {
		this.callHistory.push('immediatelyResetRouteStack ' + routeStack);
	};

	this.popToRoute = function(route) {
		this.callHistory.push('popToRoute ' + route);
	};

	this.popToTop = function() {
		this.callHistory.push('popToTop');
	};

	this.resetMock = function() {
		this.callHistory = [];
	};
};
