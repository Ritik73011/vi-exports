import { useDispatch, useSelector } from "react-redux";
import "./Tender.css";
import { useEffect } from "react";
import { getTendersAdmin } from "../../store/slices/TenderSlice";
import { getDateFromTimestamp } from "../../utils";
const AllTender = () => {
  const { loading, tenders } = useSelector((state) => state.tenders);
  const dispatch = useDispatch();
  useEffect(() => {
    if (tenders.length === 0) dispatch(getTendersAdmin());
  }, [tenders]);
  return (
    <div className="tender-list">
      {loading ? (
        <div>Loading...</div>
      ) : (
        tenders.map((tender) => (
          <SingleTenderCard key={tender._id} tender={tender} />
        ))
      )}
    </div>
  );
};

const SingleTenderCard = ({ tender }) => {
  return (
    <div className="tender-card">
      <h3>{tender.name}</h3>
      <p>
        <strong>Description:</strong> {tender.description}
      </p>
      <p>
        <strong>Start Time:</strong> {getDateFromTimestamp(tender.startTime)}
      </p>
      <p>
        <strong>End Time:</strong> {getDateFromTimestamp(tender.endTime)}
      </p>
      <p>
        <strong>Buffer Time:</strong> {getDateFromTimestamp(tender.bufferTime)}{" "}
        minutes
      </p>
      <p>
        <strong>Status:</strong> {tender.isClosed ? "Closed" : "Ongoing"}
      </p>
      <p>
        <strong>Creation Time:</strong> {tender.createdAt}
      </p>
    </div>
  );
};

export default AllTender;
