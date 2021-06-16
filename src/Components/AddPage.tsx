import React, { Fragment } from "react";
import { Grid, Button, List, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import EventItem from "./EventItem";

import api from "../api/index";

interface AddProps {
  data: any;
  removeItem: Function;
}

const AddPage: React.FunctionComponent<AddProps> = ({ data, removeItem }) => {
  const add = (type: String) => {
    let timestamp = new Date().toLocaleString();
    // console.log(timestamp);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    let date = yyyy + "/" + mm + "/" + dd;

    let time =
      String(today.getHours()).padStart(2, "0") +
      ":" +
      String(today.getMinutes()).padStart(2, "0") +
      ":" +
      String(today.getSeconds()).padStart(2, "0");

    //console.log(date);
    // console.log(time);
    api.insertEvent({
      date: date,
      time: time,
      type: type,
      timestamp: timestamp,
    });
    // addItem({ date, time, type, timestamp });
    // console.log(data);
  };
  const buttonTypes = [
    "Reference Question",
    "Program Question",
    "Guest Pass",
    "Technology Question",
    "Reader's Advisory",
    "Directional Question",
    "Interloan",
    "Referral",
    "Game Computer",
    "Other",
    "Curbside Service",
    "Study Room",
    "Adult Summer Reading Reg",
  ];

  const [open, setOpen] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        style={{ width: "90%", marginLeft: "5%" }}
      >
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            style={{ overflowY: "auto", height: "calc(100vh - 130px)" }}
            justify="space-around"
          >
            {buttonTypes.map((value, index) => {
              return (
                <Grid item>
                  <Button
                    variant={"contained"}
                    style={{ width: "100%" }}
                    onClick={() => {
                      add(value);
                      setOpen(true);
                    }}
                  >
                    {value}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <List
            style={{
              marginLeft: "5%",
              width: "95%",
              overflowY: "auto",
              maxHeight: "calc(100vh - 110px)",
            }}
          >
            {data.map((value: any, index: number) => {
              return (
                <EventItem
                  value={value}
                  id={value.id}
                  removeItem={removeItem}
                ></EventItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Event logged
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default AddPage;
