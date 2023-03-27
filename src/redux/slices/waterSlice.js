import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  water: 0,
  waterGoal: 0,
  reminder: [],
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
  },
});

export const {
  setWater,
  setWaterGoal,
  addReminder,
  setAsyncStorage,
  removeAllReminders,
  editReminder,
} = waterSlice.actions;

export default waterSlice.reducer;
