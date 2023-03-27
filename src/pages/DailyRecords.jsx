import { View, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Button, Text } from "native-base";
import CustomAddModal from "../components/custom/CustomAddModal";
import { GetData, StoreData } from "../helper/AsyncStorage";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";

export default function DailyRecords() {
  const allReminders = useSelector((state) => state?.water?.reminder);

  const [isOpen, setIsOpen] = useState(false);
  const [newWaterGoal, setNewWaterGoal] = useState("");

  function handleOnPress() {
    setIsOpen(false);
    StoreData([...allReminders, { id: uuid.v4(), title: newWaterGoal }]);
    GetData();
  }

  useEffect(() => {
    GetData();
  }, []);

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
      {newWaterGoal > 0 ? (
        <Text mx={2} mt={5}>
          Target for today: {newWaterGoal}
        </Text>
      ) : (
        <Text mx={2} mt={5}>
          Set a target for today
        </Text>
      )}

      <Button onPress={() => setIsOpen(true)} mt={2} mx={2}>
        set target
      </Button>

      <CustomAddModal
        isOpen={isOpen}
        setOpen={() => setIsOpen(false)}
        value={newWaterGoal.toString()}
        onChangeText={setNewWaterGoal}
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
