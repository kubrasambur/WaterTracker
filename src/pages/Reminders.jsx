import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Center, Button, Text } from "native-base";
import { useSelector } from "react-redux";
import { GetData } from "../helper/AsyncStorage";
import { store } from "../redux/store";
import { editReminder, removeAllReminders } from "../redux/slices/waterSlice";
import CustomAddModal from "../components/custom/CustomAddModal";
import CustomEditModal from "../components/custom/CustomEditModal";

export default function () {
  const allReminders = useSelector((state) => state?.water?.reminder);
  console.log("allReminders", allReminders);

  const [isOpen, setIsOpen] = useState(false);
  const [reminderId, setReminderId] = useState("");
  const [reminderTitle, setReminderTitle] = useState("");

  useEffect(() => {
    GetData();
  }, []);

  function removeReminder(id) {
    const newReminders = allReminders.filter((reminder) => reminder.id !== id);
    AsyncStorage.setItem("reminders", JSON.stringify(newReminders));
  }

  function removeReminders() {
    AsyncStorage.clear();
    store.dispatch(removeAllReminders());
  }

  function onEditReminder(id, title) {
    setIsOpen(true);
    setReminderId(id);
    setReminderTitle(title);
  }

  function handleOnPress() {
    setIsOpen(false);
    store.dispatch(editReminder(reminderId));
  }

  return (
    <Center>
      {allReminders.map((reminder) => {
        return (
          <Box key={reminder.id}>
            <Text>{reminder.title}</Text>
            <Button onPress={() => onEditReminder(reminder.id, reminder.title)}>
              Edit
            </Button>
          </Box>
        );
      })}
      <Button onPress={() => removeReminders()}>Remove All</Button>

      <CustomEditModal
        isOpen={isOpen}
        setOpen={() => setIsOpen(false)}
        value={reminderTitle}
        onChangeText={() => setReminderTitle()}
        handleOnPress={() => handleOnPress()}
        title="Set a target for today"
      />
    </Center>
  );
}
