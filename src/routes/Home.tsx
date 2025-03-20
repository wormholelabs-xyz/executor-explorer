import { Box } from "@mui/material";
import Capabilities from "../components/Capabilities";
import Search from "../components/Search";

function Home() {
  return (
    <>
      <Search />
      <Box my={4}>
        <Capabilities />
      </Box>
    </>
  );
}
export default Home;
