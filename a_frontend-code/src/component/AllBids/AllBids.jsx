import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBids } from "../../store/slices/BidSlice";
import Table from "@mui/joy/Table";
import { getDateFromTimestamp } from "../../utils";
const AllBids = () => {
  const dispatch = useDispatch();
  const { bLoading, bids } = useSelector((state) => state.bids);

  useEffect(() => {
    if (bids.length === 0) dispatch(getBids());
  }, []);
  return (
    <div>
      {bLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          <Table borderAxis="both">
            <caption>All bids of users</caption>
            <thead>
              <tr>
                <th>Tender Name</th>
                <th>Company Name</th>
                <th style={{ width: "20%" }}>Email</th>
                <th>Bid Time</th>
                <th>Bid Cost</th>
                <th>Placed in Last 5 min</th>
                <th>Placed At</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((row) => (
                <tr key={row._id}>
                  <td style={{ wordWrap: "break-word" }}>{row.tenderName}</td>
                  <td style={{ wordWrap: "break-word" }}>{row.name}</td>
                  <td style={{ wordWrap: "break-word" }}>{row.email}</td>
                  <td style={{ wordWrap: "break-word" }}>
                    {getDateFromTimestamp(row.bidTime)}
                  </td>
                  <td style={{ wordWrap: "break-word" }}>{row.bidCost}</td>
                  <td style={{ wordWrap: "break-word" }}>
                    {row.flag.toString()}
                  </td>
                  <td style={{ wordWrap: "break-word" }}>{row.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AllBids;
