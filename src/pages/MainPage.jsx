import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "native-base";
import CustomModal from "../components/custom/CustomModal";

export default function MainPage() {
  const [water, setWater] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  function increaseWater() {
    setWater(water + 1);
  }

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

  function deleteWater() {
    setWater(0);
  }

  function handleOnPress(value) {
    setWater(water + parseInt(value));
    setIsOpen(false);
  }

  return (
    <View style={styles.container}>
      <Text>Total amount of water drunk until today</Text>
      <Text>{water}</Text>
      <Button onPress={increaseWater} mb={2}>
        Increase water
      </Button>
      <Button
        onPress={() => {
          deleteWater();
        }}
        mb={2}
      >
        Delete all
      </Button>
      <Button onPress={() => setIsOpen(true)} mb={2}>
        Add water manually
      </Button>
      <CustomModal
        isOpen={isOpen}
        setOpen={() => setIsOpen(false)}
        value={value}
        onChangeText={setValue}
        handleOnPress={() => handleOnPress(value)}
        title="Add water"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
});
