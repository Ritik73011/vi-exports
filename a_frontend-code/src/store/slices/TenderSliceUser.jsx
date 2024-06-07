import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const api = "http://localhost:8000/";

// Getting Tenders for user
export const getTendersUser = createAsyncThunk(
  "getTendersUser",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(`${api}get-tenders-users`);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      return rejectWithValue("Opps found an error", err.response.data);
    }
  }
);

export const userTenderSlice = createSlice({
  name: "uTenders",
  initialState: {
    uTenders: [],
    loading: false,
    error: null,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTendersUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTendersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.uTenders = action.payload.tenders;
      })
      .addCase(getTendersUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = action.payload;
      });
  },
});

export default userTenderSlice.reducer;
