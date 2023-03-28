import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text, VStack } from "native-base";
import CustomAddModal from "../components/custom/CustomAddModal";
import { store } from "../redux/store";
import { addDailyWater, setWaterDaily } from "../redux/slices/waterSlice";
import { useSelector } from "react-redux";
import { GetWaterData, StoreWaterData } from "../helper/AsyncStorage";

export default function MainPage() {
  const [water, setWater] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [dailyWater, setDailyWater] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("dailyWater").then((value) => {
      if (value) {
        setDailyWater(JSON.parse(value));
      }
    });
  }, []);

  useEffect(() => {
    store.dispatch(setWaterDaily(dailyWater));
  }, [dailyWater]);

  useEffect(() => {
    AsyncStorage.getItem("water").then((value2) => {
      if (value2) {
        setWater(parseInt(value2));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("water", water.toString());
  }, [water]);

  function handleOnPress(value) {
    setWater(water + parseInt(value));
    setIsOpen(false);
    setValue("");
    store.dispatch(addDailyWater(parseInt(value)));
    AsyncStorage.setItem(
      "dailyWater",
      JSON.stringify([...dailyWater, parseInt(value)])
    );
    setDailyWater([...dailyWater, parseInt(value)]);
  }

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
