import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const api = "http://localhost:8000/";

export const getTendersAdmin = createAsyncThunk(
  "getTendersAdmin",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(`${api}get-tenders`);
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue("Opps found an error", err.response.data);
    }
  }
);

//create action
export const createTender = createAsyncThunk(
  "createTender",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${api}create-tender`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.errors) return result.errors[0].msg;
      return result;
    } catch (error) {
      return rejectWithValue("Opps found an error", error.response.data);
    }
  }
);

export const tenderSlice = createSlice({
  name: "tenders",
  initialState: {
    tenders: [],
    loading: false,
    error: null,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTendersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTendersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.tenders = action.payload.tenders;
        state.message = action.payload.msg;
      })
      .addCase(getTendersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = action.payload;
      })
      .addCase(createTender.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTender.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.tenders = [
            ...state.tenders,
            {
              ...action.meta.arg,
              _id: action.payload._id,
              createdAt: action.payload.newDate,
            },
          ];
          state.message = action.payload.msg;
        }
      })
      .addCase(createTender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
      });
  },
});

export default tenderSlice.reducer;
