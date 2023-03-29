import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text, VStack } from "native-base";
import CustomAddModal from "../components/custom/CustomAddModal";
import { store } from "../redux/store";
import { addDailyWater, setWaterDaily } from "../redux/slices/waterSlice";
import { GetWaterData, StoreWaterData } from "../helper/AsyncStorage";

export default function MainPage() {
  const [water, setWater] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [dailyWater, setDailyWater] = useState([]);

  function handleOnPress(value) {
    setWater(water + parseInt(value));
    setIsOpen(false);
    setValue("");
    store.dispatch(
      addDailyWater({ id: dailyWater.length + 1, value: parseInt(value) })
    );
    StoreWaterData(dailyWater, value);
    GetWaterData(setDailyWater);
  }

  useEffect(() => {
    GetWaterData(setDailyWater);
  }, []);

  useEffect(() => {
    store.dispatch(setWaterDaily(dailyWater));
  }, [dailyWater]);

  useEffect(() => {
    AsyncStorage.getItem("water").then((value) => {
      if (value) {
        setWater(parseInt(value));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("water", water.toString());
  }, [water]);

  return (
    <VStack bg="white" flex={1} px="10%" pt="5%">
      <Text mb={3} fontSize={25}>
        Total amount of water drunk until today
      </Text>
      <Text mb={5} fontSize={19}>
        {water} lt
      </Text>

      <Button _text={{ fontSize: 18 }} onPress={() => setIsOpen(true)} mb={2}>
        Add water
      </Button>

      <CustomAddModal
        isOpen={isOpen}
        setOpen={() => setIsOpen(false)}
        value={value}
        onChangeText={setValue}
        handleOnPress={() => handleOnPress(value)}
        title="Add water"
      />
    </VStack>
  );
}
