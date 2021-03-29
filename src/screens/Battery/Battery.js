import React, { Component } from "react";
import * as Battery from "expo-battery";
import { Dimensions, Text, View } from "react-native";
import { styles } from "../../styles/style";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export class BatteryScreen extends Component {
  state = {
    batteryLevel: null,
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async _subscribe() {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    this.setState({ batteryLevel });
    this._subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      this.setState({ batteryLevel });
      alert("batteryLevel changed!", batteryLevel);
    });
  }

  _unsubscribe() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }
  getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  render() {
    const arc = parseInt((this.state.batteryLevel * 100).toFixed(0));
    return (
      <View style={styles.safeAreaView}>
        <View style={styles.chartWrapper}>
          <AnimatedCircularProgress
            size={Dimensions.get("screen").width - 40}
            width={20}
            fill={arc}
            rotation={190}
            tintColor={this.getRandomColor()}
            backgroundColor="#ececec"
            lineCap="round"
            onAnimationComplete={() => console.log("onAnimationComplete")}
          >
            {(fill) => <Text style={{ fontSize: 32 }}>{arc}%</Text>}
          </AnimatedCircularProgress>
        </View>
      </View>
    );
  }
}

export default BatteryScreen;
