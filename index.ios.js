import React, { Component } from 'react'; // why do i bracket this word "Component"
import { AppRegistry, View, Text } from 'react-native'; // are these modules. if so, why did i import React and not like, { React } ?!? WHAT IS THIS

class WTFIsHappening extends Component {
  render() {
    return (
      <View>
        <ItemName itemName="bread"/>
        <ItemAmt itemAmt="10"/>
        <ItemPrice itemPrice="$0.25"/>
      </View>
    );
  }
}

class InfoLabel extends Component {
  render() {
    return (
      <Text>{this.props.infoType}: {this.props.info}</Text>
    )
  }
}

class ItemName extends Component {
  render() {
    return (
      <InfoLabel infoType="Item Name"
                 info={this.props.itemName}
      />
    )
  }
}

class ItemAmt extends Component {
  render() {
    return (
      <InfoLabel infoType="Amount"
                 info={this.props.itemAmt}
      />
    )
  }
}

class ItemPrice extends Component {
  render() {
    return (
      <InfoLabel infoType="Price"
                 info={this.props.itemPrice}
      />
    )
  }
}

AppRegistry.registerComponent('WTFIsHappening', () => WTFIsHappening);
