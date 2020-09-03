import React, { Fragment, useState, useEffect } from "react";
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
import socketIOClient from "socket.io-client";
import api from "../api/index";

const ENDPOINT = "http://127.0.0.1:3000";

export enum PAGES {
  ADD,
  STATS,
}

function App() {
  const [page, setPage] = React.useState<PAGES>(PAGES.ADD);
  const [data, setData] = React.useState([]);

  const [number, setNumber] = useState(0);

  const updateNumber = async () => {
    await api.getNumber().then((frame) => {
      setNumber(frame.data.data);
    });
  };

  const updateThree = async () => {
    await api.getThree().then((frame) => {
      let newData = [];

      for (let i = 0; i < frame.data.data.length; i++) {
        newData.push({
          dateTime: frame.data.data[i].timestamp,
          type: frame.data.data[i].type,
          id: frame.data.data[i]._id,
        });
      }

      // console.log(newData);

      setData(newData);
    });
  };

  const deleteEvent = async (id: String) => {
    await api.deleteEventById(id);
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("Update", (data) => {
      console.log("Updating");
      updateNumber();
      updateThree();
    });

    return () => socket.disconnect();
  }, []);

  const removeItem = (id: String) => {
    deleteEvent(id);
  };

  return (
    <Fragment>
      <Box style={{ height: "100vh" }}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" style={{ marginRight: "auto" }}>
              Tally 3.0
            </Typography>
            <Typography variant="h6" style={{ marginRight: "auto" }}>
              {number} requests served today
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
            <AddPage data={data} removeItem={removeItem}></AddPage>
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
