import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDailyWater, setAsyncStorage } from "../redux/slices/waterSlice";
import { store } from "../redux/store";

export async function StoreData(reminderList) {
  try {
    await AsyncStorage.setItem("reminderList", JSON.stringify(reminderList));
  } catch (error) {
    console.log(error);
  }
}

export async function StoreWaterData(dailyWater) {
  console.log("dailyWater1", dailyWater);
  try {
    await AsyncStorage.setItem("dailyWater", JSON.stringify(dailyWater));
  } catch (error) {
    console.log(error);
  }
}

export async function GetWaterData() {
  try {
    const value = await AsyncStorage.getItem("dailyWater");

    if (value !== null) {
      console.log("value2", value);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GetData() {
  try {
    const value = await AsyncStorage.getItem("reminderList");
    if (value !== null) {
      store.dispatch(setAsyncStorage(JSON.parse(allList)));
    }
  } catch (error) {
    console.log(error);
  }
}

export async function RemoveData(itemId) {
  try {
    let allList = await AsyncStorage.getItem("reminderList");
    allList = JSON.parse(allList);
    const item = allList.filter((list) => list.id !== itemId);
    await AsyncStorage.setItem("reminderList", JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
}
