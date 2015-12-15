# react-native-autopilot [![Build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url] [![Dependency Status][dependency-image]][dependency-url]

> TODO

### Features

* Deklerative routen mit automatischen updates
* Loading View  

### Installation

```bash
npm install --save react-native-autopilot
```

### Doc

TODO

### Navigator API

From (Navigator.js)[https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/Navigator/Navigator.js]

- `jumpBack()` - Jump backward without unmounting the current scene
- `jumpForward()` - Jump forward to the next scene in the route stack
- `jumpTo(route)` - Transition to an existing scene without unmounting
- `push(route)` - Navigate forward to a new scene, squashing any scenes
  that you could `jumpForward` to
- `pop()` - Transition back and unmount the current scene
- `replace(route)` - Replace the current scene with a new route
- `replaceAtIndex(route, index)` - Replace a scene as specified by an index
- `replacePrevious(route)` - Replace the previous scene
- `immediatelyResetRouteStack(routeStack)` - Reset every scene with an
  array of routes
- `popToRoute(route)` - Pop to a particular scene, as specified by its
  route. All scenes after it will be unmounted
- `popToTop()` - Pop to the first scene in the stack, unmounting every
  other scene

### Credits

TODO

### Alternatives

TODO

[travis-image]: https://img.shields.io/travis/jerolimov/react-native-autopilot/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/jerolimov/react-native-autopilot
[coveralls-image]: https://img.shields.io/coveralls/jerolimov/react-native-autopilot/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jerolimov/react-native-autopilot
[dependency-image]: http://img.shields.io/david/jerolimov/react-native-autopilot.svg?style=flat-square
[dependency-url]: https://david-dm.org/jerolimov/react-native-autopilot
