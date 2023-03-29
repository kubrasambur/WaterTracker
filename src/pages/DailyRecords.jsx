import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Button, Text, VStack } from "native-base";
import CustomAddModal from "../components/custom/CustomAddModal";
import { GetData, StoreData } from "../helper/AsyncStorage";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DailyRecords() {
  const allReminders = useSelector((state) => state?.water?.reminder);
  const dailyWater = useSelector((state) => state?.water?.waterDaily);

  const [isOpen, setIsOpen] = useState(false);
  const [newWaterGoal, setNewWaterGoal] = useState("");
  const [waterGoal, setWaterGoal] = useState(0);

  const labels = dailyWater.map((item) => {
    return `day ${item.id}`;
  });

  function handleOnPress() {
    setIsOpen(false);

    AsyncStorage.setItem("waterGoal", JSON.stringify(newWaterGoal));
    const value = AsyncStorage.getItem("waterGoal");
    value.then((value) => {
      setWaterGoal(JSON.parse(value));
    });

    StoreData([...allReminders, { id: uuid.v4(), title: newWaterGoal }]);
    GetData();
  }

  useEffect(() => {
    const value = AsyncStorage.getItem("waterGoal");
    value.then((value) => {
      setWaterGoal(JSON.parse(value));
    });
  }, []);

  useEffect(() => {
    GetData();
  }, []);

  return (
    <VStack bg="white" flex={1} pt={5}>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: dailyWater.map((item) => {
                return item.value;
              }),
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={250}
        yAxisSuffix=" lt"
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",

            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 10,
          borderRadius: 16,
          marginRight: 20,
          marginLeft: 10,
        }}
      />
      {waterGoal > 0 ? (
        <Text fontSize={17} mx={3} mt={5}>
          Target for today: {waterGoal} lt
        </Text>
      ) : (
        <Text fontSize={17} mx={3} mt={5}>
          Set a target for today
        </Text>
      )}

      <Button onPress={() => setIsOpen(true)} mt={2} mx={3}>
        {waterGoal > 0 ? "Change target" : "Set target"}
      </Button>

      <CustomAddModal
        isOpen={isOpen}
        setOpen={() => setIsOpen(false)}
        value={newWaterGoal.toString()}
        onChangeText={setNewWaterGoal}
        handleOnPress={() => handleOnPress()}
        title="Set a target for today"
      />
    </VStack>
  );
}
