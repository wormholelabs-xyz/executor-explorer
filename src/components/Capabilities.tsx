import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useCapabilities } from "../hooks/useCapabilities";

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
            <pre>{JSON.stringify(result.data, undefined, 2)}</pre>
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
