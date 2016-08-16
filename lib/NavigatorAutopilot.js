import React, { Component } from 'react';
import { InteractionManager, Navigator } from 'react-native';
import applyNavigatorChanges from './applyNavigatorChanges';
import NavigatorWrapper from './NavigatorWrapper';

export default class NavigatorAutopilot extends Component {
  static NavigationBar = Navigator.NavigationBar;

  constructor(props) {
    super(props);

    // initialRouteStack
    this.originRouteStack = props.routes && props.routes.length ? props.routes : [null];
//    this.mappedRouteStack = this.originRouteStack.map(props.routeMapping);

    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.routeMapping) {
      throw new Error('NavigatorAutopilot: routeMapping prop is required!');
    }

    // const compareRoute = nextProps.compareRoute || function(routeA, routeB) {
    //   return routeA === routeB;
    // };

    // const prevRouteStack = this.originRouteStack;
    this.originRouteStack = nextProps.routes &&
      nextProps.routes.length ?
      nextProps.routes : [null];
//    this.mappedRouteStack = this.originRouteStack.map((route, index) => {
//      if (compareRoute(prevRouteStack[index], route) && this.mappedRouteStack[index]) {
//        return this.mappedRouteStack[index];
//      }
//      return nextProps.routeMapping(route);
//    });

    if (this.refs.navigator) {
      const navigator = new NavigatorWrapper(this.refs.navigator);
      applyNavigatorChanges(navigator.getCurrentRoutes(), this.originRouteStack, navigator);
    }
  }

  componentWillUnmount() {
    if (this.didFocusListener) {
      this.didFocusListener.remove();
      this.didFocusListener = null;
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

  configureScene(route) {
    const defaultSceneConfig = Navigator.SceneConfigs.PushFromRight;
    if (route && typeof route.sceneConfig === 'string') {
      return Navigator.SceneConfigs[route.sceneConfig] || defaultSceneConfig;
    } else if (route && typeof route.sceneConfig === 'object') {
      return route.sceneConfig;
    }

    return defaultSceneConfig;
  }

  renderScene(route) {
    return this.props.routeMapping(route);
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRouteStack={this.originRouteStack}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        navigationBar={this.props.navigationBar}
        sceneStyle={this.props.sceneStyle}
        style={this.props.style}
      />
    );
  }
}

NavigatorAutopilot.propTypes = {
  style: React.PropTypes.object,
  navigationBar: React.PropTypes.object,
  sceneStyle: React.PropTypes.object,
  persistRoutes: React.PropTypes.func,
  routes: React.PropTypes.array,
  routeMapping: React.PropTypes.func.isRequired,
};
