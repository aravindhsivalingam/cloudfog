import React, { Component } from "react";
import { Button, Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import * as _ from "lodash";
import MersenneTwister from "mersennetwister";
import { styles } from "../../styles/style";
const MT = new MersenneTwister();

export class MersennerTwister extends Component {
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
      randomNumbers.push(MT.int());
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
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
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

export default MersennerTwister;
