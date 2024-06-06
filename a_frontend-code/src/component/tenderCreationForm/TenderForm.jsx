import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TenderForm.css";
import { createTender } from "../../store/slices/TenderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ToastContext } from "../../context/ToastContext";
import { getTendersUser } from "../../store/slices/TenderSliceUser";

const TenderForm = () => {
  const dispatch = useDispatch();
  const { showSnack } = useContext(ToastContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    bufferTime: "",
  });

  //getting values from store
  const { loading } = useSelector((state) => state.tenders);

  //handling form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //storing data in database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(createTender(formData));
      const originalPromiseResult = unwrapResult(resultAction);

      if (originalPromiseResult.msg == "Tender created...") {
        setFormData({
          name: "",
          description: "",
          startTime: "",
          endTime: "",
          bufferTime: "",
        });
        showSnack("success", originalPromiseResult.msg);
        dispatch(getTendersUser());
      } else {
        showSnack("warning", originalPromiseResult.msg);
        dispatch(getTendersUser());
      }
    } catch (rejectedValueOrSerializedError) {
      alert(rejectedValueOrSerializedError);
    }
  };

  //ui part
  return (
    <div className="form-container">
      <form className="tender-form" onSubmit={handleSubmit}>
        <h2>Create New Tender</h2>
        <div className="form-group">
          <label htmlFor="name">Tender Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Tender Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bufferTime">Buffer Time:</label>
          <input
            type="datetime-local"
            id="bufferTime"
            name="bufferTime"
            value={formData.bufferTime}
            onChange={handleChange}
            required
          />
        </div>
        <button disabled={loading} type="submit" className="submit-button">
          {loading ? "Creating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TenderForm;
