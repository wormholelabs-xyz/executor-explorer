import SearchIcon from "@mui/icons-material/Search";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

function Search() {
  const { search } = useLocation();
  const { push } = useHistory();
  const [txHash, setTxHash] = useState<string>("");
  const handleChange = useCallback((event: any) => {
    setTxHash(event.target.value);
  }, []);
  const onClick = useCallback(() => {
    if (txHash) {
      push({ pathname: `/tx/${txHash}`, search });
    }
  }, [push, search, txHash]);
  const onEnter = useCallback(
    (e: any) => {
      if (e.key === "Enter" && txHash) {
        push({ pathname: `/tx/${txHash}`, search });
      }
    },
    [push, search, txHash],
  );
  return (
    <Card>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          value={txHash}
          onChange={handleChange}
          sx={{ flexGrow: 1, mr: 1 }}
          margin="dense"
          size="small"
          placeholder="Search..."
          type="search"
          onKeyDown={onEnter}
        />
        <Button
          onClick={onClick}
          variant="contained"
          size="small"
          sx={{ p: 0, minWidth: 32, height: 32 }}
        >
          <SearchIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
export default Search;
