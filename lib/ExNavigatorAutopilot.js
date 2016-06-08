/* eslint no-unused-vars: 0*/
import React from 'react';
import { InteractionManager } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';
import applyNavigatorChanges from './applyNavigatorChanges';
import NavigatorWrapper from './NavigatorWrapper';

export default class ExNavigatorAutopilot extends React.Component {
  static Styles = ExNavigator.Styles;

  constructor(props) {
    super(props);

    if (!props.routeMapping) {
      throw new Error('ExNavigatorAutopilot: routeMapping prop is required!');
    }

    // initialRouteStack
    this.originRouteStack = props.routes && props.routes.length ? props.routes : [ null ];
    this.mappedRouteStack = this.originRouteStack.map(props.routeMapping);
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
      throw new Error('ExNavigatorAutopilot: routeMapping prop is required!');
    }

    var compareRoute = nextProps.compareRoute || function(routeA, routeB) {
      return routeA === routeB;
    };

    var prevRouteStack = this.originRouteStack;
    this.originRouteStack = nextProps.routes && nextProps.routes.length ? nextProps.routes : [ null ];
    this.mappedRouteStack = this.originRouteStack.map((route, index) => {
      if (compareRoute(prevRouteStack[index], route) && this.mappedRouteStack[index]) {
        return this.mappedRouteStack[index];
      }
      return nextProps.routeMapping(route);
    });

    if (this.refs.navigator) {
      var navigator = new NavigatorWrapper(this.refs.navigator);
      applyNavigatorChanges(navigator.getCurrentRoutes(), this.mappedRouteStack, navigator);
    }
  }

  render() {
    return <ExNavigator
        ref='navigator'
        initialRouteStack={ this.mappedRouteStack }

        showNavigationBar={ this.props.showNavigationBar }
        navigationBarStyle={ this.props.navigationBarStyle }
        titleStyle={ this.props.titleStyle }
        barButtonTextStyle={ this.props.barButtonTextStyle }
        barButtonIconStyle={ this.props.barButtonIconStyle }
        renderNavigationBar={ this.props.renderNavigationBar }
        renderBackButton={ this.props.renderBackButton }
        sceneStyle={ this.props.sceneStyle }
        style={ this.props.style } />;
  }

  onFocus(mappedRoute) {
    const index = this.mappedRouteStack.indexOf(mappedRoute);
    if (index !== -1 && index + 1 !== this.originRouteStack.length) {
      const newRouteStack = this.originRouteStack.slice(0, index + 1);
      if (this.props.persistRoutes) {
        this.props.persistRoutes(newRouteStack);
      }
    }
  }
}
