import { Code, List } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

function RawView({ data, children }: { data: any; children: React.ReactNode }) {
  const [viewRaw, setViewRaw] = useState(false);
  return viewRaw ? (
    <>
      <Button onClick={() => setViewRaw(false)} endIcon={<List />}>
        View Simple
      </Button>
      <pre style={{ overflow: "auto" }}>
        {JSON.stringify(data, undefined, 2)}
      </pre>
    </>
  ) : (
    <>
      <Button onClick={() => setViewRaw(true)} endIcon={<Code />}>
        View Raw
      </Button>
      {children}
    </>
  );
}

export default RawView;
