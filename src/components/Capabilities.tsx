import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useCapabilities } from "../hooks/useCapabilities";
import { chainIdToName } from "../utils/chainIdToName";
import ChainIdIcon from "./ChainIdIcon";
import RawView from "./RawView";
import { Launch } from "@mui/icons-material";

function Capabilities() {
  const result = useCapabilities(true);
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Capabilities
        </Typography>
        {result ? (
          result.err ? (
            <Typography color="error">{result.err}</Typography>
          ) : (
            <>
              <RawView data={result.data}>
                {Object.keys(result.data).map((c) => (
                  <Box sx={{ mt: 2 }}>
                    <Divider />
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ mb: 1, mt: 2 }}
                    >
                      <ChainIdIcon chainId={Number(c)} size="24px" />
                      <Typography sx={{ ml: 1 }}>
                        {chainIdToName(Number(c))}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 4 }}>
                      <Typography gutterBottom>
                        Request Types:{" "}
                        {result.data[c].requestPrefixes.join(", ")}
                      </Typography>
                      <Typography gutterBottom>
                        Gas Drop-Off Limit: {result.data[c].gasDropOffLimit}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </RawView>
              <Button
                sx={{ mt: 2 }}
                size="small"
                href="https://github.com/wormholelabs-xyz/example-messaging-executor?tab=readme-ov-file#request-for-execution"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<Launch />}
              >
                Request Definitions
              </Button>
            </>
          )
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
export default Capabilities;
