import React, { Component } from "react";
import { Button, Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { lcgHelper } from "../../helpers/lcgHelper";
import { styles } from "../../styles/style";

export class LCG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNumbers: [],
      count: [],
    };
  }
  componentDidMount() {
    this.setState({ randomNumbers: [], count: [] }, () => {
      this.generateRandom();
    });
  }
  componentWillUnmount() {
    this.setState({ randomNumbers: [], count: [] });
  }
  generateRandom() {
    let { randomNumbers, count } = this.state;
    for (let i = 0; i < 100; i++) {
      randomNumbers.push(lcgHelper.nextIntRange(0, 520620));
      count.push(i + 1);
    }
    this.setState({ randomNumbers, count });
  }
  render() {
    const { randomNumbers, count } = this.state;
    return (
      <View>
        <ScrollView style={styles.safeAreaView} horizontal={true}>
          {randomNumbers.length > 0 && (
            <LineChart
              data={{
                labels: count,
                datasets: [
                  {
                    data: randomNumbers,
                  },
                ],
              }}
              width={2800}
              height={Dimensions.get("screen").height * 0.8}
              yAxisInterval={1}
              fromZero={true}
              chartConfig={{
                backgroundColor: "#4389A2",
                backgroundGradientFrom: "#4776E6",
                backgroundGradientTo: "#8E54E9",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 10,
              }}
            />
          )}
        </ScrollView>
        <Text>Scroll right to view All</Text>
        <Button
          onPress={(e) => {
            this.generateRandom();
          }}
          title="Reload"
        ></Button>
      </View>
    );
  }
}

export default LCG;
