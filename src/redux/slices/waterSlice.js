import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  water: 0,
  waterGoal: 0,
  waterDaily: [],
  reminder: [],
  dailyWater: [],
  waterGoalReached: false,
  status: "idle",
  error: null,
};

export const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    setWater: (state, action) => {
      state.water = action.payload;
    },
    setWaterGoal: (state, action) => {
      state.waterGoal = action.payload;
    },
    addReminder: (state, action) => {
      state.reminder.push(action.payload);
    },
    setAsyncStorage: (state, action) => {
      state.reminder = action.payload;
    },
    removeAllReminders: (state) => {
      state.reminder = [];
    },
    addDailyWater: (state, action) => {
      console.log("addDailyWater", action.payload);
      state.dailyWater.push(action.payload);
    },
    setWaterDaily: (state, action) => {
      state.waterDaily = action.payload;
    },
  },
});

export const {
  setWater,
  setWaterGoal,
  addReminder,
  setAsyncStorage,
  removeAllReminders,
  editReminder,
  addDailyWater,
  setWaterDaily,
} = waterSlice.actions;

export default waterSlice.reducer;
