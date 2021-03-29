import React, { useState, useEffect, useRef } from "react";
import { Platform, Text, View, StyleSheet, ToastAndroid } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import MapView, { PROVIDER_GOOGLE, AnimatedRegion } from "react-native-maps";
import * as Location from "expo-location";
import { styles } from "../../styles/style";
const API_KEY = "756ba894b1db136208b11ad0e942a347";

export class LocationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },
    };
    this._mapView = React.createRef();
    this._currentRegion = new MapView.AnimatedRegion(this.state.region);
  }
  componentDidMount() {
    this.getLocation();
  }
  getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const { coords } = location;
    fetch(
      `http://api.positionstack.com/v1/reverse?access_key=${API_KEY}&query=${coords.latitude},${coords.longitude}`
    )
      .then((response) => response.json())
      .then((resp) => {
        const place = resp["data"][0];
        ToastAndroid.show(`You are at ${place["label"]}`, ToastAndroid.LONG);
      });
    this._currentRegion
      .timing({
        ...{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        },
        useNativeDriver: false,
        duration: 1500,
      })
      .start();
    this.setState({
      region: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },
    });
  };
  _zoomIn = () => {
    this._currentRegion
      .timing({
        ...{
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0015,
        },
        duration: 1000,
        useNativeDriver: false,
      })
      .start();
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? (
          <MapView.Animated
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            ref={this._mapView}
            region={this._currentRegion}
            // showsUserLocation
            showsBuildings
            showsPointsOfInterest
            showsMyLocationButton
            // initialRegion={this.state.region}
            onPress={this.selectLocation}
          >
            <MapView.Marker.Animated
              ref={(marker) => {
                this.marker = marker;
              }}
              coordinate={this.state.region}
              title={"Your Location"}
              description={"You are Here"}
              image={require("../../assets/icons/map-marker.png")}
            />
          </MapView.Animated>
        ) : null}
        <FloatingAction
          color={"#000"}
          floatingIcon={
            <MaterialIcons name={"my-location"} size={22} color={"#fff"} />
          }
          onPressMain={(state) => {
            this._zoomIn();
          }}
          overlayColor={"transparent"}
          style={styles.floatingIcon}
          distanceToEdge={{ horizontal: 30, vertical: 70 }}
        />
      </View>
    );
  }
}
export default LocationScreen;
