import { GitHub } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Network from "../components/Network";
import Settings from "../components/Settings";
import Home from "./Home";
import Tx from "./Tx";

function NavButton(props: any) {
  // fix for Invalid value for prop `navigate` on <a> tag
  const { navigate, ...rest } = props;
  return <Button {...rest} />;
}

function NavLinks() {
  const { search } = useLocation();
  return (
    <>
      <NavLink
        to={`/${search}`}
        exact
        component={NavButton}
        color="inherit"
        activeStyle={{ borderBottom: "2px solid", paddingBottom: 4 }}
        style={{
          marginLeft: -8,
          textTransform: "none",
          borderRadius: 0,
          minWidth: 0,
        }}
      >
        <Typography variant="h6" sx={{ pl: 0.75 }}>
          🪓 Executor Explorer
        </Typography>
      </NavLink>
    </>
  );
}

function RedirectKeepQuery() {
  const { search } = useLocation();
  return <Redirect to={`/${search}`} />;
}

function Main() {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ minHeight: 40 }}>
          <NavLinks />
          <Box flexGrow={1} />
          <IconButton
            sx={{ ml: 1 }}
            href="https://github.com/wormholelabs-xyz/executor-explorer"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <GitHub />
          </IconButton>
          <Network />
          <Settings />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Switch>
          <Route path="/tx/:hash" exact>
            <Tx />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/">
            <RedirectKeepQuery />
          </Route>
        </Switch>
      </Container>
    </>
  );
}
export default Main;
