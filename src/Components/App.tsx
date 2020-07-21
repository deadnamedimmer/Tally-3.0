import React, { Fragment } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import AddPage from "./AddPage";
import StatsPage from "./StatsPage";

export enum PAGES {
  ADD,
  STATS,
}

function App() {
  const [page, setPage] = React.useState<PAGES>(PAGES.ADD);
  const [data, setData] = React.useState([
    { dateTime: "7/21/2020, 12:57:06 PM", type: "Sample Data" },
  ]);

  const addItem = (event: any) => {
    let newData = data.slice();
    newData.unshift(event);
    setData(newData);
  };
  const removeItem = (index: number) => {
    let newData = data.slice();
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <Fragment>
      <Box style={{ height: "100vh", overflowY: "hidden" }}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" style={{ marginRight: "auto" }}>
              Tally 3.0
            </Typography>
            {page === PAGES.ADD && (
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setPage(PAGES.STATS);
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            {page === PAGES.STATS && (
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setPage(PAGES.ADD);
                }}
              >
                <AddIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Box style={{ marginTop: "20px" }}></Box>
        {page === PAGES.ADD && (
          <Box style={{ width: "100vw" }}>
            <AddPage
              data={data}
              addItem={addItem}
              removeItem={removeItem}
            ></AddPage>
          </Box>
        )}
        {page === PAGES.STATS && (
          <StatsPage data={data} removeItem={removeItem}></StatsPage>
        )}
      </Box>
    </Fragment>
  );
}

export default App;
