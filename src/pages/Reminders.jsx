import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Center, Button, Text, ScrollView, HStack } from "native-base";
import { useSelector } from "react-redux";
import { GetData } from "../helper/AsyncStorage";
import { store } from "../redux/store";
import { removeAllReminders } from "../redux/slices/waterSlice";
import CustomEditModal from "../components/custom/CustomEditModal";
import uuid from "react-native-uuid";
import CustomAddModal from "../components/custom/CustomAddModal";

export default function () {
  const allReminders = useSelector((state) => state?.water?.reminder);
  console.log("allReminders", allReminders);

  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [reminderId, setReminderId] = useState("");
  const [reminderTitle, setReminderTitle] = useState("");
  const [newReminder, setNewReminder] = useState("");

  function removeReminder(id) {
    const newReminders = allReminders.filter((reminder) => reminder.id !== id);
    AsyncStorage.setItem("reminders", JSON.stringify(newReminders));
  }

  function removeReminders() {
    AsyncStorage.clear();
    store.dispatch(removeAllReminders());
  }

  function onEditReminder(reminder) {
    setReminderId(reminder?.id);
    setReminderTitle(reminder?.title);
    setEditIsOpen(true);
  }

  function editReminder() {
    const newArray = allReminders.filter(
      (reminder) => reminder.id !== reminderId
    );
    const newReminder = { id: reminderId, title: reminderTitle };
    newArray.push(newReminder);
    AsyncStorage.setItem("reminderList", JSON.stringify(newArray));
    GetData();
    setEditIsOpen(false);
  }

  function addNewReminder() {
    const newReminder_ = {
      id: uuid.v4(),
      title: newReminder,
    };
    const newArray = [...allReminders, newReminder_];
    AsyncStorage.setItem("reminderList", JSON.stringify(newArray));
    GetData();
    setIsOpen(false);
    setNewReminder("");
  }

  useEffect(() => {
    GetData();
  }, []);

  return (
    <Center px={5} mt={4}>
      <ScrollView h="87%">
        {allReminders.map((reminder) => {
          return (
            <Box
              borderRadius={10}
              key={reminder.id}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              bg="gray.300"
              w="86.5%"
              pl={4}
              mb={4}
              pr={2}
              py={2}
            >
              <Text mr={3} w="20%">
                {reminder.title}
              </Text>
              <Button w="40%" onPress={() => onEditReminder(reminder)}>
                Edit
              </Button>
            </Box>
          );
        })}
      </ScrollView>

      <HStack mt={5} mb={3} justifyContent="space-evenly" w="100%">
        <Button onPress={() => removeReminders()}>Remove All</Button>
        <Button onPress={() => setIsOpen(true)}>Add New Reminder</Button>
      </HStack>

      <CustomEditModal
        isOpen={EditIsOpen}
        setOpen={() => setEditIsOpen(false)}
        value={reminderTitle}
        onChangeText={setReminderTitle}
        handleOnPress={() => editReminder()}
        title="Edit a target"
      />

      <CustomAddModal
        isOpen={isOpen}
        setOpen={() => setIsOpen(false)}
        value={newReminder}
        onChangeText={setNewReminder}
        handleOnPress={() => addNewReminder()}
        title="Add new reminder"
      />
    </Center>
  );
}
