import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAsyncStorage } from "../redux/slices/waterSlice";
import { store } from "../redux/store";

export async function StoreData(reminderList) {
  try {
    await AsyncStorage.setItem("reminderList", JSON.stringify(reminderList));
  } catch (error) {
    console.log(error);
  }
}

export async function GetData() {
  try {
    const value = await AsyncStorage.getItem("reminderList");
    if (value !== null) {
      store.dispatch(setAsyncStorage(JSON.parse(value)));
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

export async function StoreWaterData(dailyWater, value) {
  AsyncStorage.setItem(
    "dailyWater",
    JSON.stringify([
      ...dailyWater,
      { id: dailyWater.length + 1, value: parseInt(value) },
    ])
  );
}

export async function GetWaterData(setDailyWater) {
  AsyncStorage.getItem("dailyWater").then((value) => {
    if (value) {
      setDailyWater(JSON.parse(value));
    }
  });
}
