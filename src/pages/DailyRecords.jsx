import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Button, Text, VStack } from "native-base";
import CustomAddModal from "../components/custom/CustomAddModal";
import { GetData, GetWaterData, StoreData } from "../helper/AsyncStorage";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";

export default function DailyRecords() {
  const allReminders = useSelector((state) => state?.water?.reminder);
  const dailyww = useSelector((state) => state?.water?.waterDaily);

  const [isOpen, setIsOpen] = useState(false);
  const [newWaterGoal, setNewWaterGoal] = useState("");
  const [water, setWater] = useState([50, 100, 150, 200, 250, 300, 350]);

  function handleOnPress() {
    setIsOpen(false);
    StoreData([...allReminders, { id: uuid.v4(), title: newWaterGoal }]);
    GetData();
  }

  useEffect(() => {
    GetData();
  }, []);

  return (
    <VStack bg="white" flex={1} pt={5}>
      <LineChart
        data={{
          labels: ["1", "2", "3", "4", "5", "6", "7"],
          datasets: [
            {
              data: dailyww,
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
        {newWaterGoal > 0 ? "Change target" : "Set target"}
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
