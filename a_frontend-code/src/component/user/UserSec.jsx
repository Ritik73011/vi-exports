import UserTender from "../userTender/UserTender";

const UserSec = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "700px", width: "100%" }}>
        <h2 style={{ padding: "16px", textAlign: "center" }}>
          All Available Tenders
        </h2>
        <UserTender />
      </div>
    </div>
  );
};

export default UserSec;
