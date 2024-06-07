import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const api = "http://localhost:8000/";

// GEtting bids
export const getBids = createAsyncThunk(
  "getBids",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(`${api}get-bid`);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      return rejectWithValue("Opps found an error", err.response.data);
    }
  }
);

//create action
export const createBids = createAsyncThunk(
  "createBids",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${api}create-bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      if (result.errors) return result.errors[0].msg;
      return result;
    } catch (error) {
      return rejectWithValue("Opps found an error", error.response.data);
    }
  }
);

export const bidSlice = createSlice({
  name: "bids",
  initialState: {
    bids: [],
    bLoading: false,
    error: null,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBids.pending, (state) => {
        state.bLoading = true;
      })
      .addCase(getBids.fulfilled, (state, action) => {
        state.bLoading = false;
        state.bids = action.payload.bids;
        state.message = action.payload.msg;
      })
      .addCase(getBids.rejected, (state, action) => {
        state.bLoading = false;
        state.message = action.payload;
        state.error = action.payload;
      })
      .addCase(createBids.pending, (state) => {
        state.bLoading = true;
      })
      .addCase(createBids.fulfilled, (state, action) => {
        state.bLoading = false;
        if (action.payload.success) {
          state.bids = [
            ...state.bids,
            {
              ...action.meta.arg,
              _id: action.payload._id,
              createdAt: action.payload.newDate,
            },
          ];
          state.message = action.payload.msg;
        }
      })
      .addCase(createBids.rejected, (state, action) => {
        state.bLoading = false;
        state.error = action.payload;
        state.message = action.payload;
      });
  },
});

export default bidSlice.reducer;
