import { useContext, useState } from "react";
import "./BidForm.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContext } from "../../context/ToastContext";
import { createBids, getBids } from "../../store/slices/BidSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getTendersUser } from "../../store/slices/TenderSliceUser";

const BidForm = ({ tenderId }) => {
  const dispatch = useDispatch();
  const { showSnack } = useContext(ToastContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bidTime: "",
    bidCost: "",
  });

  const { bLoading } = useSelector((state) => state.bids);

  //handle form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        createBids({ ...formData, tenderId: tenderId })
      );
      const originalPromiseResult = unwrapResult(resultAction);

      if (originalPromiseResult.success) {
        setFormData({
          name: "",
          email: "",
          bidTime: "",
          bidCost: "",
        });
        showSnack("success", originalPromiseResult.msg);
        dispatch(getTendersUser());
        dispatch(getBids());
      } else {
        showSnack("warning", originalPromiseResult.msg);
        dispatch(getTendersUser());
        dispatch(getBids());
      }
    } catch (rejectedValueOrSerializedError) {
      alert(rejectedValueOrSerializedError);
    }
  };

  //ui part
  return (
    <div className="form-container-bid">
      <form className="bid-form" onSubmit={handleSubmit}>
        <h2>Submit Your Bid</h2>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bidTime">Bid Time:</label>
          <input
            type="datetime-local"
            id="bidTime"
            name="bidTime"
            value={formData.bidTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bidCost">Bid Cost:</label>
          <input
            type="number"
            id="bidCost"
            name="bidCost"
            value={formData.bidCost}
            onChange={handleChange}
            required
          />
        </div>
        <button disabled={bLoading} type="submit" className="submit-button">
          Submit Bid
        </button>
      </form>
    </div>
  );
};

export default BidForm;
