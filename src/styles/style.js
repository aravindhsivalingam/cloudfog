import { Dimensions, StatusBar, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: StatusBar.currentHeight,
  },
  // map: {
  //   width: Dimensions.get("window").width,
  //   height: Dimensions.get("window").height,
  // },
  floatingIcon: {
    top: -60,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  map: {
    width: "100%",
    height: "110%",
  },
  chartWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
});
