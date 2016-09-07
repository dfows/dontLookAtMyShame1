import React, { Component } from 'react'; // why do i bracket this word "Component"
import { AppRegistry, View, Text } from 'react-native'; // are these modules. if so, why did i import React and not like, { React } ?!? WHAT IS THIS

class WTFIsHappening extends Component {
  constructor(props) {
    super(props); // what this mean "super" oh duh obviously Component
    this.state = {
      item: {
        name: "item",
        amount: 0,
        price: "$0"
      }
    };
  }
  render() {
    return (
      <View>
        <Text>Item Name: {this.state.item.name}</Text>
        <Text>Number Remaining: {this.state.item.amount}</Text>
        <Text>Price: {this.state.item.price}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('WTFIsHappening', () => WTFIsHappening);
