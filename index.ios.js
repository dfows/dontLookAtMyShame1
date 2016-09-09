import React, { Component } from 'react'; // why do i bracket this word "Component"
import { Navigator, AppRegistry, View, TouchableHighlight, Text, Image, MapView } from 'react-native'; // are these modules. if so, why did i import React and not like, { React } ?!? WHAT IS THIS
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
        // center of SF
        lat: 37.7749,
        lng: -122.4194
      }
    };
  }

  componentDidMount() {
    // this confusing af
    this.ordersRef.limitToLast(1).once('child_added', (snap) => {
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

  renderScene(route, navigator) {
    switch(route.id) {
      case "InProgressScene":
        return (
          //in prog should actually center at your location
          <InProgressScene
            navigator={navigator}
            coors={this.state.mapCoors}
            jessica={this.state.jessicaCoors}
            goBack={
              () => {
                navigator.pop();
              }
            }
          />
        )
      case "DefaultScene":
        return (
          <DefaultScene
            navigator={navigator}
            coors={this.state.mapCoors}
            jessica={this.state.jessicaCoors}
            item={this.state.item}
            makeRequest={
              () => {
                const nextIndex = route.index + 1;
                navigator.push({
                  id: "InProgressScene",
                  index: nextIndex
                });
              }
            }
          />
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: "DefaultScene"}}
        renderScene={(route,nav) => { return this.renderScene(route,nav)}}
      />
    )
  }
}

class DefaultScene extends Component {
  render() {
    return (
      <View>
        <JessicaLocation
          coors={this.props.coors}
          jessica={this.props.jessica}
         />
        <ItemView
          item={this.props.item}
        />
        <TouchableHighlight onPress={this.props.makeRequest}>
          <Text>Get {this.props.item.name}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class InProgressScene extends Component {
  // ok i need a thing that has a state like "ur order is placed. u cannot take back this action"
  render() {
    return (
      <View style={{margin: 40}}>
        <JessicaLocation
          coors={this.props.coors}
          jessica={this.props.jessica}
         />
        <Text>Jessica is on her way.</Text>
        <Text>Please stay put. If you are not there or if you cancel, I will hunt you down and cut you. You will also be charged a $10 fee.</Text>
        <TouchableHighlight onPress={this.props.goBack}>
          <Text>hmm actually i want this to be like,,,,,,,,, not going back</Text>
        </TouchableHighlight>
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
