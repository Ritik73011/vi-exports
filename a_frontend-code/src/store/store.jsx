import { configureStore } from "@reduxjs/toolkit";
import tenderSlice from "./slices/TenderSlice";
import userTenderSlice from "./slices/TenderSliceUser";
import BidSlice from "./slices/BidSlice";

export const store = configureStore({
  reducer: {
    tenders: tenderSlice,
    uTenders: userTenderSlice,
    bids: BidSlice,
  },
});
