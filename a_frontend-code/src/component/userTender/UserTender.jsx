import { useDispatch, useSelector } from "react-redux";
import "./UserTender.css";
import { useEffect, useState } from "react";
import { getTendersUser } from "../../store/slices/TenderSliceUser";
import { getDateFromTimestamp } from "../../utils";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import BidForm from "../bidForm/BidForm";

const UserTender = () => {
  const { loading, uTenders } = useSelector((state) => state.uTenders);
  const dispatch = useDispatch();
  useEffect(() => {
    if (uTenders.length === 0) dispatch(getTendersUser());
  }, [uTenders]);
  return (
    <div className="tender-list">
      {loading ? (
        <div>Loading...</div>
      ) : (
        uTenders.map((tender) => (
          <SingleTenderCard key={tender._id} tender={tender} />
        ))
      )}
    </div>
  );
};

const SingleTenderCard = ({ tender }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="tender-card-u">
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
      <p style={{ textAlign: "center" }}>
        <strong>
          {tender.bids.length === 0
            ? "No quote found for this tender"
            : `The lowest quote for this tender is ${
                tender.bids[tender.bids.length - 1].bidCost
              }`}
        </strong>
      </p>
      <button className="btn-bids" onClick={() => setOpen(true)}>
        Submit Quotation
      </button>

      {/* MODAL CODE START */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 2,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <BidForm tenderId={tender._id} />
        </Sheet>
      </Modal>
    </div>
  );
};

export default UserTender;
