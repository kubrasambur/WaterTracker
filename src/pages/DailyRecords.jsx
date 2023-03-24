import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Button } from "native-base";
import CustomModal from "../components/custom/CustomModal";

export default function DailyRecords() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  function handleOnPress() {
    console.log(value);
    setIsOpen(false);
  }

  return (
    <View style={styles.container}>
      <Text> Line Chart</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
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
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Button onPress={() => setIsOpen(true)} mt={5} mx={2}>
        set target
      </Button>

      <CustomModal
        isOpen={isOpen}
        setOpen={() => setIsOpen(false)}
        value={value}
        onChangeText={setValue}
        handleOnPress={() => handleOnPress()}
        title="Set a target for today"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 15,
  },
});
