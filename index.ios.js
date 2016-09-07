import React, { Component } from 'react'; // why do i bracket this word "Component"
import { AppRegistry, View, Text } from 'react-native'; // are these modules. if so, why did i import React and not like, { React } ?!? WHAT IS THIS

class WTFIsHappening extends Component {
  render() {
    return (
      <View>
        <AnotherComponent />
        <AnotherComponent />
      </View>
    );
  }
}

class AnotherComponent extends Component {
  render() {
    return (
      <Text>I am another component.</Text>
    )
  }
}

AppRegistry.registerComponent('WTFIsHappening', () => WTFIsHappening);
