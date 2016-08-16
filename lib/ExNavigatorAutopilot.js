import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';
import applyNavigatorChanges from './applyNavigatorChanges';
import NavigatorWrapper from './NavigatorWrapper';

export default class ExNavigatorAutopilot extends Component {
  static Styles = ExNavigator.Styles;

  constructor(props) {
    super(props);

    // initialRouteStack
    this.originRouteStack = props.routes && props.routes.length ? props.routes : [null];
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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.routeMapping) {
      throw new Error('ExNavigatorAutopilot: routeMapping prop is required!');
    }

    const compareRoute = nextProps.compareRoute || ((routeA, routeB) => routeA === routeB);

    const prevRouteStack = this.originRouteStack;
    this.originRouteStack = nextProps.routes && nextProps.routes.length ? nextProps.routes : [null];
    this.mappedRouteStack = this.originRouteStack.map((route, index) => {
      if (compareRoute(prevRouteStack[index], route) && this.mappedRouteStack[index]) {
        return this.mappedRouteStack[index];
      }
      return nextProps.routeMapping(route);
    });

    if (this.refs.navigator) {
      const navigator = new NavigatorWrapper(this.refs.navigator);
      applyNavigatorChanges(navigator.getCurrentRoutes(), this.mappedRouteStack, navigator);
    }
  }

  componentWillUnmount() {
    if (this.didFocusListener) {
      this.didFocusListener.remove();
      this.didFocusListener = null;
    }
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

  render() {
    return (
      <ExNavigator
        ref="navigator"
        initialRouteStack={this.mappedRouteStack}
        showNavigationBar={this.props.showNavigationBar}
        navigationBarStyle={this.props.navigationBarStyle}
        titleStyle={this.props.titleStyle}
        barButtonTextStyle={this.props.barButtonTextStyle}
        barButtonIconStyle={this.props.barButtonIconStyle}
        renderNavigationBar={this.props.renderNavigationBar}
        renderBackButton={this.props.renderBackButton}
        sceneStyle={this.props.sceneStyle}
        style={this.props.style}
      />
    );
  }
}

ExNavigatorAutopilot.propTypes = {
  showNavigationBar: React.PropTypes.func,
  style: React.PropTypes.object,
  navigationBarStyle: React.PropTypes.object,
  titleStyle: React.PropTypes.object,
  barButtonTextStyle: React.PropTypes.object,
  barButtonIconStyle: React.PropTypes.object,
  sceneStyle: React.PropTypes.object,
  renderNavigationBar: React.PropTypes.func,
  renderBackButton: React.PropTypes.func,
  persistRoutes: React.PropTypes.func,
  routes: React.PropTypes.array,
  routeMapping: React.PropTypes.func.isRequired,
};
