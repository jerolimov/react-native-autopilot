/*eslint no-unused-vars: 0*/

import React, { Component, InteractionManager, Navigator, Text } from 'react-native';

import applyNavigatorChanges from './applyNavigatorChanges';
import NavigatorWrapper from './NavigatorWrapper';

export default class NavigatorAutopilot extends Component {
	static NavigationBar = Navigator.NavigationBar;

	constructor(props) {
		super(props);

		if (!props.routeMapping) {
			throw new Error('NavigatorAutopilot: routeMapping prop is required!');
		}

		// initialRouteStack
		this.originRouteStack = props.routes && props.routes.length ? props.routes : [ null ];
//		this.mappedRouteStack = this.originRouteStack.map(props.routeMapping);
	}

	componentDidMount() {
		const navigator = this.refs.navigator;
		const context = navigator.navigationContext;

		this.didFocusListener = context.addListener('didfocus', (event) => {
			const mappedRoute = event.data.route;
			InteractionManager.runAfterInteractions(() => {
				this.onFocus(mappedRoute);
			});
		});
	}

	componentWillUnmount() {
		if (this.didFocusListener) {
			this.didFocusListener.remove();
			this.didFocusListener = null;
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.routeMapping) {
			throw new Error('NavigatorAutopilot: routeMapping prop is required!');
		}

		var compareRoute = nextProps.compareRoute || function(routeA, routeB) {
			return routeA === routeB;
		};

		var prevRouteStack = this.originRouteStack;
		this.originRouteStack = nextProps.routes && nextProps.routes.length ? nextProps.routes : [ null ];
//		this.mappedRouteStack = this.originRouteStack.map((route, index) => {
//			if (compareRoute(prevRouteStack[index], route) && this.mappedRouteStack[index]) {
//				return this.mappedRouteStack[index];
//			}
//			return nextProps.routeMapping(route);
//		});

		if (this.refs.navigator) {
			var navigator = new NavigatorWrapper(this.refs.navigator);
			applyNavigatorChanges(navigator.getCurrentRoutes(), this.originRouteStack, navigator);
		}
	}

	render() {
		return <Navigator
				ref='navigator'
				initialRouteStack={ this.originRouteStack }
				renderScene={ this.renderScene.bind(this) }
				configureScene={ this.configureScene.bind(this) }
				navigationBar={ this.props.navigationBar }
				sceneStyle={ this.props.sceneStyle }
				style={ this.props.style } />;
	}

	renderScene(route) {
		return this.props.routeMapping(route);
	}

	configureScene(route) {
		const defaultSceneConfig = Navigator.SceneConfigs.PushFromRight;
		if (route && typeof route.sceneConfig === 'string') {
			return Navigator.SceneConfigs[route.sceneConfig] || defaultSceneConfig;
		} else if (route && typeof route.sceneConfig === 'object') {
			return route.sceneConfig;
		} else {
			return defaultSceneConfig;
		}
	}

	onFocus(mappedRoute) {
		const index = this.originRouteStack.indexOf(mappedRoute);
		if (index !== -1 && index + 1 !== this.originRouteStack.length) {
			const newRouteStack = this.originRouteStack.slice(0, index + 1);
			if (this.props.persistRoutes) {
				this.props.persistRoutes(newRouteStack);
			}
		}
	}
}
