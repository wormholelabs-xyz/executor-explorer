import SearchIcon from "@mui/icons-material/Search";
import { Card, CardContent, TextField } from "@mui/material";

function Search() {
  return (
    <Card>
      <CardContent>
        <TextField
          disabled // TODO: implement search
          fullWidth
          margin="dense"
          placeholder="Search..."
          type="search"
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ pr: 0.5 }} />,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
export default Search;
