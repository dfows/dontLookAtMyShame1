import React, { Component } from 'react'; // why do i bracket this word "Component"
import { AppRegistry, View, Text, Image, MapView } from 'react-native'; // are these modules. if so, why did i import React and not like, { React } ?!? WHAT IS THIS
import * as firebase from 'firebase'; // yeah like how come i don't just import * from 'react'

class WTFIsHappening extends Component {
  constructor(props) {
    super(props); // what this mean "super" oh duh obviously Component
    const firebaseApp = firebase.initializeApp({ databaseURL: "https://mobile-bakery-10282.firebaseio.com" });
    this.ordersRef = firebaseApp.database().ref("orders");

    this.state = {
      item: {
        imgUrl: "https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/14240729_630740280433346_989017859_n.jpg?ig_cache_key=MTMzMzAyMTU3NDI1NjY2MzQwOQ%3D%3D.2",
        name: "item",
        amount: 0,
        price: "$0"
      },
      jessicaCoors: {
        lat: 37.782736,
        lng: -122.485970
      },
      mapCoors: {
        lat: 37.7749,
        lng: -122.4194
      }
    };
  }

  componentDidMount() {
    // this confusing af
    this.ordersRef.limitToFirst(1).once('child_added', (snap) => {
      var order = snap.val();
      this.setState({
        item: {
          imgUrl: order.itemImg || "none",
          name: order.itemName,
          amount: order.itemAmt,
          price: order.itemPrice
        }
      });
    });
  }

  render() {
    return (
      <View>
        <JessicaLocation
          coors={this.state.mapCoors}
          jessica={this.state.jessicaCoors}
        />
        <ItemView
          item={this.state.item}
        />
      </View>
    )
  }
}

class ItemView extends Component {
  render() {
    return (
      <View style={{margin: 40, marginTop: 0}}>
        <Image source={{uri: this.props.item.imgUrl}} style={{height: 100}}/>
        <Text>Item Name: {this.props.item.name}</Text>
        <Text>Number Remaining: {this.props.item.amount}</Text>
        <Text>Price: {this.props.item.price}</Text>
      </View>
    );
  }
}

class JessicaLocation extends Component {
  // the plan for this: center on SF, show my location from state
  render() {
    return (
      <MapView
        style={{height:200, margin: 40}}
        annotations={[
          {
            latitude: this.props.jessica.lat,
            longitude: this.props.jessica.lng,
            title: "Jessica",
            subtitle: "Current Location"
          }
        ]}
        region={{
          latitude: this.props.coors.lat,
          longitude: this.props.coors.lng,
          latitudeDelta: .125,
          longitudeDelta: .125
        }}
      />
    )
  }
}

AppRegistry.registerComponent('WTFIsHappening', () => WTFIsHappening);
