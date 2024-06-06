import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Box from "@mui/joy/Box";
import TabPanel from "@mui/joy/TabPanel";
import TenderForm from "../../component/tenderCreationForm/TenderForm";
import AllTender from "../allTender/AllTender";
import AllBids from "../AllBids/AllBids";
const AdminSec = () => {
  return (
    <div>
      <Tabs
        aria-label="tabs"
        defaultValue={0}
        sx={{
          bgcolor: "transparent",
        }}
      >
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: "xl",
            bgcolor: "background.level1",
            justifyContent: "center",
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: "sm",
              bgcolor: "background.surface",
            },
          }}
        >
          <Tab disableIndicator>Create Tender</Tab>
          <Tab disableIndicator>All Tenders</Tab>
          <Tab disableIndicator>All Bids</Tab>
        </TabList>

        <Box>
          <TabPanel
            sx={{ display: "flex", justifyContent: "center" }}
            value={0}
          >
            <Box sx={{ maxWidth: "700px", width: "100%" }}>
              <TenderForm />
            </Box>
          </TabPanel>
          <TabPanel
            sx={{ display: "flex", justifyContent: "center" }}
            value={1}
          >
            <Box sx={{ maxWidth: "700px", width: "100%" }}>
              <AllTender />
            </Box>
          </TabPanel>
          <TabPanel
            sx={{ display: "flex", justifyContent: "center" }}
            value={2}
          >
            <Box sx={{ width: "100%" }}>
              <AllBids />
            </Box>
          </TabPanel>
        </Box>
      </Tabs>
    </div>
  );
};

export default AdminSec;
