# react-native-autopilot

> Automatically push and pop navigator routes/scenes/screens if the navigator props was changed.

[![Build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url] [![Dependency Status][dependency-image]][dependency-url]

This project simplifies the usage of the Navigator concept in
[react-native](https://facebook.github.io/react-native/),
especially if you use a "flux-like" state driven props-architecture,
for example if you use [redux](https://github.com/rackt/redux) /
[react-redux](https://github.com/rackt/react-redux).

It reverses the abstraction of the original Navigator and NavigatorIOS as well
as the commonly used [ExNavigator](https://github.com/exponentjs/ex-navigator/).

Works fine together if you want serialize and persist your navigation state,
for example with [redux-persist](https://github.com/rt2zz/redux-persist).

## Getting started

```bash
npm install --save react-native-autopilot
```

## Examples

For getting an idea on how to use this library, please check out the [demo project](https://github.com/bringnow/react-native-autopilot-example).

## Alternatives

* Pure [Navigator](https://facebook.github.io/react-native/docs/navigator.html),
  ([Navigator.js](https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/Navigator/Navigator.js))
* Pure [NavigatorIOS](https://facebook.github.io/react-native/docs/navigatorios.html),
  ([NavigatorIOS.ios.js](https://github.com/facebook/react-native/blob/master/Libraries/Components/Navigation/NavigatorIOS.ios.js))
* Pure [ExNavigator](https://github.com/exponentjs/ex-navigator/),
  ([ExNavigator.js](https://github.com/exponentjs/ex-navigator/blob/master/ExNavigator.js),
  [ExRoute.js](https://github.com/exponentjs/ex-navigator/blob/master/ExRoute.js))
* [react-native-router-redux](https://github.com/Qwikly/react-native-router-redux)
* [react-native-router-flux](https://github.com/aksonov/react-native-router-flux)

## Credits

Ideas, discussions and contributions are welcome: Just
[open a new issue](https://github.com/bringnow/react-native-autopilot/issues/new)

## License

This project is released under the MIT License.
See the LICENSE file for further details.

[travis-image]: https://img.shields.io/travis/bringnow/react-native-autopilot/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/bringnow/react-native-autopilot
[coveralls-image]: https://img.shields.io/coveralls/bringnow/react-native-autopilot/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/bringnow/react-native-autopilot
[dependency-image]: http://img.shields.io/david/bringnow/react-native-autopilot.svg?style=flat-square
[dependency-url]: https://david-dm.org/bringnow/react-native-autopilot
