import { Route, Routes } from "react-router-dom";
import AdminSec from "../component/admin/AdminSec";
import UserSec from "../component/user/UserSec";
import PageNotFound from "../component/pageNotFound/PageNotFound";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserSec />} />
      <Route path="/admin" element={<AdminSec />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MyRoutes;
